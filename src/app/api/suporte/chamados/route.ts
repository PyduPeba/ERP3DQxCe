import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const clienteId = searchParams.get("clienteId");
        const mes = searchParams.get("mes");
        const ano = searchParams.get("ano");

        const where: any = {};
        if (clienteId) where.clienteId = Number(clienteId);

        if (mes && ano) {
            const startDate = new Date(Number(ano), Number(mes) - 1, 1);
            const endDate = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
            where.createdAt = { gte: startDate, lte: endDate };
        }

        const chamados = await prisma.chamado.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: { ordensServico: { include: { anexos: true } } },
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
                tipoAtendimento: data.tipoAtendimento || "remoto",
                categoria: data.categoria,
                equipamento: data.equipamento,
                numeroSerie: data.numeroSerie,
                patrimonio: data.patrimonio,
                clienteId: data.clienteId ? Number(data.clienteId) : undefined,
            },
        });
        return NextResponse.json(chamado);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar chamado" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const session = token ? await verifySession(token) : null;

        const data = await req.json();
        if (!data.id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

        const newStatus = data.status;

        // SPECIFIC BUSINESS RULE: TECNICO restriction
        if (session && session.perfil === 'TECNICO') {
            const forbiddenStatuses = ['aberto', 'fechado'];
            if (forbiddenStatuses.includes(newStatus)) {
                return NextResponse.json({ error: "Técnico não tem permissão para definir este status." }, { status: 403 });
            }
        }

        const chamado = await prisma.chamado.update({
            where: { id: Number(data.id) },
            data: {
                status: data.status,
                solucao: data.solucao,
                tecnico: data.tecnico || (session?.perfil === 'TECNICO' ? session.nome : undefined),
                fechadoEm: data.status === 'fechado' ? new Date() : undefined,
            }
        });

        // AUDIT LOG
        await prisma.activityLog.create({
            data: {
                entityType: 'TICKET',
                entityId: chamado.id,
                action: 'UPDATE',
                newValue: JSON.stringify({ status: data.status, solucao: data.solucao }),
                userName: session?.nome || 'Sistema'
            }
        });

        return NextResponse.json(chamado);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar chamado" }, { status: 500 });
    }
}
