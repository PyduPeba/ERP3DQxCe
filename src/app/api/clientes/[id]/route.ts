import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateClienteSchema = z.object({
    tipo: z.enum(["PF", "PJ"]).optional(),
    nome: z.string().min(3).optional(),
    nomeFantasia: z.string().optional(),
    cpfCnpj: z.string().min(11).optional(),
    ie: z.string().optional(),
    telefone: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    observacoes: z.string().optional(),
    status: z.boolean().optional(),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const clienteId = parseInt(id);

        const cliente = await prisma.cliente.findUnique({
            where: { id: clienteId },
        });

        if (!cliente) {
            return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
        }

        return NextResponse.json(cliente);
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        return NextResponse.json(
            { error: "Erro interno ao buscar cliente" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const clienteId = parseInt(id);
        const body = await request.json();

        const result = updateClienteSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.format() },
                { status: 400 }
            );
        }

        const data = result.data;

        // Verificar unicidade de CPF/CNPJ se estiver alterando
        if (data.cpfCnpj) {
            const existing = await prisma.cliente.findFirst({
                where: {
                    cpfCnpj: data.cpfCnpj,
                    id: { not: clienteId }
                }
            });
            if (existing) {
                return NextResponse.json({ error: "CPF/CNPJ já cadastrado em outro cliente" }, { status: 409 });
            }
        }

        const updatedCliente = await prisma.cliente.update({
            where: { id: clienteId },
            data: {
                ...data,
                email: data.email || null,
            },
        });

        return NextResponse.json(updatedCliente);
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        return NextResponse.json(
            { error: "Erro interno ao atualizar cliente" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const clienteId = parseInt(id);

        await prisma.cliente.delete({
            where: { id: clienteId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        return NextResponse.json(
            { error: "Erro interno ao excluir cliente" },
            { status: 500 }
        );
    }
}
