import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const chamado = await prisma.chamado.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                ordensServico: true,
            },
        });
        if (!chamado) {
            return NextResponse.json({ error: "Chamado não encontrado" }, { status: 404 });
        }
        return NextResponse.json(chamado);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar chamado" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const chamado = await prisma.chamado.update({
            where: { id: parseInt(params.id) },
            data: {
                titulo: data.titulo,
                descricao: data.descricao,
                prioridade: data.prioridade,
                status: data.status,
                cliente: data.cliente,
                tecnico: data.tecnico,
            },
        });
        return NextResponse.json(chamado);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar chamado" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.chamado.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar chamado" }, { status: 500 });
    }
}
