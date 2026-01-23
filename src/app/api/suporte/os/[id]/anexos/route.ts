import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const anexos = await prisma.anexo.findMany({
            where: { osId: Number(id) },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(anexos);
    } catch (error) {
        console.error("ERRO GET ANEXOS:", error);
        return NextResponse.json({ error: "Erro ao buscar anexos", details: String(error) }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json(); // { nome, url, tipo }

        if (!data.url || !data.nome) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const anexo = await prisma.anexo.create({
            data: {
                osId: Number(id),
                nome: data.nome,
                url: data.url, // Base64
                tipo: data.tipo || "image/jpeg",
            }
        });

        // Audit Log
        await prisma.activityLog.create({
            data: {
                entityType: 'OS',
                entityId: Number(id),
                action: 'UPLOAD_PHOTO',
                newValue: JSON.stringify({ anexoId: anexo.id, nome: anexo.nome }),
                userName: 'Sistema' // TODO: Get real user
            }
        });

        return NextResponse.json(anexo);
    } catch (error) {
        console.error("ERRO POST ANEXO:", error);
        return NextResponse.json({ error: "Erro ao anexar arquivo", details: String(error) }, { status: 500 });
    }
}
