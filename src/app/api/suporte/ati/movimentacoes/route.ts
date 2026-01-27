import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const moves = await prisma.movimentacaoAtivo.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                ativo: true,
                usuario: true,
                tecnico: true
            }
        });
        return NextResponse.json(moves);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar movimentações" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.ativoId || !data.usuarioId || !data.tecnicoId || !data.tipo) {
            return NextResponse.json({ error: "Campos obrigatórios: ativoId, usuarioId, tecnicoId, tipo" }, { status: 400 });
        }

        const move = await prisma.$transaction(async (tx: any) => {
            // 1. Create movement
            const m = await tx.movimentacaoAtivo.create({
                data: {
                    ativoId: Number(data.ativoId),
                    usuarioId: Number(data.usuarioId),
                    tecnicoId: Number(data.tecnicoId),
                    tipo: data.tipo,
                    condicaoNoMomento: data.condicaoNoMomento,
                    protocoloUrl: data.protocoloUrl
                },
                include: {
                    ativo: true,
                    usuario: true
                }
            });

            // 2. Update Asset location/status based on movement
            // If ENTREGA, we can assume it goes to a specific person/sector
            // If DEVOLUCAO, it goes back to TI/Stock
            await tx.ativoInterno.update({
                where: { id: Number(data.ativoId) },
                data: {
                    localizacao: data.tipo === "ENTREGA" ? `Com: ${m.usuario.nome}` : "TI / Almoxarifado",
                    status: data.tipo === "ENTREGA" ? "OPERACIONAL" : "OPERACIONAL" // Or "DEVOLVIDO"
                }
            });

            return m;
        });

        return NextResponse.json(move);
    } catch (error) {
        console.error("POST Movimentacao Ativo Error:", error);
        return NextResponse.json({ error: "Erro ao registrar movimentação" }, { status: 500 });
    }
}
