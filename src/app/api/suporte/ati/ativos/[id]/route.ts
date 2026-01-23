import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const ativo = await prisma.ativoInterno.findUnique({
            where: { id },
            include: {
                ordensServico: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        itensUsados: {
                            include: { item: true }
                        }
                    }
                },
                movimentacoes: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        usuario: true,
                        tecnico: true
                    }
                }
            }
        });

        if (!ativo) return NextResponse.json({ error: "Ativo não encontrado" }, { status: 404 });

        return NextResponse.json(ativo);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar ativo" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const data = await req.json();

        const ativo = await prisma.ativoInterno.update({
            where: { id },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                categoria: data.categoria,
                numeroPatrimonio: data.numeroPatrimonio,
                numeroSerie: data.numeroSerie,
                dataAquisicao: data.dataAquisicao ? new Date(data.dataAquisicao) : undefined,
                valorAquisicao: data.valorAquisicao !== undefined ? Number(data.valorAquisicao) : undefined,
                localizacao: data.localizacao,
                status: data.status
            }
        });

        return NextResponse.json(ativo);
    } catch (error: any) {
        console.error("PUT Ativo Interno Error:", error);
        return NextResponse.json({ error: "Erro ao atualizar ativo" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        await prisma.ativoInterno.delete({ where: { id } });
        return NextResponse.json({ message: "Ativo excluído com sucesso" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir ativo" }, { status: 500 });
    }
}
