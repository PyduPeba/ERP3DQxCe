"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Laptop, Save, ArrowLeft, Tag, Calendar, DollarSign, MapPin, Box, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NovoAtivoPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [clientes, setClientes] = useState<any[]>([]);
    
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        categoria: "TI",
        numeroPatrimonio: "",
        numeroSerie: "",
        dataAquisicao: "",
        valorAquisicao: "",
        localizacao: "",
        status: "OPERACIONAL",
        tipoPropriedade: "INTERNO", // INTERNO ou CLIENTE
        clienteId: ""
    });

    useEffect(() => {
        fetch("/api/clientes").then(res => res.json()).then(data => {
            if (Array.isArray(data)) setClientes(data);
        });
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/suporte/ati/ativos", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar");

            toast.success("Ativo cadastrado com sucesso!");
            router.push("/suporte/ati/ativos");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/suporte/ati/ativos" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Novo Ativo Interno</h1>
                        <p className="text-gray-500">Cadastre um novo bem no patrimônio da empresa</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        {/* Seção: Identificação */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Tag size={14} /> Propriedade & Identificação
                            </h3>
                            
                            {/* Toggle Propriedade */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Este ativo pertence a quem?</label>
                                    <div className="flex gap-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, tipoPropriedade: 'INTERNO', clienteId: '' }))}
                                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${formData.tipoPropriedade === 'INTERNO' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            Propriedade da Empresa
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, tipoPropriedade: 'CLIENTE' }))}
                                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${formData.tipoPropriedade === 'CLIENTE' ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            Propriedade de Cliente
                                        </button>
                                    </div>
                                </div>

                                {formData.tipoPropriedade === 'CLIENTE' && (
                                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                        <label className="block text-xs font-black text-gray-400 uppercase mb-2 flex items-center gap-2">
                                            <User size={12} className="text-amber-500" /> Selecione o Cliente / Órgão Público *
                                        </label>
                                        <select 
                                            required 
                                            name="clienteId" 
                                            value={formData.clienteId} 
                                            onChange={handleChange} 
                                            className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm font-medium"
                                        >
                                            <option value="">Clique para selecionar o proprietário...</option>
                                            {clientes.map(c => (
                                                <option key={c.id} value={c.id}>{c.nome} {c.cpfCnpj ? `(${c.cpfCnpj})` : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Ativo *</label>
                                    <input required name="nome" value={formData.nome} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ex: Notebook Dell Latitude 3420" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Número de Patrimônio / Tombo *</label>
                                    <input required name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" placeholder="Ex: ATI-001 ou Munic-123" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Número de Série</label>
                                    <input name="numeroSerie" value={formData.numeroSerie} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" placeholder="S/N: XXXXXXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                                    <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                        <option value="TI">TI (Hardware/Software)</option>
                                        <option value="Infraestrutura">Infraestrutura (Ar cond., Rede)</option>
                                        <option value="Móveis">Móveis & Utensílios</option>
                                        <option value="Veículos">Veículos</option>
                                        <option value="Ferramentas">Ferramentas de Trabalho</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status Inicial</label>
                                    <div className="flex gap-2">
                                        {['OPERACIONAL', 'MANUTENCAO', 'INATIVO'].map(status => (
                                            <button 
                                                key={status}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, status }))}
                                                className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all ${
                                                    formData.status === status 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-50" />

                        {/* Seção: Aquisição & Localização */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Box size={14} /> Detalhes de Aquisição & Localização
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" /> Data de Aquisição
                                    </label>
                                    <input type="date" name="dataAquisicao" value={formData.dataAquisicao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <DollarSign size={14} className="text-gray-400" /> Valor de Aquisição
                                    </label>
                                    <input type="number" step="0.01" name="valorAquisicao" value={formData.valorAquisicao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0,00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-400" /> Localização / Setor
                                    </label>
                                    <input name="localizacao" value={formData.localizacao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ex: Sala 02 - TI" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Descrição / Observações</label>
                                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Detalhes técnicos adicionais, fornecedor, garantia..." />
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Footer / Botões */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <Link href="/suporte/ati/ativos" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancelar</Link>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            Salvar Ativo
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
