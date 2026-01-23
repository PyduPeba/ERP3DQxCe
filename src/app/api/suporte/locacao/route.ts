import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const locacoes = await prisma.locacao.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(locacoes);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar locações" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const locacao = await prisma.locacao.create({
            data: {
                equipamento: data.equipamento,
                descricao: data.descricao,
                cliente: data.cliente,
                dataInicio: new Date(data.dataInicio),
                dataFim: new Date(data.dataFim),
                valorMensal: data.valorMensal,
                valorTotal: data.valorTotal,
                status: data.status || "ativo",
                observacoes: data.observacoes,
            },
        });
        return NextResponse.json(locacao);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar locação" }, { status: 500 });
    }
}
