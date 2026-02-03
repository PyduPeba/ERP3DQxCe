"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { 
    FileText, ArrowLeft, Save, Calendar, User, 
    Plus, Trash2, Layout, ClipboardList, Search,
    ChevronDown, ChevronUp, Clock, Eye, X, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import RelatorioPrevia from "@/app/components/suporte/RelatorioPrevia";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function NovoRelatorioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState<any[]>([]);
    const [templates, setTemplates] = useState<any[]>([]);
    
    // Form State
    const [formData, setFormData] = useState({
        clienteId: "",
        mesReferencia: new Date().getMonth() + 1,
        anoReferencia: new Date().getFullYear(),
        tipoTemplate: "PADRAO",
        observacoes: "",
    });

    const [itens, setItens] = useState<any[]>([]);
    const [showTemplatePicker, setShowTemplatePicker] = useState<number | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string[]>(["concluido"]);

    const selectedCliente = clientes.find(c => c.id.toString() === formData.clienteId);

    useEffect(() => {
        // Load initial data
        fetch("/api/clientes").then(res => res.json()).then(setClientes);
        fetch("/api/suporte/relatorios/templates").then(res => res.json()).then(setTemplates);
    }, []);

    // Fetch tickets for the selected client and month
    const pullServices = async () => {
        if (!formData.clienteId) {
            toast.error("Selecione um cliente primeiro");
            return;
        }
        
        if (statusFilter.length === 0) {
            toast.error("Selecione pelo menos um status para importar");
            return;
        }
        
        setLoading(true);
        try {
            // Fetch OS directly with status filter
            const statusQuery = statusFilter.join(',');
            const res = await fetch(`/api/suporte/os?clienteId=${formData.clienteId}&mes=${formData.mesReferencia}&ano=${formData.anoReferencia}&status=${statusQuery}`);
            const ordens = await res.json();
            
            if (Array.isArray(ordens)) {
                const newItens = ordens.map(os => {
                    // Collect photos from OS
                    const osPhotos = os.anexos?.map((anexo: any) => anexo.url) || [];

                    return {
                        data: os.dataInicio || os.createdAt,
                        descricaoServico: os.laudoTecnico || os.descricao,
                        equipamento: os.chamado?.equipamento || "",
                        tombo: os.chamado?.patrimonio || "",
                        status: "Realizado",
                        fotos: Array.from(new Set(osPhotos)).filter(Boolean)
                    };
                });
                setItens(newItens);
                toast.success(`${newItens.length} atividades importadas!`);
            }
        } catch (error) {
            toast.error("Erro ao importar serviços");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.clienteId || itens.length === 0) {
            toast.error("Preencha o cliente e adicione pelo menos um serviço");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/suporte/relatorios/mensal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, itens })
            });

            if (res.ok) {
                toast.success("Relatório gerado com sucesso!");
                router.push("/suporte/relatorios");
            } else {
                toast.error("Erro ao salvar relatório");
            }
        } catch (error) {
            toast.error("Erro na comunicação com o servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-20">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href="/suporte/relatorios" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-bold">Voltar</span>
                    </Link>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setShowPreview(true)}
                            className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-50 transition-all font-bold"
                        >
                            <Eye size={20} /> Visualizar Prévia
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100 disabled:opacity-50"
                        >
                            <Save size={20} /> {loading ? "Gerando..." : "Finalizar Relatório"}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
                    <div className="p-8 bg-blue-600">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FileText size={28} /> Gerador de Relatório Mensal
                        </h1>
                        <p className="text-blue-100">Agregue todos os serviços realizados no mês para faturamento profissional.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Configuração Básica */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Cliente / Órgão</label>
                                <select 
                                    value={formData.clienteId}
                                    onChange={e => setFormData({...formData, clienteId: e.target.value})}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                >
                                    <option value="">Selecione o cliente...</option>
                                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Período</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <select 
                                        value={formData.mesReferencia}
                                        onChange={e => setFormData({...formData, mesReferencia: Number(e.target.value)})}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium"
                                    >
                                        {Array.from({length: 12}, (_, i) => (
                                            <option key={i+1} value={i+1}>
                                                {format(new Date(2024, i, 1), 'MMMM', {locale: ptBR})}
                                            </option>
                                        ))}
                                    </select>
                                    <select 
                                        value={formData.anoReferencia}
                                        onChange={e => setFormData({...formData, anoReferencia: Number(e.target.value)})}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium"
                                    >
                                        <option value={2024}>2024</option>
                                        <option value={2025}>2025</option>
                                        <option value={2026}>2026</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Modelo de Impressão</label>
                                <select 
                                    value={formData.tipoTemplate}
                                    onChange={e => setFormData({...formData, tipoTemplate: e.target.value})}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium"
                                >
                                    <option value="PADRAO">Técnico Padrão</option>
                                    <option value="DETALHADO">Órgão Público (Completo)</option>
                                    <option value="SIMPLIFICADO">Resumo Executivo</option>
                                </select>
                            </div>
                        </div>

                        {/* Status Filter for Import */}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <label className="block text-xs font-black text-gray-700 uppercase mb-3 tracking-widest">
                                Filtrar por Status das OS:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { value: "concluido", label: "Concluídas", icon: CheckCircle, color: "green" },
                                    { value: "em_andamento", label: "Em Andamento", icon: Clock, color: "blue" },
                                    { value: "pendente", label: "Pendentes", icon: AlertCircle, color: "yellow" },
                                    { value: "cancelado", label: "Canceladas", icon: XCircle, color: "red" }
                                ].map((status) => {
                                    const Icon = status.icon;
                                    const isSelected = statusFilter.includes(status.value);
                                    const colorClasses = {
                                        green: isSelected ? "bg-green-600 text-white border-green-600" : "bg-white text-green-600 border-green-200 hover:bg-green-50",
                                        blue: isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50",
                                        yellow: isSelected ? "bg-yellow-600 text-white border-yellow-600" : "bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50",
                                        red: isSelected ? "bg-red-600 text-white border-red-600" : "bg-white text-red-600 border-red-200 hover:bg-red-50"
                                    };
                                    return (
                                        <button
                                            key={status.value}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    setStatusFilter(statusFilter.filter(s => s !== status.value));
                                                } else {
                                                    setStatusFilter([...statusFilter, status.value]);
                                                }
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all border ${colorClasses[status.color as keyof typeof colorClasses]}`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {status.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button 
                                onClick={pullServices}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100"
                            >
                                <ClipboardList size={14} /> Importar serviços do mês automaticamente
                            </button>
                        </div>

                        <hr className="border-gray-50" />

                        {/* Tabela de Itens */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Layout size={14} /> Detalhamento de Atividades
                                </h3>
                                <button 
                                    onClick={() => setItens([...itens, { data: new Date().toISOString(), descricaoServico: "", equipamento: "", tombo: "", status: "Realizado", fotos: [] }])}
                                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1"
                                >
                                    <Plus size={16} /> Adicionar Manualmente
                                </button>
                            </div>

                            <div className="space-y-3">
                                {itens.map((item, idx) => (
                                    <div key={idx} className="group relative bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-start animate-in fade-in slide-in-from-top-2">
                                        <div className="w-full md:w-32">
                                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Data</label>
                                                <input 
                                                    type="date" 
                                                    value={item.data ? item.data.split('T')[0] : ''}
                                                    onChange={e => {
                                                        const newItens = itens.map((it, i) => i === idx ? { ...it, data: e.target.value } : it);
                                                        setItens(newItens);
                                                    }}
                                                    className="w-full bg-white border border-gray-100 p-2 rounded-lg text-xs font-bold outline-none"
                                                />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-[9px] font-black text-gray-400 uppercase block">Descrição do Serviço Profissional</label>
                                                <div className="relative">
                                                    <button 
                                                        onClick={() => setShowTemplatePicker(showTemplatePicker === idx ? null : idx)}
                                                        className="text-[9px] font-black text-blue-600 uppercase hover:underline flex items-center gap-1"
                                                    >
                                                        <Layout size={10} /> Usar Template
                                                    </button>
                                                    
                                                    {showTemplatePicker === idx && (
                                                        <div className="absolute right-0 top-6 w-64 bg-white border border-gray-200 shadow-2xl rounded-xl z-50 p-2 space-y-1 animate-in zoom-in-95">
                                                            <div className="p-2 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Escolha um modelo</div>
                                                            {templates.map(tmpl => (
                                                                <button 
                                                                    key={tmpl.id}
                                                                    onClick={() => {
                                                                        const newItens = [...itens];
                                                                        newItens[idx].descricaoServico = tmpl.descricao;
                                                                        setItens(newItens);
                                                                        setShowTemplatePicker(null);
                                                                    }}
                                                                    className="w-full text-left p-2 hover:bg-blue-50 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                                                                >
                                                                    {tmpl.titulo}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <textarea 
                                                rows={2}
                                                value={item.descricaoServico}
                                                onChange={e => {
                                                    const newItens = itens.map((it, i) => i === idx ? { ...it, descricaoServico: e.target.value } : it);
                                                    setItens(newItens);
                                                }}
                                                placeholder="Ex: Manutenção preventiva e limpeza técnica de terminal computacional..."
                                                className="w-full bg-white border border-gray-100 p-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-200 resize-none"
                                            />
                                            
                                            {/* Photos Section */}
                                            <div className="mt-4 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase">Evidências Fotográficas</label>
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => {
                                                                const url = prompt("Insira a URL da foto:");
                                                                if (url) {
                                                                    const newItens = itens.map((it, i) => i === idx ? { 
                                                                        ...it, 
                                                                        fotos: [...(it.fotos || []), url] 
                                                                    } : it);
                                                                    setItens(newItens);
                                                                }
                                                            }}
                                                            className="text-[9px] font-black text-emerald-600 uppercase hover:underline"
                                                        >
                                                            + Adicionar Foto
                                                        </button>
                                                        {item.fotos && item.fotos.length > 0 && (
                                                            <span className="text-[9px] font-black px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                                                {item.fotos.length} {item.fotos.length === 1 ? 'FOTO' : 'FOTOS'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.fotos?.map((foto: string, fIdx: number) => (
                                                        <div key={fIdx} className="relative group/foto w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                                                            <img src={foto} className="w-full h-full object-cover" alt="Evidência" />
                                                            <button 
                                                                onClick={() => {
                                                                    const newItens = itens.map((it, i) => i === idx ? { 
                                                                        ...it, 
                                                                        fotos: it.fotos.filter((_: any, fi: number) => fi !== fIdx) 
                                                                    } : it);
                                                                    setItens(newItens);
                                                                }}
                                                                className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/foto:opacity-100 flex items-center justify-center transition-opacity"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-32 text-right">
                                            <button 
                                                onClick={() => setItens(itens.filter((_, i) => i !== idx))}
                                                className="mt-6 p-2 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Observações Finais */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                <Clock size={14} /> Considerações Finais do Relatório
                            </label>
                            <textarea 
                                rows={3}
                                value={formData.observacoes}
                                onChange={e => setFormData({...formData, observacoes: e.target.value})}
                                placeholder="Notas sobre a qualidade dos serviços, recomendações técnicas ou ressalvas importantes..."
                                className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Modal */}
                {showPreview && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                        <div className="bg-white rounded-3xl w-full max-w-5xl h-full overflow-hidden flex flex-col shadow-2xl">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Prévia do Relatório</h3>
                                    <p className="text-xs text-gray-500 font-medium">Esta é uma visualização de como o documento será impresso.</p>
                                </div>
                                <button 
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-200/50">
                                <div className="max-w-[210mm] mx-auto shadow-xl">
                                    <RelatorioPrevia 
                                        data={{
                                            ...formData,
                                            cliente: selectedCliente
                                        }} 
                                        itens={itens} 
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                <button 
                                    onClick={() => setShowPreview(false)}
                                    className="px-6 py-2 text-gray-600 font-bold hover:bg-white rounded-xl transition-all"
                                >
                                    Fechar Prévia
                                </button>
                                <button 
                                    onClick={() => { setShowPreview(false); handleSave(); }}
                                    className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                                >
                                    Tudo Certo, Finalizar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
