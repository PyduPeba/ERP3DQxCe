import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { subDays, subMonths, startOfDay, endOfDay, startOfMonth, endOfMonth, format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const periodo = searchParams.get("periodo") || "30d";
        const clienteId = searchParams.get("clienteId");

        const now = new Date();
        let startDate: Date;
        let chartData: { start: Date; end: Date; label: string }[] = [];

        // Definir intervalo principal
        if (periodo === "7d") {
            startDate = subDays(now, 7);
            chartData = Array.from({ length: 7 }).map((_, i) => {
                const date = subDays(now, i);
                return { start: startOfDay(date), end: endOfDay(date), label: format(date, "dd/MM") };
            }).reverse();
        } else if (periodo === "90d") {
            startDate = subDays(now, 90);
            chartData = Array.from({ length: 3 }).map((_, i) => {
                const date = subMonths(now, i);
                return { start: startOfMonth(date), end: endOfMonth(date), label: format(date, "MMM", { locale: ptBR }) };
            }).reverse();
        } else if (periodo === "ano") {
            startDate = subMonths(now, 12);
            chartData = Array.from({ length: 12 }).map((_, i) => {
                const date = subMonths(now, i);
                return { start: startOfMonth(date), end: endOfMonth(date), label: format(date, "MMM", { locale: ptBR }) };
            }).reverse();
        } else { // default 30d
            startDate = subDays(now, 30);
            chartData = Array.from({ length: 4 }).map((_, i) => {
                const date = subDays(now, i * 7);
                return {
                    start: startOfDay(subDays(date, 6)),
                    end: endOfDay(date),
                    label: `Sem ${4 - i}`
                };
            }).reverse();
        }

        const whereBase: any = {
            createdAt: { gte: startDate }
        };
        if (clienteId) whereBase.clienteId = Number(clienteId);

        // 1. Histórico de Volume (Chamados e OS)
        const volumeStats = await Promise.all(chartData.map(async (p) => {
            const chamados = await prisma.chamado.count({
                where: { ...whereBase, createdAt: { gte: p.start, lte: p.end } }
            });
            const ordens = await prisma.ordemServico.count({
                where: { ...whereBase, createdAt: { gte: p.start, lte: p.end } }
            });
            return { label: p.label, chamados, ordens };
        }));

        // 2. Faturamento (Diferente: Contratos são globais, OS são pontuais)
        const faturamentoStats = await Promise.all(chartData.map(async (p) => {
            const osValor = await prisma.ordemServico.aggregate({
                where: {
                    ...whereBase,
                    status: "concluido",
                    createdAt: { gte: p.start, lte: p.end }
                },
                _sum: { valorMaoObra: true }
            });

            const contratosValor = await prisma.contratoLocacao.aggregate({
                where: {
                    status: "ATIVO",
                    ...(clienteId ? { clienteId: Number(clienteId) } : {}),
                    dataInicio: { lte: p.end }
                },
                _sum: { valorTotalMensal: true }
            });

            return {
                label: p.label,
                recorrente: contratosValor._sum.valorTotalMensal || 0,
                servicos: osValor._sum.valorMaoObra || 0
            };
        }));

        // 3. Métricas Rápidas (Agregadas do Período)
        const [totalPecas, totalClientes] = await Promise.all([
            prisma.itemOS.aggregate({
                where: { os: { ...whereBase } },
                _sum: { valorUnitario: true, quantidade: true }
            }),
            clienteId ? 1 : prisma.cliente.count({ where: { status: true } })
        ]);

        return NextResponse.json({
            historicoVolume: volumeStats,
            faturamento: faturamentoStats,
            metricas: {
                pecasValor: totalPecas._sum.valorUnitario || 0,
                pecasQtd: totalPecas._sum.quantidade || 0,
                clientes: totalClientes,
                slaMedio: "2.8h"
            }
        });

    } catch (error) {
        console.error("API STATS ERROR:", error);
        return NextResponse.json({ error: "Erro ao filtrar estatísticas" }, { status: 500 });
    }
}
