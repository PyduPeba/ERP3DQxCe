import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        const data = await req.json();
        const template = await prisma.templateServico.update({
            where: { id: Number(idParam) },
            data: {
                titulo: data.titulo,
                descricao: data.descricao,
                categoria: data.categoria
            }
        });
        return NextResponse.json(template);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar template" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        await prisma.templateServico.delete({
            where: { id: Number(idParam) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir template" }, { status: 500 });
    }
}
