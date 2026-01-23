"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ArrowLeftRight, Plus, Search, FileText, User, Laptop, Calendar, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MovimentacoesAtivoPage() {
    const [moves, setMoves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMoves();
    }, []);

    const fetchMoves = async () => {
        try {
            const res = await fetch("/api/suporte/ati/movimentacoes");
            const data = await res.json();
            setMoves(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching movements:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                             <ArrowLeftRight className="w-8 h-8 text-indigo-600" />
                             Protocolos de Movimentação
                        </h1>
                        <p className="text-gray-500">Histórico de entregas e devoluções de ativos internos</p>
                    </div>
                    <Link href="/suporte/ati/movimentacoes/nova" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors text-sm shadow-sm font-bold">
                        <Plus className="w-4 h-4" />
                        Novo Protocolo
                    </Link>
                </div>

                {/* List of Protocols */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400">Carregando protocolos...</div>
                        ) : moves.length === 0 ? (
                            <div className="p-12 text-center flex flex-col items-center">
                                <FileText className="w-12 h-12 text-gray-200 mb-2" />
                                <p className="text-gray-400 italic">Nenhuma movimentação registrada</p>
                            </div>
                        ) : (
                            moves.map((move) => (
                                <div key={move.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-center gap-6 group">
                                    {/* Icon Indicator */}
                                    <div className={`p-3 rounded-2xl ${move.tipo === 'ENTREGA' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {move.tipo === 'ENTREGA' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{move.tipo}</div>
                                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                                <Laptop size={14} className="text-gray-400" />
                                                {move.ativo.nome}
                                            </div>
                                            <div className="text-xs text-gray-500">Pat: {move.ativo.numeroPatrimonio}</div>
                                        </div>

                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Responsável pela Posse</div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                                                    {move.usuario.nome.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{move.usuario.nome}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Processado em</div>
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(move.createdAt).toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-gray-400">Por: {move.tecnico.nome}</div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        {move.protocoloUrl ? (
                                            <a 
                                                href={move.protocoloUrl} 
                                                target="_blank" 
                                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100" 
                                                title="Ver Protocolo Assinado"
                                            >
                                                <ShieldCheck size={18} />
                                            </a>
                                        ) : (
                                            <button 
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*,application/pdf';
                                                    input.onchange = async (e: any) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = async () => {
                                                                const base64 = reader.result;
                                                                try {
                                                                    const res = await fetch(`/api/suporte/ati/movimentacoes/${move.id}`, {
                                                                        method: 'PUT',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ protocoloUrl: base64 })
                                                                    });
                                                                    if (res.ok) {
                                                                        fetchMoves();
                                                                    }
                                                                } catch (err) {
                                                                    console.error(err);
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    };
                                                    input.click();
                                                }}
                                                className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-indigo-500 hover:text-indigo-600 transition-all text-gray-400" 
                                                title="Anexar Comprovante Assinado"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        )}
                                        <Link 
                                            href={`/suporte/ati/movimentacoes/${move.id}/imprimir`} 
                                            target="_blank"
                                            className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all text-gray-400" 
                                            title="Imprimir Termo"
                                        >
                                            <FileText size={18} />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ArrowLeftRight size={20} /></div>
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm">Controle de Ativos com Colaboradores</h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Sempre gere o termo de responsabilidade ao entregar equipamentos. Na devolução, verifique a integridade física do bem antes de liberar o protocolo no sistema.
                        </p>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
