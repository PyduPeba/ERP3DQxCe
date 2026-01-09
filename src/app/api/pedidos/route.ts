import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pedidos = await prisma.pedido.findMany({
            orderBy: { id: "desc" },
        });
        return NextResponse.json(pedidos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch pedidos" }, { status: 500 });
    }
}
