import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        let config = await prisma.systemConfig.findUnique({
            where: { id: 1 }
        });

        if (!config) {
            config = await prisma.systemConfig.create({
                data: { id: 1 }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar config" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const session = token ? await verifySession(token) : null;

        const data = await req.json();

        // Default values from existing config or defaults if creation is needed
        const currentConfig = await prisma.systemConfig.findUnique({ where: { id: 1 } });

        const updateData = {
            sessionTimeout: typeof data.sessionTimeout !== 'undefined' ? Number(data.sessionTimeout) : (currentConfig?.sessionTimeout || 30),
            passwordRotationDays: typeof data.passwordRotationDays !== 'undefined' ? Number(data.passwordRotationDays) : (currentConfig?.passwordRotationDays || 90),
            brandingText: data.brandingText || currentConfig?.brandingText || "ERP 3D",
            brandingColor: data.brandingColor || currentConfig?.brandingColor || "#f97316",
            logoUrl: data.logoUrl || currentConfig?.logoUrl || ""
        };

        const config = await prisma.systemConfig.upsert({
            where: { id: 1 },
            update: updateData,
            create: {
                id: 1,
                ...updateData
            }
        });

        // Audit Log
        await prisma.activityLog.create({
            data: {
                entityType: "CONFIG",
                entityId: 1,
                action: "UPDATE",
                userId: session?.sub ? Number(session.sub) : null,
                userName: session ? (session.nome as string) : "Sistema",
                newValue: JSON.stringify(data)
            }
        });

        return NextResponse.json(config);
    } catch (error) {
        console.error("ERRO_CONFIG_SYSTEM:", error);
        return NextResponse.json({
            error: "Erro ao salvar config",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
