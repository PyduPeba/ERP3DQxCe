import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const templates = await prisma.templateRelatorio.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(templates);
    } catch (error) {
        console.error("Error fetching visual templates:", error);
        return NextResponse.json({ error: "Erro ao buscar templates" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const template = await prisma.templateRelatorio.create({
            data: {
                nome: data.nome,
                categoria: data.categoria || "Geral",
                blocos: data.blocos,
                configuracaoGeral: data.configuracaoGeral
            }
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("Error creating visual template:", error);
        return NextResponse.json({ error: "Erro ao criar template" }, { status: 500 });
    }
}
