import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const itens = await prisma.itemEstoque.findMany({
            orderBy: { nome: "asc" },
            include: {
                itensOS: true,
            },
        });
        return NextResponse.json(itens);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar itens de estoque" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const item = await prisma.itemEstoque.create({
            data: {
                codigo: data.codigo,
                nome: data.nome,
                descricao: data.descricao,
                categoria: data.categoria,
                quantidade: data.quantidade || 0,
                minimo: data.minimo || 0,
                valorUnit: data.valorUnit,
                fornecedor: data.fornecedor,
                localizacao: data.localizacao,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar item de estoque" }, { status: 500 });
    }
}
