import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createClienteSchema = z.object({
    tipo: z.enum(["PF", "PJ"]),
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    nomeFantasia: z.string().optional(),
    cpfCnpj: z.string().min(11, "Documento inválido").optional().or(z.literal("")), // Optional
    ie: z.string().optional(),
    telefone: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().email("E-mail inválido").optional().or(z.literal("")),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    observacoes: z.string().optional(),
    status: z.boolean().default(true),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search");

        const where: any = {};
        if (search) {
            where.OR = [
                { nome: { contains: search, mode: "insensitive" } },
                { nomeFantasia: { contains: search, mode: "insensitive" } },
                { cpfCnpj: { contains: search } },
            ];
        }

        const clientes = await prisma.cliente.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(clientes);
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        return NextResponse.json(
            { error: "Erro interno ao listar clientes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validação
        const result = createClienteSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.format() },
                { status: 400 }
            );
        }

        const data = result.data;

        // Verificar unicidade de CPF/CNPJ (apenas se informado)
        if (data.cpfCnpj) {
            const existing = await prisma.cliente.findUnique({
                where: { cpfCnpj: data.cpfCnpj }
            });

            if (existing) {
                return NextResponse.json(
                    { error: "CPF/CNPJ já cadastrado" },
                    { status: 409 }
                );
            }
        }

        const newCliente = await prisma.cliente.create({
            data: {
                ...data,
                cpfCnpj: data.cpfCnpj || null, // Convert empty string to null to allow duplicates of "no document"
                email: data.email || null,
            }
        });

        return NextResponse.json(newCliente, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return NextResponse.json(
            { error: "Erro interno ao criar cliente" },
            { status: 500 }
        );
    }
}
