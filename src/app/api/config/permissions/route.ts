import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all permissions
export async function GET() {
    try {
        const permissions = await prisma.modulePermission.findMany();
        return NextResponse.json(permissions);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar permissões" }, { status: 500 });
    }
}

// POST: Update or create permission
export async function POST(req: Request) {
    try {
        const { role, module, canView, canCreate, canEdit, canDelete } = await req.json();

        const permission = await prisma.modulePermission.upsert({
            where: {
                role_module: {
                    role,
                    module,
                },
            },
            update: {
                canView,
                canCreate,
                canEdit,
                canDelete,
            },
            create: {
                role,
                module,
                canView,
                canCreate,
                canEdit,
                canDelete,
            },
        });

        return NextResponse.json(permission);
    } catch (error) {
        console.error("Erro ao salvar permissão:", error);
        return NextResponse.json({ error: "Erro ao salvar permissão" }, { status: 500 });
    }
}
