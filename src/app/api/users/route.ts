import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Schema de validação para criação de usuário
const createUserSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    usuario: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    perfil: z.enum(["SUPERADMIN", "ADMIN", "ATENDENTE", "TECNICO", "FINANCEIRO"]),
    especialidade: z.string().optional(),
    email: z.string().email("E-mail inválido").optional().or(z.literal("")),
    telefone: z.string().optional(),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const perfil = searchParams.get("perfil");
        const status = searchParams.get("status");

        const where: any = {};
        if (perfil) where.perfil = perfil;
        if (status) where.status = status === "true";

        const users = await prisma.user.findMany({
            where,
            orderBy: { createdAt: "desc" },
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
                // Senha excluída propositalmente
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        return NextResponse.json(
            { error: "Erro interno ao listar usuários" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validação
        const result = createUserSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.format() },
                { status: 400 }
            );
        }

        const { nome, usuario, senha, perfil, especialidade, email, telefone } = result.data;

        // Verificar unicidade de usuário
        const existingUser = await prisma.user.findUnique({ where: { usuario } });
        if (existingUser) {
            return NextResponse.json(
                { error: "Nome de usuário já existe" },
                { status: 409 }
            );
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await prisma.user.create({
            data: {
                nome,
                usuario,
                senha: hashedPassword,
                perfil: perfil as any, // TypeScript enum cast handled by Zod validation
                especialidade,
                email: email || null,
                telefone,
            },
            select: {
                id: true,
                nome: true,
                usuario: true,
                perfil: true,
                status: true,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return NextResponse.json(
            { error: "Erro interno ao criar usuário" },
            { status: 500 }
        );
    }
}
