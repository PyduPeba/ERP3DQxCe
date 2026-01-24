import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        const move = await prisma.movimentacaoAtivo.findUnique({
            where: { id: Number(idParam) },
            include: {
                ativo: true,
                usuario: true,
                tecnico: true
            }
        });

        if (!move) {
            return NextResponse.json({ error: "Movimentação não encontrada" }, { status: 404 });
        }

        return NextResponse.json(move);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar movimentação" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await params;
        const data = await req.json();
        const move = await prisma.movimentacaoAtivo.update({
            where: { id: Number(idParam) },
            data: {
                protocoloUrl: data.protocoloUrl
            }
        });
        return NextResponse.json(move);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar movimentação" }, { status: 500 });
    }
}
