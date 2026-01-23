import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const departamentos = await prisma.departamento.findMany({
            where: { clienteId: Number(id) },
            orderBy: { nome: "asc" },
        });
        return NextResponse.json(departamentos);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar departamentos" }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json(); // { nome, responsavel, email }

        if (!data.nome) {
            return NextResponse.json({ error: "Nome do departamento obrigatório" }, { status: 400 });
        }

        const departamento = await prisma.departamento.create({
            data: {
                clienteId: Number(id),
                nome: data.nome,
                responsavel: data.responsavel,
                email: data.email,
            }
        });

        return NextResponse.json(departamento);
    } catch (error) {
        console.error("ERRO POST DEPARTAMENTO:", error);
        return NextResponse.json({ error: "Erro ao criar departamento", details: String(error) }, { status: 500 });
    }
}
