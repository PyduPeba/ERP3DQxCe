import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const pedido = await prisma.pedido.findUnique({
            where: { id: parseInt(id) },
            include: {
                logs: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!pedido) {
            return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
        }

        return NextResponse.json(pedido);
    } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        return NextResponse.json({ error: "Failed to fetch pedido" }, { status: 500 });
    }
}
