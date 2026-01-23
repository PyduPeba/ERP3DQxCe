import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return NextResponse.json({ user: null });
    }

    const session = await verifySession(token);

    if (!session) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({
        user: {
            id: session.sub,
            nome: session.nome,
            perfil: session.perfil,
        },
    });
}
