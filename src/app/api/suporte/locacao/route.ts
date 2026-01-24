import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const locacoes = await prisma.contratoLocacao.findMany({
            orderBy: { createdAt: "desc" },
            include: { cliente: true, itens: { include: { equipamento: true } } }
        });
        return NextResponse.json(locacoes);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar locações" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const locacao = await prisma.contratoLocacao.create({
            data: {
                clienteId: Number(data.clienteId || data.cliente),
                dataInicio: new Date(data.dataInicio),
                dataFim: new Date(data.dataFim),
                valorTotalMensal: Number(data.valorTotalMensal || data.valorMensal || 0),
                status: (data.status || "ATIVO").toUpperCase(),
                observacoes: data.observacoes || `${data.equipamento || ''} - ${data.descricao || ''}`,
            },
        });
        return NextResponse.json(locacao);
    } catch (error) {
        console.error("ERRO POST LOCACAO:", error);
        return NextResponse.json({ error: "Erro ao criar locação" }, { status: 500 });
    }
}
