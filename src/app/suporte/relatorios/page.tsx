"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { 
    BarChart3, TrendingUp, Users, Package, FileText, 
    Plus, Search, Calendar, ChevronRight, Layout, Settings2,
    Printer, Download, Trash2, Edit3, ClipboardCheck, Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

export default function RelatoriosPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'servicos' | 'templates'>('dashboard');
    const [relatorios, setRelatorios] = useState<any[]>([]);
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [clientes, setClientes] = useState<any[]>([]);
    const [filtros, setFiltros] = useState({ periodo: '30d', clienteId: '' });
    
    // Template Modal State
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<any>(null);
    const [templateForm, setTemplateForm] = useState({ titulo: "", descricao: "", categoria: "Geral" });

    useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchStats();
            fetchClientes();
        }
        if (activeTab === 'servicos') fetchRelatorios();
        if (activeTab === 'templates') fetchTemplates();
    }, [activeTab, filtros]);

    const fetchClientes = async () => {
        try {
            const res = await fetch("/api/clientes");
            const data = await res.json();
            setClientes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filtros).toString();
            const res = await fetch(`/api/suporte/stats?${query}`);
            const data = await res.json();
            setStats(data);
        } catch (error) {
            toast.error("Erro ao carregar estatísticas");
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatorios = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/suporte/relatorios/mensal");
            const data = await res.json();
            setRelatorios(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Erro ao carregar relatórios");
        } finally {
            setLoading(false);
        }
    };

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/suporte/relatorios/templates");
            const data = await res.json();
            setTemplates(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Erro ao carregar templates");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingTemplate ? "PUT" : "POST";
            const url = editingTemplate 
                ? `/api/suporte/relatorios/templates/${editingTemplate.id}` 
                : "/api/suporte/relatorios/templates";

            const res = await fetch(url, {
                method,
                body: JSON.stringify(templateForm),
            });

            if (res.ok) {
                toast.success(editingTemplate ? "Template atualizado!" : "Template criado!");
                setIsTemplateModalOpen(false);
                setEditingTemplate(null);
                setTemplateForm({ titulo: "", descricao: "", categoria: "Geral" });
                fetchTemplates();
            }
        } catch (error) {
            toast.error("Erro ao salvar template");
        }
    };

    const handleDeleteTemplate = async (id: number) => {
        if (!confirm("Deseja realmente excluir este template?")) return;
        try {
            const res = await fetch(`/api/suporte/relatorios/templates/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Template removido");
                fetchTemplates();
            }
        } catch (error) {
            toast.error("Erro ao excluir template");
        }
    };

    const openEditTemplate = (tmpl: any) => {
        setEditingTemplate(tmpl);
        setTemplateForm({ titulo: tmpl.titulo, descricao: tmpl.descricao, categoria: tmpl.categoria || "Geral" });
        setIsTemplateModalOpen(true);
    };

    return (
        <PermissionGuard module="GESTAO">
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900">Relatórios & Documentação</h1>
                    <p className="text-gray-500 text-sm">Métricas, relatórios de serviço e templates de atividades</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                        { id: 'servicos', label: 'Relatórios', icon: FileText },
                        { id: 'templates', label: 'Templates', icon: Layout },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${
                                activeTab === tab.id 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Intelligent Filter Bar */}
                        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex bg-gray-50 p-1 rounded-xl w-full md:w-fit">
                                {[
                                    { id: '7d', label: '7 dias' },
                                    { id: '30d', label: '30 dias' },
                                    { id: '90d', label: '90 dias' },
                                    { id: 'ano', label: 'Este Ano' },
                                ].map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setFiltros({ ...filtros, periodo: p.id })}
                                        className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                            filtros.periodo === p.id 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-fit px-2">
                                <Users size={16} className="text-gray-400" />
                                <select 
                                    className="flex-1 md:w-64 bg-transparent outline-none text-sm font-bold text-gray-700"
                                    value={filtros.clienteId}
                                    onChange={(e) => setFiltros({ ...filtros, clienteId: e.target.value })}
                                >
                                    <option value="">Todos os Clientes</option>
                                    {clientes.map(c => (
                                        <option key={c.id} value={c.id}>{c.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {loading && !stats ? (
                            <div className="p-20 text-center text-gray-400 animate-pulse">Calculando métricas...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Volume Chart */}
                                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 min-h-[350px] flex flex-col">
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <BarChart3 size={14} className="text-blue-500" /> Volume de Atendimentos
                                        </h3>
                                        <div className="flex-1 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={stats?.historicoVolume}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                    <Tooltip 
                                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                                    />
                                                    <Bar dataKey="chamados" name="Chamados" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="ordens" name="OS" fill="#10b981" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Revenue Chart */}
                                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 min-h-[350px] flex flex-col">
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <TrendingUp size={14} className="text-emerald-500" /> Faturamento Projetado (R$)
                                        </h3>
                                        <div className="flex-1 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={stats?.faturamento}>
                                                    <defs>
                                                        <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                    <Tooltip 
                                                        formatter={(value: any) => `R$ ${value.toLocaleString()}`}
                                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                                    />
                                                    <Area type="monotone" dataKey="recorrente" name="Recorrente" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRec)" strokeWidth={3} />
                                                    <Area type="monotone" dataKey="servicos" name="Serviços" stroke="#f59e0b" fillOpacity={0} strokeWidth={3} strokeDasharray="5 5" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                {/* Operational Metrics */}
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
                                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Settings2 size={18} className="text-blue-500" /> RESUMO OPERACIONAL
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        {[
                                            { label: "SLA Médio", value: stats?.metricas?.slaMedio || "0h", icon: Clock, color: "blue" },
                                            { label: "Clientes Ativos", value: stats?.metricas?.clientes || "0", icon: Users, color: "emerald" },
                                            { label: "Peças Usadas", value: stats?.metricas?.pecasQtd || "0", icon: Package, color: "orange" },
                                            { label: "Custo Peças", value: `R$ ${stats?.metricas?.pecasValor?.toLocaleString() || '0,00'}`, icon: TrendingUp, color: "purple" },
                                        ].map((item) => (
                                            <div key={item.label} className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                                    <item.icon size={12} className={`text-${item.color}-500`} /> {item.label}
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'servicos' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input placeholder="Buscar por cliente ou número..." className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <Link href="/suporte/relatorios/mensal/novo" className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200">
                                <Plus size={20} /> Novo Relatório
                            </Link>
                        </div>

                        {loading ? (
                            <div className="p-20 text-center text-gray-400 animate-pulse">Carregando relatórios...</div>
                        ) : relatorios.length === 0 ? (
                            <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-gray-100 text-center space-y-4">
                                <FileText className="w-16 h-16 text-gray-200 mx-auto" />
                                <div className="max-w-xs mx-auto text-gray-500">
                                    Nenhum relatório mensal gerado. Clique em "Novo Relatório" para iniciar o fechamento de um cliente.
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] sm:min-w-0">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                        <tr>
                                            <th className="text-left p-6">Relatório #</th>
                                            <th className="text-left p-6">Cliente</th>
                                            <th className="text-left p-6">Mês Referência</th>
                                            <th className="text-left p-6">Template</th>
                                            <th className="text-left p-6">Status</th>
                                            <th className="text-right p-6">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {relatorios.map((rel) => (
                                            <tr key={rel.id} className="hover:bg-gray-50/50 transition-colors group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <td className="p-6 font-bold text-gray-900">{rel.numero}</td>
                                                <td className="p-6">{rel.cliente?.nome}</td>
                                                <td className="p-6">{rel.mesReferencia}/{rel.anoReferencia}</td>
                                                <td className="p-6">
                                                   <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-lg">{rel.tipoTemplate}</span>
                                                </td>
                                                <td className="p-6">
                                                   <span className={`text-[10px] font-black px-2 py-1 rounded-full ${rel.status === 'FINALIZADO' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                       {rel.status}
                                                   </span>
                                                </td>
                                                <td className="p-6 text-right space-x-2">
                                                    <Link href={`/suporte/relatorios/mensal/${rel.id}/print`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors inline-block">
                                                        <Printer size={18} />
                                                    </Link>
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit3 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-800">Modelos de Descrição de Serviço</h2>
                            <button 
                                onClick={() => { setEditingTemplate(null); setTemplateForm({ titulo: "", descricao: "", categoria: "Geral" }); setIsTemplateModalOpen(true); }}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition-all font-bold"
                            >
                                <Plus size={18} /> Novo Template
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map(tmpl => (
                                <div key={tmpl.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Layout size={20} /></div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditTemplate(tmpl)} className="text-gray-300 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"><Edit3 size={16} /></button>
                                            <button onClick={() => handleDeleteTemplate(tmpl.id)} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{tmpl.titulo}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{tmpl.descricao}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                        <ClipboardCheck size={12} /> {tmpl.categoria || "Geral"}
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => { setEditingTemplate(null); setTemplateForm({ titulo: "", descricao: "", categoria: "Geral" }); setIsTemplateModalOpen(true); }}
                                className="bg-gray-50 border-2 border-dashed border-gray-200 p-10 rounded-3xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-100 transition-all group"
                            >
                                <Plus className="group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold">Adicionar Atividade Comum</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Template Modal */}
                {isTemplateModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900">{editingTemplate ? "Editar Template" : "Novo Template de Serviço"}</h3>
                                <button onClick={() => setIsTemplateModalOpen(false)} className="text-gray-400 hover:text-gray-600 leading-none text-2xl">&times;</button>
                            </div>
                            <form onSubmit={handleSaveTemplate} className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 block">Título do Serviço</label>
                                    <input 
                                        required
                                        value={templateForm.titulo}
                                        onChange={e => setTemplateForm({ ...templateForm, titulo: e.target.value })}
                                        placeholder="Ex: Manutenção Preventiva Mensal" 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 block">Categoria</label>
                                    <input 
                                        value={templateForm.categoria}
                                        onChange={e => setTemplateForm({ ...templateForm, categoria: e.target.value })}
                                        placeholder="Ex: Infraestrutura, Software, Rede" 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 block">Descrição Padrão</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        value={templateForm.descricao}
                                        onChange={e => setTemplateForm({ ...templateForm, descricao: e.target.value })}
                                        placeholder="Descreva as atividades que compõem este serviço..." 
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                                    />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsTemplateModalOpen(false)}
                                        className="flex-1 p-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] p-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        {editingTemplate ? "Salvar Alterações" : "Criar Modelo"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    </PermissionGuard>
    );
}
