import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const template = await prisma.templateServico.update({
            where: { id: Number(params.id) },
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.templateServico.delete({
            where: { id: Number(params.id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir template" }, { status: 500 });
    }
}
