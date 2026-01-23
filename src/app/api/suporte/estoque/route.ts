import { prisma } from "@/lib/prisma";
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
                codigoBarras: data.codigoBarras,
                nome: data.nome,
                descricao: data.descricao,
                marca: data.marca,
                modelo: data.modelo,
                categoria: data.categoria,
                unidade: data.unidade || "un",
                fotos: data.fotos || [],
                rastreavel: !!data.rastreavel,
                quantidade: Number(data.quantidade || 0),
                minimo: Number(data.minimo || 0),
                custoMedio: data.custoMedio ? Number(data.custoMedio) : null,
                valorVenda: data.valorVenda ? Number(data.valorVenda) : null,
                fornecedorPrincipal: data.fornecedorPrincipal,
                localizacao: data.localizacao,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error("POST Inventory Error:", error);
        return NextResponse.json({ error: "Erro ao criar item de estoque no servidor" }, { status: 500 });
    }
}
