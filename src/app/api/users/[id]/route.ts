import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const updateUserSchema = z.object({
    nome: z.string().min(3).optional(),
    usuario: z.string().min(3).optional(),
    senha: z.string().min(6).optional().or(z.literal("")),
    perfil: z.enum(["SUPERADMIN", "ADMIN", "ATENDENTE", "TECNICO", "FINANCEIRO"]).optional(),
    especialidade: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    telefone: z.string().optional(),
    status: z.boolean().optional(),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nome: true,
                usuario: true,
                perfil: true,
                especialidade: true,
                email: true,
                telefone: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return NextResponse.json(
            { error: "Erro interno ao buscar usuário" },
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
        const userId = parseInt(id);
        const body = await request.json();

        const result = updateUserSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.format() },
                { status: 400 }
            );
        }

        const data: any = { ...result.data };

        // Se senha foi fornecida e não está vazia, faz hash
        if (data.senha) {
            data.senha = await bcrypt.hash(data.senha, 10);
        } else {
            delete data.senha; // Remove senha se vazia ou não enviada
        }

        // Se email vazio, salvar como null (para evitar constraint error de unique com string vazia)
        if (data.email === "") data.email = null;

        // Verificar unicidade de usuário se estiver alterando
        if (data.usuario) {
            const existing = await prisma.user.findFirst({
                where: {
                    usuario: data.usuario,
                    id: { not: userId }
                }
            });
            if (existing) {
                return NextResponse.json({ error: "Nome de usuário já existe" }, { status: 409 });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                nome: true,
                usuario: true,
                perfil: true,
                status: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return NextResponse.json(
            { error: "Erro interno ao atualizar usuário" },
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
        const userId = parseInt(id);

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        return NextResponse.json(
            { error: "Erro interno ao excluir usuário" },
            { status: 500 }
        );
    }
}
