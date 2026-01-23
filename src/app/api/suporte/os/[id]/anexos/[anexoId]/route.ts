import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string; anexoId: string }> }
) {
    try {
        const resolvedParams = await params;
        const anexoId = Number(resolvedParams.anexoId);
        const osId = Number(resolvedParams.id);

        await prisma.anexo.delete({
            where: { id: anexoId }
        });

        // Audit Log
        await prisma.activityLog.create({
            data: {
                entityType: 'OS',
                entityId: osId,
                action: 'DELETE_PHOTO',
                newValue: JSON.stringify({ anexoId: anexoId, status: 'deleted' }),
                userName: 'Sistema'
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao excluir anexo" }, { status: 500 });
    }
}
