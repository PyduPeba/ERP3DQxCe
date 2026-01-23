"use client";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <ShieldAlert className="w-16 h-16 text-red-600" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        403
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Acesso Negado
                    </h2>
                    <p className="text-gray-600">
                        Desculpe, você não tem permissão para acessar esta área do sistema.
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-6">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <Home size={18} />
                        Voltar para o Início
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
                    >
                        <ArrowLeft size={18} />
                        Página Anterior
                    </button>
                </div>
            </div>

            <p className="mt-8 text-sm text-gray-400">
                Se você acredita que isso é um erro, entre em contato com o administrador.
            </p>
        </div>
    );
}
