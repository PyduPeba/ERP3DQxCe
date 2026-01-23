"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ClipboardList, Save, ArrowLeft, Laptop, User, AlertCircle, Package, Plus, X, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NovaOSInternaPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    
    const [ativos, setAtivos] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    
    const [formData, setFormData] = useState({
        ativoId: "",
        solicitanteId: "",
        tecnicoId: "",
        descricaoProblema: "",
    });

    useEffect(() => {
        // Load data for selects
        const loadData = async () => {
             const [ativosRes, usersRes] = await Promise.all([
                 fetch("/api/suporte/ati/ativos"),
                 fetch("/api/users")
             ]);
             const ativosData = await ativosRes.json();
             const usersData = await usersRes.json();

             setAtivos(Array.isArray(ativosData) ? ativosData : []);
             setUsuarios(Array.isArray(usersData) ? usersData : []);
        }
        loadData();
    }, []);

    const safeUsers = Array.isArray(usuarios) ? usuarios : [];

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/suporte/ati/os", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar");

            toast.success("Ordem de Serviço aberta!");
            router.push("/suporte/ati/os");
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
                    <Link href="/suporte/ati/os" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Nova OS Interna (ATI)</h1>
                        <p className="text-gray-500">Abertura de serviço para manutenção de infraestrutura</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Seleção do Ativo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Laptop size={14} className="text-blue-500" /> Selecione o Ativo *
                                </label>
                                <select 
                                    required 
                                    name="ativoId" 
                                    value={formData.ativoId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Clique para selecionar um ativo...</option>
                                    {ativos.map(a => (
                                        <option key={a.id} value={a.id}>{a.numeroPatrimonio} - {a.nome} ({a.localizacao || 'Sem local'})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Solicitante */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <User size={14} className="text-blue-500" /> Solicitante (Funcionário) *
                                </label>
                                <select 
                                    required 
                                    name="solicitanteId" 
                                    value={formData.solicitanteId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Quem está com o problema?</option>
                                    {safeUsers.map(u => (
                                        <option key={u.id} value={u.id}>{u.nome} ({u.perfil})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Técnico (Opcional na abertura) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Wrench size={14} className="text-blue-500" /> Técnico Responsável
                                </label>
                                <select 
                                    name="tecnicoId" 
                                    value={formData.tecnicoId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Deixar em aberto...</option>
                                    {safeUsers.filter(u => u.perfil === 'TECNICO' || u.perfil === 'ADMIN' || u.perfil === 'SUPERADMIN').map(u => (
                                        <option key={u.id} value={u.id}>{u.nome}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Descrição do Problema */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <AlertCircle size={14} className="text-red-500" /> Descrição do Defeito / Solicitação *
                                </label>
                                <textarea 
                                    required 
                                    name="descricaoProblema" 
                                    value={formData.descricaoProblema} 
                                    onChange={handleChange} 
                                    rows={4} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                                    placeholder="Descreva detalhadamente o que houve..." 
                                />
                            </div>

                        </div>

                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                             <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                             <div className="text-xs text-amber-800 leading-relaxed">
                                 A numeração da OS será gerada automaticamente pelo sistema com o prefixo **ATI**. 
                                 Peças do estoque poderão ser adicionadas no momento do encerramento da manutenção através do laudo técnico.
                             </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <Link href="/suporte/ati/os" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancelar</Link>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ClipboardList size={20} />}
                            Abrir Ordem de Serviço
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
