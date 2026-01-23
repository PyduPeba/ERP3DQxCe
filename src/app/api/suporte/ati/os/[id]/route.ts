import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const os = await prisma.oSInterna.findUnique({
            where: { id },
            include: {
                ativo: true,
                solicitante: true,
                tecnico: true,
                itensUsados: {
                    include: { item: true }
                }
            }
        });

        if (!os) return NextResponse.json({ error: "OS não encontrada" }, { status: 404 });
        return NextResponse.json(os);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar OS" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const osId = Number(params.id);
        const data = await req.json();

        // 1. Handle Closing OS (and Stock Deduction if items provided)
        if (data.status === "CONCLUIDA") {
            return await handleOSCompletion(osId, data);
        }

        // 2. Simple Update
        const os = await prisma.oSInterna.update({
            where: { id: osId },
            data: {
                tecnicoId: data.tecnicoId ? Number(data.tecnicoId) : undefined,
                laudoTecnico: data.laudoTecnico,
                status: data.status
            }
        });

        return NextResponse.json(os);
    } catch (error: any) {
        console.error("PUT OS Interna Error:", error);
        return NextResponse.json({ error: "Erro ao atualizar OS" }, { status: 500 });
    }
}

async function handleOSCompletion(osId: number, data: any) {
    return await prisma.$transaction(async (tx) => {
        // Find existing OS
        const currentOS = await tx.oSInterna.findUnique({
            where: { id: osId },
            include: { itensUsados: true }
        });

        if (!currentOS) throw new Error("OS não encontrada");

        // Logic for adding parts if payload includes them
        let additionalCost = 0;
        if (data.parts && Array.isArray(data.parts)) {
            for (const p of data.parts) {
                // Find product
                const product = await tx.itemEstoque.findUnique({ where: { id: p.itemEstoqueId } });
                if (!product) throw new Error(`Produto ${p.itemEstoqueId} não encontrado`);
                if (product.quantidade < p.quantidade) throw new Error(`Estoque insuficiente para ${product.nome}`);

                // Deduct from stock
                await tx.itemEstoque.update({
                    where: { id: p.itemEstoqueId },
                    data: { quantidade: { decrement: p.quantidade } }
                });

                // Record Movement
                await tx.movimentacaoEstoque.create({
                    data: {
                        itemId: p.itemEstoqueId,
                        tipo: "SAIDA",
                        quantidade: p.quantidade,
                        origem: "ATI",
                        docReferencia: currentOS.numero,
                        observacoes: `Uso em Manutenção Interna: ${currentOS.numero}`,
                        usuario: data.tecnicoNome || "Tecnico ATI"
                    }
                });

                // Add to OS Items
                await tx.itemOSInterna.create({
                    data: {
                        osId,
                        itemEstoqueId: p.itemEstoqueId,
                        quantidade: p.quantidade,
                        valorCustoNoMomento: product.custoMedio
                    }
                });

                additionalCost += (product.custoMedio || 0) * p.quantidade;
            }
        }

        // Final OS Update
        const updatedOS = await tx.oSInterna.update({
            where: { id: osId },
            data: {
                status: "CONCLUIDA",
                laudoTecnico: data.laudoTecnico,
                custoTotal: { increment: additionalCost }
            }
        });

        return NextResponse.json(updatedOS);
    });
}
