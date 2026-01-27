import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "O corpo deve ser uma lista (array) de items." }, { status: 400 });
        }

        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[]
        };

        // Process sequentially to handle transaction logic correctly
        for (const item of body) {
            try {
                // Basic Validation
                if (!item.nome) {
                    results.failed++;
                    results.errors.push(`Item sem nome ignorado.`);
                    continue;
                }

                await prisma.$transaction(async (tx: any) => {
                    // Prepare data
                    const codigo = item.codigo || item.code || undefined;
                    const codigoBarras = item.codigoBarras || item.ean || undefined;

                    // Check if exists by Code (if provided)
                    let existing = null;
                    if (codigo) {
                        existing = await tx.itemEstoque.findUnique({ where: { codigo } });
                    }
                    // Or by Barcode
                    if (!existing && codigoBarras) {
                        existing = await tx.itemEstoque.findUnique({ where: { codigoBarras } });
                    }

                    const payload = {
                        nome: item.nome,
                        descricao: item.descricao || "",
                        categoria: item.categoria || item.category || "",
                        unidade: item.unidade || "un",
                        // Logic: If updating, decide whether to overwrite stock or add. 
                        // Simplified: Import = Set Initial State or Upsert Data. 
                        // For now, let's just create if new, update info if exists (but ignore quantity on update to not mess up running stock?)
                        // User said "Import Data", usually means initial load.

                        quantidade: item.quantidade ? Number(item.quantidade) : 0,
                        minimo: item.minimo ? Number(item.minimo) : 0,
                        custoMedio: item.custoMedio ? Number(item.custoMedio) : null,
                        valorVenda: (item.valorVenda || item.preco || item.price) ? Number(item.valorVenda || item.preco || item.price) : null,
                        fornecedorPrincipal: item.fornecedor || null,
                        codigo: codigo,
                        codigoBarras: codigoBarras
                    };

                    if (existing) {
                        // Update details ONLY, avoid changing quantity silently?
                        // Or maybe Update Everything? Let's Update Everything but log it.
                        await tx.itemEstoque.update({
                            where: { id: existing.id },
                            data: {
                                ...payload
                            }
                        });

                        // If quantity changed significantly or if we want to log the "Import Update"
                        if (existing.quantidade !== payload.quantidade) {
                            await tx.movimentacaoEstoque.create({
                                data: {
                                    itemId: existing.id,
                                    tipo: 'AJUSTE',
                                    quantidade: Math.abs(payload.quantidade - existing.quantidade),
                                    origem: 'IMPORTACAO',
                                    observacoes: 'Atualização via Importação de Dados',
                                    usuario: 'Sistema Importador'
                                }
                            });
                        }

                    } else {
                        // Create New
                        const newItem = await tx.itemEstoque.create({
                            data: payload
                        });

                        // Log Initial Entry
                        if (payload.quantidade > 0) {
                            await tx.movimentacaoEstoque.create({
                                data: {
                                    itemId: newItem.id,
                                    tipo: 'ENTRADA', // Initial stock
                                    quantidade: payload.quantidade,
                                    origem: 'IMPORTACAO',
                                    observacoes: 'Carga Inicial de Dados',
                                    usuario: 'Sistema Importador'
                                }
                            });
                        }
                    }
                });

                results.success++;

            } catch (err: any) {
                console.error("Erro import item:", item, err);
                results.failed++;
                results.errors.push(`Erro ao importar '${item.nome}': ${err.message}`);
            }
        }

        return NextResponse.json({
            message: `Processamento concluído. Sucesso: ${results.success}. Falhas: ${results.failed}.`,
            details: results
        });

    } catch (error) {
        console.error("Erro geral import:", error);
        return NextResponse.json({ error: "Erro interno na importação" }, { status: 500 });
    }
}
