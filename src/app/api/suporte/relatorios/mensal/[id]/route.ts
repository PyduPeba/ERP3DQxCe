import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const relatorio = await prisma.relatorioMensal.findUnique({
            where: { id: Number(params.id) },
            include: {
                itens: {
                    orderBy: { data: "asc" }
                },
                cliente: true
            }
        });

        if (!relatorio) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

        return NextResponse.json(relatorio);
    } catch (error) {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.relatorioMensal.delete({
            where: { id: Number(params.id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
    }
}
