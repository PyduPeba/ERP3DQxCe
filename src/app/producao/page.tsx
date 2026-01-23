"use client";
import DashboardLayout from "../components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";

export default function Producao() {
    return (
        <PermissionGuard module="PRODUCAO">
            <DashboardLayout>
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Produção</h2>
                    <p className="mt-2 text-gray-600">Controle de impressão e status.</p>
                </div>
            </DashboardLayout>
        </PermissionGuard>
    );
}
