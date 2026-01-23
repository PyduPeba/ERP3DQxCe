"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ClipboardList, Plus, Search, Filter, ArrowRight, User, Laptop, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OSInternasPage() {
    const [ordens, setOrdens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchOrdens();
    }, []);

    const fetchOrdens = async () => {
        try {
            const res = await fetch("/api/suporte/ati/os");
            const data = await res.json();
            setOrdens(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching ordens:", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredOrdens = ordens.filter(o => 
        o.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.ativo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.solicitante.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ABERTA": return "bg-blue-100 text-blue-700 border-blue-200";
            case "EM_EXECUCAO": return "bg-amber-100 text-amber-700 border-amber-200";
            case "CONCLUIDA": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "CANCELADA": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço Internas</h1>
                        <p className="text-gray-500">Manutenção e reparos de ativos da empresa</p>
                    </div>
                    <Link href="/suporte/ati/os/nova" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm shadow-sm font-bold">
                        <Plus className="w-4 h-4" />
                        Nova OS ATI
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por número, ativo ou solicitante..." 
                            className="w-full pl-9 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select className="bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Todos os Status</option>
                        <option value="ABERTA">Aberta</option>
                        <option value="EM_EXECUCAO">Em Execução</option>
                        <option value="CONCLUIDA">Concluída</option>
                    </select>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Número / Data</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Ativo Focado</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Solicitante</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="p-12 text-center text-gray-400">Carregando ordens...</td></tr>
                            ) : filteredOrdens.length === 0 ? (
                                <tr><td colSpan={5} className="p-12 text-center text-gray-400 italic">Nenhuma ordem encontrada</td></tr>
                            ) : (
                                filteredOrdens.map((os) => (
                                    <tr key={os.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900 text-sm">{os.numero}</div>
                                            <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Calendar size={10} /> {new Date(os.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-gray-100 text-gray-500 rounded-lg"><Laptop size={14} /></div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">{os.ativo.nome}</div>
                                                    <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{os.ativo.numeroPatrimonio}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                                    {os.solicitante.nome.charAt(0)}
                                                </div>
                                                <span className="text-sm text-gray-600">{os.solicitante.nome}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(os.status)}`}>
                                                {os.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-gray-100 transition-all text-gray-400 hover:text-blue-600">
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </DashboardLayout>
    );
}
