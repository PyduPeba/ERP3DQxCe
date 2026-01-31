import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ativos = await prisma.ativoInterno.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                ordensServico: {
                    take: 5,
                    orderBy: { createdAt: "desc" }
                },
                cliente: true
            }
        });
        return NextResponse.json(ativos);
    } catch (error) {
        console.error("GET Ativos Internos Error:", error);
        return NextResponse.json({ error: "Erro ao buscar ativos internos" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.nome || !data.categoria || !data.numeroPatrimonio) {
            return NextResponse.json({ error: "Campos obrigatórios: nome, categoria, numeroPatrimonio" }, { status: 400 });
        }

        const ativo = await prisma.ativoInterno.create({
            data: {
                nome: data.nome,
                descricao: data.descricao,
                categoria: data.categoria,
                numeroPatrimonio: data.numeroPatrimonio,
                numeroSerie: data.numeroSerie,
                dataAquisicao: data.dataAquisicao ? new Date(data.dataAquisicao) : null,
                valorAquisicao: data.valorAquisicao ? Number(data.valorAquisicao) : null,
                localizacao: data.localizacao,
                status: data.status || "OPERACIONAL",
                tipoPropriedade: data.tipoPropriedade || "INTERNO",
                clienteId: data.clienteId ? Number(data.clienteId) : null,
                fotos: Array.isArray(data.fotos) ? data.fotos : []
            } as any,
            include: {
                cliente: true
            }
        });

        return NextResponse.json(ativo);
    } catch (error: any) {
        console.error("POST Ativo Interno Error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Já existe um ativo com este número de patrimônio" }, { status: 400 });
        }
        return NextResponse.json({ error: "Erro ao criar ativo interno" }, { status: 500 });
    }
}
