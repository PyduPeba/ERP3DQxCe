"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { Laptop, Wrench, ClipboardList, ArrowLeftRight, AlertCircle, Plus, Search, ChevronRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ATIDashboard() {
    const [ativos, setAtivos] = useState<any[]>([]);
    const [ordens, setOrdens] = useState<any[]>([]);
    const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalAtivos: 0,
        ativosClientes: 0,
        emManutencao: 0,
        osAbertas: 0,
        custoMes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [ativosRes, osRes, movesRes] = await Promise.all([
                fetch("/api/suporte/ati/ativos"),
                fetch("/api/suporte/ati/os"),
                fetch("/api/suporte/ati/movimentacoes")
            ]);
            
            const ativosData = await ativosRes.json();
            const osData = await osRes.json();
            const movesData = await movesRes.json();

            // Defensive checks
            const safeAtivos = Array.isArray(ativosData) ? ativosData : [];
            const safeOS = Array.isArray(osData) ? osData : [];
            const safeMoves = Array.isArray(movesData) ? movesData : [];

            setAtivos(safeAtivos);
            setOrdens(safeOS);
            setMovimentacoes(safeMoves);

            // Simple stats calculation
            setStats({
                totalAtivos: safeAtivos.filter((a: any) => a.tipoPropriedade !== "CLIENTE").length,
                ativosClientes: safeAtivos.filter((a: any) => a.tipoPropriedade === "CLIENTE").length,
                emManutencao: safeAtivos.filter((a: any) => a.status === "MANUTENCAO").length,
                osAbertas: safeOS.filter((o: any) => o.status === "ABERTA" || o.status === "EM_EXECUCAO").length,
                custoMes: safeOS.filter((o: any) => o.status === "CONCLUIDA").reduce((acc: number, o: any) => acc + (o.custoTotal || 0), 0)
            });

        } catch (error) {
            console.error("Error fetching ATI data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
    <PermissionGuard module="GESTAO">
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Laptop className="w-8 h-8 text-blue-600" />
                            Assistência Técnica Interna (ATI)
                        </h1>
                        <p className="text-gray-500 text-sm">Gestão de ativos e manutenção da infraestrutura interna</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/suporte/ati/ativos/novo" className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm shadow-sm font-bold">
                            <Plus className="w-4 h-4 text-blue-500" />
                            Novo Ativo
                        </Link>
                        <Link href="/suporte/ati/os/nova" className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-900/10 font-bold">
                            <ClipboardList className="w-4 h-4" />
                            Nova OS Interna
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Laptop size={20} /></div>
                            <span className="text-sm font-medium text-gray-500">Ativos Próprios</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalAtivos}</p>
                        {stats.ativosClientes > 0 && (
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100">
                                + {stats.ativosClientes} de Clientes
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
                            <span className="text-sm font-medium text-gray-500">Em Manutenção</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.emManutencao}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ClipboardList size={20} /></div>
                            <span className="text-sm font-medium text-gray-500">OS Ativas</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.osAbertas}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Plus size={20} /></div>
                            <span className="text-sm font-medium text-gray-500">Custo (Mês)</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">R$ {stats.custoMes.toFixed(2)}</p>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Recent OS's */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                <ClipboardList size={18} className="text-blue-500" />
                                Ordens de Serviço Recentes
                            </h2>
                            <Link href="/suporte/ati/os" className="text-xs text-blue-600 hover:underline flex items-center gap-1"> Ver Todas <ChevronRight size={14} /></Link>
                        </div>
                        <div className="p-2 flex-1">
                            {ordens.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 text-sm italic">Nenhuma OS registrada</div>
                            ) : (
                                <div className="space-y-1">
                                    {ordens.slice(0, 5).map((os: any) => (
                                        <div key={os.id} className="p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${os.status === 'CONCLUIDA' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                                <div>
                                                    <div className="font-bold text-gray-800 text-sm">{os.numero} - {os.ativo.nome}</div>
                                                    <div className="text-xs text-gray-500">Solicitado por: {os.solicitante.nome}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-black uppercase text-gray-400">{os.status}</div>
                                                <div className="text-[10px] text-gray-400">{new Date(os.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Asset List */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                <Laptop size={18} className="text-blue-500" />
                                Ativos Internos
                            </h2>
                            <Link href="/suporte/ati/ativos" className="text-xs text-blue-600 hover:underline flex items-center gap-1"> Ver Todos <ChevronRight size={14} /></Link>
                        </div>
                        <div className="p-2 flex-1">
                             <div className="grid grid-cols-2 gap-2">
                                {ativos.slice(0, 6).map((ativo: any) => (
                                    <div key={ativo.id} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col">
                                        <div className="text-xs font-black text-blue-600 uppercase mb-1">{ativo.categoria}</div>
                                        <div className="font-bold text-gray-900 text-sm truncate">{ativo.nome}</div>
                                        <div className="text-[10px] text-gray-500 mb-2 truncate">Tombo: {ativo.numeroPatrimonio}</div>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${ativo.status === 'OPERACIONAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {ativo.status}
                                            </span>
                                            <span className="text-[9px] text-gray-400">{ativo.localizacao || "N/A"}</span>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* Internal Movements Quick Access */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/suporte/ati/movimentacoes" className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-blue-100 text-white flex items-center justify-between hover:scale-[1.01] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-xl"><ArrowLeftRight size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg">Protocolos de Entrega & Devolução</h3>
                                    <p className="text-blue-100 text-sm">Gerencie a posse de ativos e gere termos de responsabilidade.</p>
                                </div>
                            </div>
                            <ChevronRight />
                        </Link>

                        {/* Mini list of recent movements */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                             <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Movimentações Recentes</h3>
                                <Link href="/suporte/ati/movimentacoes" className="text-[10px] text-blue-600 font-bold hover:underline">Ver Histórico</Link>
                             </div>
                             <div className="p-2">
                                {movimentacoes.length === 0 ? (
                                    <p className="p-4 text-center text-gray-400 text-xs italic">Nenhuma movimentação recente.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        {movimentacoes.slice(0, 3).map((m: any) => (
                                            <div key={m.id} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <div className={`w-1.5 h-8 rounded-full ${m.tipo === 'ENTREGA' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                                                    <div className="overflow-hidden">
                                                        <div className="text-[10px] font-bold text-gray-800 truncate">{m.ativo.nome}</div>
                                                        <div className="text-[9px] text-gray-500 truncate">{m.tipo}: {m.usuario.nome}</div>
                                                    </div>
                                                </div>
                                                <Link href={`/suporte/ati/movimentacoes/${m.id}/imprimir`} target="_blank" className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                                                    <FileText size={14} />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    </PermissionGuard>
    );
}
