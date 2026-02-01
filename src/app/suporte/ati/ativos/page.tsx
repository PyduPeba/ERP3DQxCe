"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Laptop, Plus, Search, Filter, MoreHorizontal, History, Wrench, ArrowLeftRight, User, ZoomIn } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import ImageOverlay from "@/app/components/suporte/ImageOverlay";

export default function AtivosInternosPage() {
    const [ativos, setAtivos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

    useEffect(() => {
        fetchAtivos();
    }, []);

    const fetchAtivos = async () => {
        try {
            const res = await fetch("/api/suporte/ati/ativos");
            const data = await res.json();
            setAtivos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching ativos:", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredAtivos = ativos.filter(a => 
        a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.numeroPatrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.numeroSerie && a.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (a.cliente?.nome && a.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ativos Internos</h1>
                        <p className="text-gray-500">Controle de bens e equipamentos da empresa</p>
                    </div>
                     <Link href="/suporte/ati/ativos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm shadow-sm font-bold">
                        <Plus className="w-4 h-4" />
                        Cadastrar Ativo
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nome, patrimônio ou serial..." 
                            className="w-full pl-9 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                        <Filter className="w-4 h-4" />
                        Categorias
                    </button>
                </div>

                {/* List */}
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Carregando ativos...</div>
                ) : filteredAtivos.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                        <Laptop className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Nenhum ativo encontrado</h3>
                        <p className="text-gray-500 text-sm">Comece cadastrando os equipamentos da sua TI ou escritório.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAtivos.map((ativo) => (
                            <div key={ativo.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="relative group/photo">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                                {ativo.fotos && ativo.fotos.length > 0 ? (
                                                    <img 
                                                        src={ativo.fotos[0]} 
                                                        alt={ativo.nome} 
                                                        className="w-10 h-10 object-cover rounded-lg cursor-zoom-in" 
                                                        onClick={() => setPreviewPhoto(ativo.fotos[0])}
                                                    />
                                                ) : (
                                                    <Laptop size={24} />
                                                )}
                                            </div>
                                            {ativo.fotos && ativo.fotos.length > 0 && (
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-lg">
                                                    <ZoomIn size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                                                ativo.status === 'OPERACIONAL' ? 'bg-emerald-100 text-emerald-700' : 
                                                ativo.status === 'MANUTENCAO' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {ativo.status}
                                            </span>
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                                                ativo.tipoPropriedade === 'CLIENTE' 
                                                ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                            }`}>
                                                {ativo.tipoPropriedade === 'CLIENTE' ? (
                                                    <><User size={10} /> {ativo.cliente?.nome || 'Cliente'}</>
                                                ) : (
                                                    'INTERNO'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 truncate">{ativo.nome}</h3>
                                    <div className="text-xs text-gray-500 mb-4">{ativo.categoria} • {ativo.localizacao || "Sem local fixa"}</div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-[11px]">
                                            <span className="text-gray-400">Patrimônio / Tombo</span>
                                            <span className="font-mono font-bold text-gray-700">{ativo.numeroPatrimonio}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px]">
                                            <span className="text-gray-400">Série</span>
                                            <span className="font-mono text-gray-600">{ativo.numeroSerie || "-"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 border-t pt-4">
                                        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                                            <History size={14} /> Histórico
                                        </button>
                                        <Link href={`#`} className="flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                                            <Wrench size={14} /> Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {previewPhoto && (
                    <ImageOverlay 
                        src={previewPhoto} 
                        onClose={() => setPreviewPhoto(null)} 
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
