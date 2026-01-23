import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const relatorios = await prisma.relatorioMensal.findMany({
            include: { cliente: true },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(relatorios);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar relatórios" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("Receiving Relatorio Data:", JSON.stringify(data, null, 2));

        if (!data.clienteId || !data.itens || data.itens.length === 0) {
            console.error("Missing critical data for Relatorio creation");
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        // Gerar número único (ex: REL-202405-001)
        const anoMes = `${data.anoReferencia}${String(data.mesReferencia).padStart(2, '0')}`;
        const count = await prisma.relatorioMensal.count({
            where: { anoReferencia: Number(data.anoReferencia), mesReferencia: Number(data.mesReferencia) }
        });
        const numero = `REL-${anoMes}-${String(count + 1).padStart(3, '0')}`;

        const relatorio = await prisma.relatorioMensal.create({
            data: {
                numero,
                mesReferencia: data.mesReferencia,
                anoReferencia: data.anoReferencia,
                clienteId: Number(data.clienteId),
                tipoTemplate: data.tipoTemplate || "PADRAO",
                observacoes: data.observacoes,
                itens: {
                    create: data.itens.map((item: any) => ({
                        data: new Date(item.data),
                        descricaoServico: item.descricaoServico,
                        equipamento: item.equipamento,
                        tombo: item.tombo,
                        status: item.status,
                        fotos: item.fotos || []
                    }))
                }
            },
            include: {
                itens: true,
                cliente: true
            }
        });
        return NextResponse.json(relatorio);
    } catch (error) {
        console.error("POST Relatorio Error:", error);
        return NextResponse.json({ error: "Erro ao criar relatório" }, { status: 500 });
    }
}
