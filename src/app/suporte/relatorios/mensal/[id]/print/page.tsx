"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Printer, ArrowLeft, TriangleAlert } from "lucide-react";
import RelatorioPrevia from "@/app/components/suporte/RelatorioPrevia";

export default function PrintRelatorioPage() {
    const { id } = useParams();
    const router = useRouter();
    const [relatorio, setRelatorio] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/suporte/relatorios/mensal/${id}`)
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Erro ao carregar relatório");
                return data;
            })
            .then(data => {
                setRelatorio(data);
                setError(null);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Preparando documento...</p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 p-10 text-center">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <TriangleAlert size={40} />
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Ops! Algo deu errado.</h1>
                <p className="text-gray-500 max-w-md">{error}</p>
            </div>
            <button onClick={() => router.back()} className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold">
                Voltar
            </button>
        </div>
    );

    const print = () => window.print();

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-10">
            {/* Toolbar - Hidden during print */}
            <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
                    <ArrowLeft size={20} /> Voltar
                </button>
                <div className="flex gap-3">
                    <button onClick={print} className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                        <Printer size={20} /> Imprimir / Salvar PDF
                    </button>
                </div>
            </div>

            {/* Layout Component */}
            <div className="max-w-[210mm] mx-auto">
                <RelatorioPrevia data={relatorio} itens={relatorio.itens || []} />
            </div>

            <style jsx global>{`
                @media print {
                    body { background: white !important; margin: 0; padding: 0; }
                    .print\\:hidden { display: none !important; }
                    .page-break-inside-avoid { page-break-inside: avoid; }
                }
            `}</style>
        </div>
    );
}
