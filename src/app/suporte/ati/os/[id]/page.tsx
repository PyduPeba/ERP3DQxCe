"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ClipboardList, Save, ArrowLeft, Laptop, User, AlertCircle, Wrench, CheckCircle2, Package, Search, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function OSInternaDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [os, setOs] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Pieces logic
    const [estoque, setEstoque] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedParts, setSelectedParts] = useState<any[]>([]);

    const [laudo, setLaudo] = useState("");

    useEffect(() => {
        fetchOS();
        fetchEstoque();
    }, []);

    const fetchOS = async () => {
        try {
            const res = await fetch(`/api/suporte/ati/os/${params.id}`);
            const data = await res.json();
            
            if (data.error || !data.id) {
                setOs(null);
            } else {
                setOs(data);
                setLaudo(data.laudoTecnico || "");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchEstoque = async () => {
        try {
            const res = await fetch("/api/suporte/estoque");
            const data = await res.json();
            setEstoque(data);
        } catch (error) {
            console.error(error);
        }
    }

    const addPart = (item: any) => {
        if (selectedParts.find(p => p.itemEstoqueId === item.id)) return;
        setSelectedParts([...selectedParts, { 
            itemEstoqueId: item.id, 
            nome: item.nome, 
            quantidade: 1, 
            custo: item.custoMedio || 0 
        }]);
    }

    const removePart = (id: number) => {
        setSelectedParts(selectedParts.filter(p => p.itemEstoqueId !== id));
    }

    const handleFinalize = async () => {
        if (!laudo) return toast.error("Preencha o laudo técnico antes de finalizar.");
        
        setSaving(true);
        try {
            const res = await fetch(`/api/suporte/ati/os/${params.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: "CONCLUIDA",
                    laudoTecnico: laudo,
                    parts: selectedParts,
                    tecnicoNome: os.tecnico?.nome || "Sistema ATI"
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Erro ao finalizar OS");
            }

            toast.success("Ordem de Serviço finalizada com sucesso!");
            fetchOS();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <DashboardLayout><div className="p-12 text-center">Carregando OS...</div></DashboardLayout>;
    if (!os) return <DashboardLayout><div className="p-12 text-center">OS não encontrada</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link href="/suporte/ati/os" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{os.numero}</h1>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${
                                    os.status === 'CONCLUIDA' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                                }`}>
                                    {os.status}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm">Abertura: {new Date(os.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    {os.status !== 'CONCLUIDA' && (
                        <button 
                            onClick={handleFinalize}
                            disabled={saving}
                            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 font-bold active:scale-95"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 size={20} />}
                            Finalizar Manutenção
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Coluna 1: Dados do Ativo e Solicitante */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Informações do Ativo</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-4 bg-gray-50 rounded-2xl text-blue-600"><Laptop size={32} /></div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-gray-900 truncate">{os.ativo.nome}</h4>
                                    <p className="text-xs text-gray-500">Pat: {os.ativo.numeroPatrimonio}</p>
                                    <p className="text-xs text-gray-500">Local: {os.ativo.localizacao || "N/A"}</p>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-50" />
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Solicitante</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">{os.solicitante.nome.charAt(0)}</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{os.solicitante.nome}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">{os.solicitante.perfil}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Problema Relatado</h3>
                            <div className="p-4 bg-red-50/50 rounded-2xl border border-red-50 text-sm text-red-900 leading-relaxed italic">
                                "{os.descricaoProblema}"
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2 e 3: Laudo e Peças */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Laudo Técnico */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Wrench size={16} /> Laudo Técnico de Execução
                            </h3>
                            {os.status === 'CONCLUIDA' ? (
                                <div className="p-4 bg-gray-50 rounded-2xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[150px]">
                                    {os.laudoTecnico || "Sem laudo preenchido."}
                                </div>
                            ) : (
                                <textarea 
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
                                    rows={8}
                                    placeholder="Descreva o que foi feito, testes realizados e conclusão..."
                                    value={laudo}
                                    onChange={(e) => setLaudo(e.target.value)}
                                />
                            )}
                        </div>

                        {/* Peças e Componentes */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                    <Package size={16} /> Peças e Insumos do Estoque
                                </h3>
                                <div className="text-xs font-bold text-gray-400">Custo da OS: R$ {os.custoTotal?.toFixed(2) || (selectedParts.reduce((acc, p) => acc + (p.custo * p.quantidade), 0).toFixed(2))}</div>
                            </div>

                            {os.status !== 'CONCLUIDA' && (
                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar peça no estoque para adicionar..." 
                                        className="w-full pl-9 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm.length > 1 && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto">
                                            {estoque.filter(i => i.nome.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                                                <button 
                                                    key={item.id}
                                                    onClick={() => { addPart(item); setSearchTerm(""); }}
                                                    className="w-full p-3 hover:bg-emerald-50 text-left border-b border-gray-50 flex justify-between items-center transition-colors"
                                                >
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-800">{item.nome}</div>
                                                        <div className="text-[10px] text-gray-500">Qtd Disp: {item.quantidade} {item.unidade}</div>
                                                    </div>
                                                    <Plus size={16} className="text-emerald-500" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* List of used parts */}
                            <div className="space-y-3">
                                {os.status === 'CONCLUIDA' ? (
                                    os.itensUsados?.length > 0 ? os.itensUsados.map((item: any) => (
                                        <div key={item.id} className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-lg"><Package size={16} className="text-gray-400" /></div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-800">{item.item.nome}</div>
                                                    <div className="text-[10px] text-gray-500">{item.quantidade} unidades</div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-mono text-gray-400">R$ {((item.valorCustoNoMomento || 0) * item.quantidade).toFixed(2)}</div>
                                        </div>
                                    )) : <p className="text-center text-gray-400 text-xs italic py-4">Nenhuma peça utilizada nesta manutenção.</p>
                                ) : (
                                    selectedParts.length > 0 ? selectedParts.map((p) => (
                                        <div key={p.itemEstoqueId} className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-50 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-lg text-emerald-600"><Package size={16} /></div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-800">{p.nome}</div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <input 
                                                            type="number" 
                                                            className="w-12 p-1 bg-white border border-emerald-100 rounded text-xs text-center font-bold"
                                                            value={p.quantidade}
                                                            min={1}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (val > 0) setSelectedParts(selectedParts.map(sp => sp.itemEstoqueId === p.itemEstoqueId ? {...sp, quantidade: val} : sp));
                                                            }}
                                                        />
                                                        <span className="text-[10px] text-gray-400 uppercase font-black">Unidades</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removePart(p.itemEstoqueId)}
                                                className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )) : <p className="text-center text-gray-400 text-xs italic py-4">Nenhuma peça adicionada ainda.</p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
