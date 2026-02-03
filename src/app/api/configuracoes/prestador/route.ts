import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        let config = await prisma.configuracaoPrestador.findUnique({
            where: { id: 1 }
        });

        if (!config) {
            // Create default config if doesn't exist
            config = await prisma.configuracaoPrestador.create({
                data: { id: 1 }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        console.error("Error fetching provider config:", error);
        return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const session = token ? await verifySession(token) : null;

        // Only ADMIN and SUPERADMIN can update
        if (!session || (session.perfil !== 'ADMIN' && session.perfil !== 'SUPERADMIN')) {
            return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
        }

        const data = await req.json();

        const config = await prisma.configuracaoPrestador.upsert({
            where: { id: 1 },
            update: {
                nomeEmpresa: data.nomeEmpresa,
                cnpj: data.cnpj,
                contato: data.contato,
            },
            create: {
                id: 1,
                nomeEmpresa: data.nomeEmpresa,
                cnpj: data.cnpj,
                contato: data.contato,
            }
        });

        return NextResponse.json(config);
    } catch (error) {
        console.error("Error updating provider config:", error);
        return NextResponse.json({ error: "Erro ao atualizar configurações" }, { status: 500 });
    }
}
