import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Buscar logs da OS
        const logs = await prisma.activityLog.findMany({
            where: {
                entityType: "OS",
                entityId: Number(id),
            },
            orderBy: {
                timestamp: "desc",
            },
        });

        // Opcional: Buscar logs do Chamado vinculado se quisermos mostrar tudo junto
        // Mas por enquanto vamos focar na OS

        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar logs" }, { status: 500 });
    }
}
