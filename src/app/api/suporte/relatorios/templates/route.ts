import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const templates = await prisma.templateServico.findMany({
            orderBy: { titulo: "asc" }
        });
        return NextResponse.json(templates);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar templates" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const template = await prisma.templateServico.create({
            data: {
                titulo: data.titulo,
                descricao: data.descricao,
                categoria: data.categoria
            }
        });
        return NextResponse.json(template);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar template" }, { status: 500 });
    }
}
