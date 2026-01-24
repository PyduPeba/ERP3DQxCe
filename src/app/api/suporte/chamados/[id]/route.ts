import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        const chamado = await prisma.chamado.findUnique({
            where: { id: parseInt(idParam) },
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        const data = await req.json();
        const chamado = await prisma.chamado.update({
            where: { id: parseInt(idParam) },
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        await prisma.chamado.delete({
            where: { id: parseInt(idParam) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar chamado" }, { status: 500 });
    }
}
