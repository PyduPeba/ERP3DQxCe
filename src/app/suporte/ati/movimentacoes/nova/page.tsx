"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ArrowLeftRight, Save, ArrowLeft, Laptop, User, ClipboardCheck, Info, MapPin, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NovaMovimentacaoPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    
    const [ativos, setAtivos] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        ativoId: "",
        tipo: "ENTREGA", // ENTREGA ou DEVOLUCAO
        usuarioId: "",
        condicaoNoMomento: "",
        protocoloUrl: "",
    });

    useEffect(() => {
        const loadData = async () => {
             const [ativosRes, usersRes, meRes] = await Promise.all([
                 fetch("/api/suporte/ati/ativos"),
                 fetch("/api/users"),
                 fetch("/api/auth/me")
             ]);
             const ativosData = await ativosRes.json();
             const usersData = await usersRes.json();
             const meData = await meRes.json();

             setAtivos(Array.isArray(ativosData) ? ativosData : []);
             setUsuarios(Array.isArray(usersData) ? usersData : []);
             setCurrentUser(meData.user);
        }
        loadData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return toast.error("Usuário não autenticado.");

        setSaving(true);
        try {
            const res = await fetch("/api/suporte/ati/movimentacoes", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tecnicoId: currentUser.id
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar");

            toast.success("Movimentação registrada com sucesso!");
            router.push("/suporte/ati/movimentacoes");
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
                    <Link href="/suporte/ati/movimentacoes" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Novo Protocolo de Movimentação</h1>
                        <p className="text-gray-500">Registre a entrega ou devolução de ativos</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        {/* Tipo de Movimentação */}
                        <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl w-fit">
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, tipo: "ENTREGA" }))}
                                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                                    formData.tipo === 'ENTREGA' 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                ENTREGA (Saída)
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, tipo: "DEVOLUCAO" }))}
                                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                                    formData.tipo === 'DEVOLUCAO' 
                                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                DEVOLUÇÃO (Entrada)
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Ativo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Laptop size={14} className="text-indigo-500" /> Ativo a ser Movimentado *
                                </label>
                                <select 
                                    required 
                                    name="ativoId" 
                                    value={formData.ativoId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                >
                                    <option value="">Selecione o equipamento...</option>
                                    {ativos.map(a => (
                                        <option key={a.id} value={a.id}>{a.numeroPatrimonio} - {a.nome} ({a.localizacao || 'Sem local'})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Usuário Responsável */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <User size={14} className="text-indigo-500" /> Funcionário (Responsável pela Posse) *
                                </label>
                                <select 
                                    required 
                                    name="usuarioId" 
                                    value={formData.usuarioId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                >
                                    <option value="">Para quem entregar / Quem está devolvendo?</option>
                                    {usuarios.map(u => (
                                        <option key={u.id} value={u.id}>{u.nome} ({u.perfil})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Condição do Ativo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <ClipboardCheck size={14} className="text-emerald-500" /> Condição do Bem e Observações
                                </label>
                                <textarea 
                                    name="condicaoNoMomento" 
                                    value={formData.condicaoNoMomento} 
                                    onChange={handleChange} 
                                    rows={3} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm" 
                                    placeholder="Ex: Em perfeito estado, com carregador. Apresenta pequenos riscos na carcaça." 
                                />
                            </div>

                            {/* Upload do Protocolo Assinado */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-blue-500" /> Comprovante Assinado (Opcional)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="file" 
                                        id="protocolo"
                                        accept="image/*,application/pdf"
                                        className="hidden" 
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    setFormData(prev => ({ ...prev, protocoloUrl: reader.result as string }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label 
                                        htmlFor="protocolo"
                                        className="cursor-pointer px-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-2 text-sm text-gray-500 font-medium"
                                    >
                                        <Save size={18} className="rotate-180" />
                                        {formData.protocoloUrl ? "Arquivo Selecionado ✅" : "Selecionar Documento Escaneado"}
                                    </label>
                                    {formData.protocoloUrl && (
                                        <button 
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, protocoloUrl: "" }))}
                                            className="text-red-500 text-xs font-bold hover:underline"
                                        >
                                            Remover
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                             <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                             <div className="text-xs text-indigo-800 leading-relaxed">
                                 Ao confirmar, o sistema atualizará a **localização** do ativo automaticamente para o nome do funcionário (em caso de entrega) ou para o TI (em caso de devolução). 
                                 Um termo de responsabilidade poderá ser impresso na tela seguinte.
                             </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <Link href="/suporte/ati/movimentacoes" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancelar</Link>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            Registrar Movimentação
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
