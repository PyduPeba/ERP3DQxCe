import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ordens = await prisma.oSInterna.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                ativo: true,
                solicitante: true,
                tecnico: true
            }
        });
        return NextResponse.json(ordens);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar ordens de serviço internas" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.ativoId || !data.solicitanteId || !data.descricaoProblema) {
            return NextResponse.json({ error: "Campos obrigatórios: ativoId, solicitanteId, descricaoProblema" }, { status: 400 });
        }

        // Generate OS Number
        const currentYear = new Date().getFullYear();
        const count = await prisma.oSInterna.count({
            where: { createdAt: { gte: new Date(`${currentYear}-01-01`) } }
        });
        const numero = `ATI-${currentYear}-${(count + 1).toString().padStart(3, '0')}`;

        const os = await prisma.oSInterna.create({
            data: {
                numero,
                ativoId: Number(data.ativoId),
                solicitanteId: Number(data.solicitanteId),
                tecnicoId: data.tecnicoId ? Number(data.tecnicoId) : null,
                descricaoProblema: data.descricaoProblema,
                status: "ABERTA",
                fotos: Array.isArray(data.fotos) ? data.fotos : []
            } as any,
            include: {
                ativo: true,
                solicitante: true
            }
        });

        return NextResponse.json(os);
    } catch (error) {
        console.error("POST OS Interna Error:", error);
        return NextResponse.json({ error: "Erro ao criar ordem de serviço interna" }, { status: 500 });
    }
}
