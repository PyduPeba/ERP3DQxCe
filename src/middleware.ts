import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rotas públicas (estáticos, api de auth, login)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/login") ||
        pathname === "/" // Home page (pode redirecionar se quiser)
    ) {
        // Se o usuário já estiver logado e tentar acessar /login, redireciona para dashboard
        if (pathname === "/login") {
            const token = request.cookies.get("auth_token")?.value;
            if (token) {
                const session = await verifySession(token);
                if (session) {
                    return NextResponse.redirect(new URL("/suporte", request.url));
                }
            }
        }
        return NextResponse.next();
    }

    // Rotas Protegidas
    const protectedRoutes = ["/admin", "/clientes", "/suporte"];
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtected) {
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const session: any = await verifySession(token);

        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // RBAC: Regras específicas para criação/edição de usuários
        if (
            pathname === "/admin/users/new" ||
            (pathname.startsWith("/admin/users/") && pathname.endsWith("/edit"))
        ) {
            if (session.perfil !== "SUPERADMIN") {
                // Redireciona de volta para lista ou página de erro 403 (ou dashboard)
                // Vamos redirecionar para lista com um parametro de erro visual se possivel, ou dashboard
                return NextResponse.redirect(new URL("/admin/users?error=unauthorized", request.url));
            }
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes) -> CUIDADO: API Routes também podem precisar de proteção, 
         *   mas aqui estou protegendo apenas paths que correspondam a api/clientes, etc se for o caso.
         *   A logica acima intercepta TUDO, então vou ajustar o matcher para pegar tudo e filtrar no código.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
