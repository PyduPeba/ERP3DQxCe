import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const template = await prisma.templateRelatorio.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!template) {
            return NextResponse.json({ error: "Template não encontrado" }, { status: 404 });
        }

        return NextResponse.json(template);
    } catch (error) {
        console.error("Error fetching visual template:", error);
        return NextResponse.json({ error: "Erro ao buscar template" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();

        const template = await prisma.templateRelatorio.update({
            where: { id: parseInt(params.id) },
            data: {
                nome: data.nome,
                categoria: data.categoria,
                blocos: data.blocos,
                configuracaoGeral: data.configuracaoGeral
            }
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("Error updating visual template:", error);
        return NextResponse.json({ error: "Erro ao atualizar template" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.templateRelatorio.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting visual template:", error);
        return NextResponse.json({ error: "Erro ao deletar template" }, { status: 500 });
    }
}
