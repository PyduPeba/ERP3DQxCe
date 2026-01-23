import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const item = await prisma.itemEstoque.findUnique({
            where: { id: Number(params.id) },
            include: {
                itensSerializados: true
            }
        });
        if (!item) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const item = await prisma.itemEstoque.update({
            where: { id: Number(params.id) },
            data: {
                codigo: data.codigo,
                codigoBarras: data.codigoBarras,
                nome: data.nome,
                descricao: data.descricao,
                marca: data.marca,
                modelo: data.modelo,
                categoria: data.categoria,
                unidade: data.unidade,
                fotos: data.fotos,
                rastreavel: data.rastreavel !== undefined ? !!data.rastreavel : undefined,
                minimo: data.minimo !== undefined ? Number(data.minimo) : undefined,
                custoMedio: data.custoMedio !== undefined ? Number(data.custoMedio) : undefined,
                valorVenda: data.valorVenda !== undefined ? Number(data.valorVenda) : undefined,
                fornecedorPrincipal: data.fornecedorPrincipal,
                localizacao: data.localizacao,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error("PUT Product Error:", error);
        return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.itemEstoque.delete({
            where: { id: Number(params.id) },
        });
        return NextResponse.json({ message: "Produto excluído com sucesso" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
    }
}
