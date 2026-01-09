import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ordensServico = await prisma.ordemServico.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                chamado: true,
                itensUsados: {
                    include: {
                        item: true,
                    },
                },
            },
        });
        return NextResponse.json(ordensServico);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar ordens de serviço" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Gerar número da OS automaticamente
        const count = await prisma.ordemServico.count();
        const numero = `OS-${String(count + 1).padStart(6, '0')}`;

        const os = await prisma.ordemServico.create({
            data: {
                numero,
                chamadoId: data.chamadoId,
                cliente: data.cliente,
                descricao: data.descricao,
                status: data.status || "pendente",
                valorMaoObra: data.valorMaoObra,
                observacoes: data.observacoes,
            },
        });
        return NextResponse.json(os);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar ordem de serviço" }, { status: 500 });
    }
}
