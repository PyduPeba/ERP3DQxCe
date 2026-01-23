"use client";

import { useState, useEffect } from "react";

export function usePermissions() {
    const [user, setUser] = useState<any>(null);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, permRes] = await Promise.all([
                    fetch("/api/auth/me"),
                    fetch("/api/config/permissions")
                ]);

                const userData = await userRes.json();
                const permData = await permRes.json();

                setUser(userData.user);
                setPermissions(Array.isArray(permData) ? permData : []);
            } catch (error) {
                console.error("Erro ao carregar permissões:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const canDo = (module: string, action: 'canView' | 'canCreate' | 'canEdit' | 'canDelete') => {
        if (!user) return false;
        if (user.perfil === 'SUPERADMIN') return true;

        const p = permissions.find(perm => perm.role === user.perfil && perm.module === module);
        return p ? p[action] : false;
    };

    return { user, permissions, loading, canDo };
}
