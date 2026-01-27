import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const contratos = await prisma.contratoLocacao.findMany({
            include: {
                cliente: { select: { nome: true } },
                itens: { include: { equipamento: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(contratos);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar contratos" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json(); // { clienteId, dataInicio, dataFim, itens: [{id, valor}], ... }

        if (!data.clienteId || !data.itens || data.itens.length === 0) {
            return NextResponse.json({ error: "Cliente e Equipamentos são obrigatórios" }, { status: 400 });
        }

        return await prisma.$transaction(async (tx: any) => {
            // 1. Verify Equipment Availability
            for (const item of data.itens) {
                const eq = await tx.equipamento.findUnique({ where: { id: item.id } });
                if (!eq || eq.status !== 'DISPONIVEL') {
                    throw new Error(`Equipamento '${eq?.nome}' não está disponível.`);
                }
            }

            // 2. Create Contract
            const contrato = await tx.contratoLocacao.create({
                data: {
                    clienteId: Number(data.clienteId),
                    dataInicio: new Date(data.dataInicio),
                    dataFim: new Date(data.dataFim),
                    valorTotalMensal: Number(data.valorTotalMensal),
                    diaVencimento: Number(data.diaVencimento || 5),
                    renovacaoAuto: Boolean(data.renovacaoAuto),
                    observacoes: data.observacoes,
                    status: 'ATIVO',
                    itens: {
                        create: data.itens.map((item: any) => ({
                            equipamentoId: item.id,
                            valorUnitario: Number(item.valor)
                        }))
                    }
                }
            });

            // 3. Update Equipment Status
            for (const item of data.itens) {
                await tx.equipamento.update({
                    where: { id: item.id },
                    data: { status: 'LOCADO' }
                });
            }

            return NextResponse.json(contrato);
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Erro ao criar contrato" }, { status: 500 });
    }
}
