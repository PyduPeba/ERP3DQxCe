import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0; // Force dynamic

export async function GET(req: Request) {
    console.log("API: GET /api/locacao/equipamentos chamada");
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const where: any = {};
        if (status) where.status = status;

        console.log("API: Buscando equipamentos com filtro:", where);

        const equipamentos = await prisma.equipamento.findMany({
            where,
            include: {
                itemEstoque: {
                    select: {
                        id: true,
                        nome: true,
                        categoria: true
                    }
                }
            },
            orderBy: { nome: 'asc' }
        });

        console.log(`API: Encontrados ${equipamentos?.length ?? 0} equipamentos`);

        // Safety check
        if (!Array.isArray(equipamentos)) {
            console.error("API CRITICAL: prisma.findMany retornou não-array:", equipamentos);
            return NextResponse.json([]);
        }

        return NextResponse.json(equipamentos);
    } catch (error) {
        console.error("API CRITICAL ERROR:", error);
        return NextResponse.json({
            error: "Erro ao buscar equipamentos",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("API: POST /api/locacao/equipamentos data:", data);

        if (!data.nome) return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });

        console.log("API: Tentando criar no prisma...");

        const equipamento = await prisma.equipamento.create({
            data: {
                nome: data.nome,
                marca: data.marca,
                modelo: data.modelo,
                numeroSerie: data.numeroSerie,
                codigoPatrimonio: data.codigoPatrimonio,
                status: "DISPONIVEL", // Default created as available
                condicao: data.condicao,
                valorAquisicao: data.valorAquisicao ? Number(data.valorAquisicao) : null,
                valorLocacaoBase: data.valorLocacaoBase ? Number(data.valorLocacaoBase) : null,
                dataAquisicao: data.dataAquisicao ? new Date(data.dataAquisicao) : null,
                descricao: data.descricao,
                fotoUrl: data.fotoUrl,
                fotos: data.fotos || [],
                itemEstoqueId: data.itemEstoqueId ? Number(data.itemEstoqueId) : null
            }
        });

        console.log("API: Equipamento criado com sucesso:", equipamento.id);
        return NextResponse.json(equipamento);
    } catch (error: any) {
        console.error("API POST ERROR:", error);
        if (error.code === 'P2002') {
            const target = error.meta?.target;
            if (target && target.includes('codigoPatrimonio')) {
                return NextResponse.json({ error: "Código de Patrimônio já cadastrado." }, { status: 409 });
            }
            return NextResponse.json({ error: "Número de Série ou Patrimônio já duplicado." }, { status: 409 });
        }
        return NextResponse.json({ error: "Erro ao criar equipamento", details: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();

        if (!data.id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

        const equipamento = await prisma.equipamento.update({
            where: { id: Number(data.id) },
            data: {
                nome: data.nome,
                marca: data.marca,
                modelo: data.modelo,
                numeroSerie: data.numeroSerie,
                codigoPatrimonio: data.codigoPatrimonio,
                status: data.status,
                condicao: data.condicao,
                valorAquisicao: data.valorAquisicao ? Number(data.valorAquisicao) : null,
                valorLocacaoBase: data.valorLocacaoBase ? Number(data.valorLocacaoBase) : null,
                dataAquisicao: data.dataAquisicao ? new Date(data.dataAquisicao) : undefined,
                descricao: data.descricao,
                fotoUrl: data.fotoUrl,
                fotos: data.fotos || [],
                itemEstoqueId: data.itemEstoqueId ? Number(data.itemEstoqueId) : null
            }
        });
        return NextResponse.json(equipamento);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar equipamento" }, { status: 500 });
    }
}
