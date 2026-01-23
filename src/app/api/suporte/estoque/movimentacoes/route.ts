import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { itemId, tipo, quantidade, origem, docReferencia, observacoes, userId, usuario } = body;

        if (!itemId || !tipo || !quantidade) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const qtdInt = Math.abs(Number(quantidade));

        // Transaction to ensure consistency
        const result = await prisma.$transaction(async (tx) => {
            // 1. Get current item state
            const item = await tx.itemEstoque.findUnique({ where: { id: Number(itemId) } });
            if (!item) throw new Error("Item não encontrado");

            // 2. Calculate new quantity
            let newQuantity = item.quantidade;
            if (tipo === 'ENTRADA') newQuantity += qtdInt;
            else if (tipo === 'SAIDA') {
                if (newQuantity < qtdInt) throw new Error("Estoque insuficiente");
                newQuantity -= qtdInt;
            } else if (tipo === 'AJUSTE') {
                // Adjustment sets the absolute value or diff? Usually absolute.
                // But let's assume body.quantidade is the DELTA for simplicity in this general API, 
                // OR handle "Setting to" value.
                // For safety in this simpler API, let's treat AJUSTE as a delta too (can be negative).
                // Wait, logic above says qtdInt is abs.
                // Let's assume AJUSTE receives the ACTUAL signed delta from frontend for now. 
                // Actually, let's Stick to standard: 
                // ENTRADA (+), SAIDA (-).
                // AJUSTE: The user calculates the diff. If they want to set to 10 and it was 8, they send AJUSTE +2.
                // If they want to set to 5 and it was 8, they send AJUSTE -3.
                // SO let's use the signed value for AJUSTE.
                newQuantity += Number(quantidade);
            }

            // 3. Update Item
            const updatedItem = await tx.itemEstoque.update({
                where: { id: itemId },
                data: { quantity: newQuantity }
                // Warning: Prisma field might be 'quantidade' in Portuguese. Checking Schema...
                // Schema says: quantidade Int @default(0)
                // Fix:
                data: { quantidade: newQuantity }
            });

            // 4. Create Movement Log
            const movement = await tx.movimentacaoEstoque.create({
                data: {
                    itemId,
                    tipo,
                    quantidade: qtdInt, // Log the magnitude. Direction is implied by tipo? Or should we log signed?
                    // Schema: quantidade Int // Sempre positivo aqui
                    // Let's stick to magnitude in DB, Type tells the sign.
                    // Exception: AJUSTE might need sign if undefined direction. 
                    // Let's force AJUSTE_ENTRADA / AJUSTE_SAIDA in frontend? Or just allow negative?
                    // If schema comment says "Sempre positivo", we follow that.
                    origem,
                    docReferencia,
                    observacoes,
                    userId,
                    usuario
                }
            });

            return { movement, updatedItem };
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Erro movimentação:", error);
        return NextResponse.json({ error: error.message || "Erro ao registrar movimentação" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // List latest movements
    try {
        const { searchParams } = new URL(req.url);
        const itemId = searchParams.get('itemId'); // Optional filter

        const where = itemId ? { itemId: Number(itemId) } : {};

        const movements = await prisma.movimentacaoEstoque.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: { item: { select: { nome: true, codigo: true } } }
        });

        return NextResponse.json(movements);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar movimentações" }, { status: 500 });
    }
}
