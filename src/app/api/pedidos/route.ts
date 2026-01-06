import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const pedidos = await prisma.pedido.findMany({
        orderBy: { id: "desc" },
    });

    return NextResponse.json(pedidos);
}

export async function POST(req: Request) {
    const data = await req.json();

    const pedido = await prisma.pedido.create({
        data: {
            cliente: data.cliente,
            descricao: data.descricao,
        },
    });

    return NextResponse.json(pedido);
}
