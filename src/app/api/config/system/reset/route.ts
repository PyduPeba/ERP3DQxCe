import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs";

export async function POST() {
    try {
        // 1. Authenticate and Check Permissions
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const session = token ? await verifySession(token) : null;

        if (!session || session.perfil !== 'SUPERADMIN') {
            return NextResponse.json({ error: "Acesso negado. Apenas SUPERADMIN pode resetar o sistema." }, { status: 403 });
        }

        // 2. Fetch current user data to preserve it
        const currentUserId = Number(session.sub);
        const currentUser = await prisma.user.findUnique({
            where: { id: currentUserId }
        });

        if (!currentUser) {
            return NextResponse.json({ error: "Usuário atual não encontrado." }, { status: 404 });
        }

        // 3. Perform Reset
        await prisma.$transaction(async (tx) => {
            // Get all models dynamically
            const prismaAny = (tx as any);
            const allKeys = Object.keys(prismaAny).filter(k => !k.startsWith('_') && !k.startsWith('$') && typeof prismaAny[k]?.findMany === 'function');

            // Format table names for TRUNCATE CASCADE
            // Note: We MUST use double quotes for table names in Postgres if they have uppercase
            const tableNamesList = allKeys.map(t => `"${t.charAt(0).toUpperCase() + t.slice(1)}"`).join(", ");

            // Execute TRUNCATE
            await tx.$executeRawUnsafe(`TRUNCATE TABLE ${tableNamesList} RESTART IDENTITY CASCADE;`);

            // 4. Restore the SUPERADMIN user
            // We strip the ID to let it be re-generated (since we did RESTART IDENTITY)
            const { id, ...userData } = currentUser;
            await tx.user.create({
                data: userData
            });
        });

        // 5. Clear Uploads Folder
        const uploadsPath = path.join(process.cwd(), "public", "uploads");
        if (fs.existsSync(uploadsPath)) {
            const files = fs.readdirSync(uploadsPath);
            for (const f of files) {
                const filePath = path.join(uploadsPath, f);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        return NextResponse.json({ success: true, message: "Sistema resetado com sucesso! Apenas seu usuário foi preservado." });
    } catch (error) {
        console.error("ERRO NO RESET DO SISTEMA:", error);
        return NextResponse.json({ error: "Erro interno ao resetar o sistema", details: String(error) }, { status: 500 });
    }
}
