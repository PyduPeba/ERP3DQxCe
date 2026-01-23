"use client";
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PermissionGuardProps {
    children: React.ReactNode;
    module: string;
}

/**
 * Componente de guarda para proteger rotas e partes da UI baseado na Matriz de Permissões.
 * Se o usuário não tiver permissão de 'canView' para o módulo especificado, 
 * ele será redirecionado para a página de acesso negado.
 */
export default function PermissionGuard({ children, module }: PermissionGuardProps) {
    const { user, loading, canDo } = usePermissions();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            // Se o usuário não for SUPERADMIN e não tiver permissão de visualizar o módulo
            if (user.perfil !== 'SUPERADMIN' && !canDo(module, 'canView')) {
                router.push('/forbidden');
            }
        }
    }, [loading, user, module, canDo, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 font-medium animate-pulse">Verificando permissões...</p>
            </div>
        );
    }

    // Se não houver usuário ou não houver permissão, não renderiza o conteúdo (será redirecionado pelo useEffect)
    if (!user || (user.perfil !== 'SUPERADMIN' && !canDo(module, 'canView'))) {
        return null;
    }

    return <>{children}</>;
}
