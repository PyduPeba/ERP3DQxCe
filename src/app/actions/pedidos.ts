"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to create logs
async function createLog(pedidoId: number, acao: string, detalhes?: string, usuario: string = "Sistema") {
    try {
        await prisma.pedidoLog.create({
            data: {
                pedidoId,
                acao,
                detalhes,
                usuario,
            },
        });
    } catch (e) {
        console.error("Erro ao criar log:", e);
    }
}

export async function createPedido(formData: FormData) {
    const cliente = formData.get("cliente") as string;
    const descricao = formData.get("descricao") as string;
    const prioridade = (formData.get("prioridade") as string) || "media";

    if (!cliente || !descricao) {
        throw new Error("Cliente e descrição são obrigatórios.");
    }

    try {
        const pedido = await prisma.pedido.create({
            data: {
                cliente,
                descricao,
                status: "pendente",
                prioridade,
            },
        });

        await createLog(pedido.id, "criacao", `Pedido criado para o cliente ${cliente}`);

        revalidatePath("/pedidos");
        return { success: true, id: pedido.id };
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return { success: false, error: "Falha ao criar o pedido." };
    }
}

export async function updatePedido(id: number, data: { cliente?: string; descricao?: string; prioridade?: string; status?: string }) {
    try {
        const oldPedido = await prisma.pedido.findUnique({ where: { id } });
        if (!oldPedido) return { success: false, error: "Pedido não encontrado." };

        const pedido = await prisma.pedido.update({
            where: { id },
            data,
        });

        // Detect specific changes
        const changes = [];
        if (data.cliente && data.cliente !== oldPedido.cliente) changes.push(`Cliente: ${oldPedido.cliente} → ${data.cliente}`);
        if (data.status && data.status !== oldPedido.status) changes.push(`Status: ${oldPedido.status} → ${data.status}`);
        if (data.prioridade && data.prioridade !== oldPedido.prioridade) changes.push(`Prioridade: ${oldPedido.prioridade} → ${data.prioridade}`);
        if (data.descricao && data.descricao !== oldPedido.descricao) {
            const oldSnippet = oldPedido.descricao.substring(0, 100) + (oldPedido.descricao.length > 100 ? "..." : "");
            const newSnippet = data.descricao.substring(0, 100) + (data.descricao.length > 100 ? "..." : "");
            changes.push(`Descrição: "${oldSnippet}" → "${newSnippet}"`);
        }

        if (changes.length > 0) {
            const detalhes = changes.join(" | ");
            const acao = data.status && data.status !== oldPedido.status ? "alteracao_status" : "alteracao_dados";
            await createLog(id, acao, detalhes, "Administrador");
        }

        revalidatePath("/pedidos");
        revalidatePath(`/pedidos/${id}/edit`);
        return { success: true };
    } catch (error) {
        console.error("Erro detalhado ao atualizar pedido:", error);
        return { success: false, error: "Falha ao atualizar pedido." };
    }
}

export async function deletePedido(id: number) {
    try {
        // Log is deleted by Cascade, but we can log to a main system log if we had one.
        // For now just perform deletion.
        await prisma.pedido.delete({
            where: { id },
        });

        revalidatePath("/pedidos");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Falha ao excluir pedido." };
    }
}

export async function updateStatus(id: number, newStatus: string) {
    return await updatePedido(id, { status: newStatus });
}
