import { prisma } from "@/lib/prisma";
import { signSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { usuario, senha } = await request.json();

        if (!usuario || !senha) {
            return NextResponse.json(
                { error: "Usuário e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { usuario },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Credenciais inválidas" },
                { status: 401 }
            );
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Credenciais inválidas" },
                { status: 401 }
            );
        }

        if (!user.status) {
            return NextResponse.json(
                { error: "Usuário inativo. Contate o administrador." },
                { status: 403 }
            );
        }

        // Gerar Token JWT
        const token = await signSession({
            sub: user.id.toString(),
            nome: user.nome,
            perfil: user.perfil,
        });

        // Definir Cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 8, // 8 horas
            path: "/",
        });

        return NextResponse.json({ success: true, user: { nome: user.nome, perfil: user.perfil } });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}
