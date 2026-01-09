import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const chamados = await prisma.chamado.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                ordensServico: true,
            },
        });
        return NextResponse.json(chamados);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar chamados" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const chamado = await prisma.chamado.create({
            data: {
                titulo: data.titulo,
                descricao: data.descricao,
                prioridade: data.prioridade || "media",
                status: data.status || "aberto",
                cliente: data.cliente,
                tecnico: data.tecnico,
            },
        });
        return NextResponse.json(chamado);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar chamado" }, { status: 500 });
    }
}
