"use client";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComingSoon3D() {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center space-y-6">
                <div className="bg-amber-100 p-6 rounded-full text-amber-600 animate-pulse">
                    <Sparkles size={48} />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Em Desenvolvimento</h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Este gerador específico está sendo calibrado para garantir a melhor qualidade de impressão 3D. 
                        Tente o gerador de **Letra Caixa** ou **Chaveiros** enquanto isso!
                    </p>
                </div>
                <Link href="/estudio/letra-caixa" className="text-amber-600 font-bold hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Ver Geradores Disponíveis
                </Link>
            </div>
        </DashboardLayout>
    );
}
