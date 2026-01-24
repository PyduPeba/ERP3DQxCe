"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { usePermissions } from "@/hooks/usePermissions";
import { 
    Settings, Shield, Lock, Eye, Edit3, Trash2, Plus, 
    Save, RefreshCw, Check, X, ShieldAlert, Cpu, Wrench, BarChart,
    Users, Printer, Database, Upload, AlertTriangle, FileArchive, HelpCircle, Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ROLES = ["SUPERADMIN", "ADMIN", "ATENDENTE", "TECNICO", "FINANCEIRO"];
const MODULES = [
    { id: "PEDIDOS", label: "Pedidos", icon: Cpu },
    { id: "CLIENTES", label: "Clientes", icon: Users },
    { id: "PRODUCAO", label: "Produção", icon: Printer },
    { id: "ESTUDIO", label: "Estúdio 3D", icon: Cpu },
    { id: "GESTAO", label: "Gestão Profissional", icon: Wrench },
    { id: "LOCACAO", label: "Locação", icon: BarChart },
    { id: "CONFIG", label: "Configurações", icon: Settings },
];

export default function ConfigPage() {
    const { user } = usePermissions();
    const [activeTab, setActiveTab] = useState<'permissoes' | 'seguranca' | 'aparencia' | 'backup'>('permissoes');
    const [permissions, setPermissions] = useState<any[]>([]);
    const [systemConfig, setSystemConfig] = useState({
        sessionTimeout: 30,
        passwordRotationDays: 90,
        brandingText: "ERP 3D",
        brandingColor: "#f97316",
        logoUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPermissions();
        fetchSystemConfig();
    }, []);

    const fetchPermissions = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/config/permissions");
            const data = await res.json();
            setPermissions(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Erro ao carregar permissões");
        } finally {
            setLoading(false);
        }
    };

    const fetchSystemConfig = async () => {
        try {
            const res = await fetch("/api/config/system");
            const data = await res.json();
            if (data && !data.error) setSystemConfig(data);
        } catch (error) {
            console.error("Erro ao carregar config", error);
        }
    };

    const saveSystemConfig = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/config/system", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(systemConfig),
            });
            if (!res.ok) throw new Error();
            toast.success("Configuração salva com sucesso!");
        } catch (error: any) {
            const errorMsg = error?.message || "Erro ao salvar configuração";
            toast.error(errorMsg);
        } finally {
            setSaving(false);
        }
    };

    const getPermission = (role: string, module: string) => {
        return permissions.find(p => p.role === role && p.module === module) || {
            role, module, canView: false, canCreate: false, canEdit: false, canDelete: false
        };
    };

    const togglePermission = async (role: string, module: string, field: string) => {
        const current = getPermission(role, module);
        const updated = { ...current, [field]: !current[field] };

        // Optimistic update
        setPermissions(prev => {
            const index = prev.findIndex(p => p.role === role && p.module === module);
            if (index > -1) {
                const newArr = [...prev];
                newArr[index] = updated;
                return newArr;
            }
            return [...prev, updated];
        });

        try {
            const res = await fetch("/api/config/permissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            if (!res.ok) throw new Error();
            toast.success("Permissão atualizada", { duration: 1000 });
        } catch (error) {
            toast.error("Erro ao salvar permissão");
            fetchPermissions(); // Rollback
        }
    };

    return (
        <PermissionGuard module="CONFIG">
            <DashboardLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                                <Settings size={24} />
                            </div>
                            Configurações do Sistema
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium italic">Gerencie acessos, segurança e parâmetros globais.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
                    {[
                        { id: 'permissoes', label: 'Matriz de Permissões', icon: Shield },
                        { id: 'seguranca', label: 'Segurança e Auditoria', icon: Lock },
                        { id: 'aparencia', label: 'Aparência e Layout', icon: Eye },
                        { id: 'backup', label: 'Backup e Restauração', icon: Database },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white text-blue-600 shadow-md scale-[1.02]' 
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'permissoes' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Legend */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-wrap gap-8 items-center">
                            <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                <ShieldAlert size={14} className="text-blue-500" /> Legenda de Ações:
                            </div>
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Eye size={12} /></div>
                                <span className="text-xs font-bold text-gray-600">Visualizar</span>
                            </div>
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Plus size={12} /></div>
                                <span className="text-xs font-bold text-gray-600">Criar</span>
                            </div>
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><Edit3 size={12} /></div>
                                <span className="text-xs font-bold text-gray-600">Editar</span>
                            </div>
                            <div className="flex items-center gap-2 group cursor-help">
                                <div className="p-1.5 bg-red-50 text-red-600 rounded-lg"><Trash2 size={12} /></div>
                                <span className="text-xs font-bold text-gray-600">Excluir</span>
                            </div>
                        </div>

                        {/* Permission Matrix Grid */}
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="text-left p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 min-w-[200px]">Módulos \ Perfis</th>
                                            {ROLES.map(role => (
                                                <th key={role} className="p-8 text-center border-b border-gray-100">
                                                    <div className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black text-gray-600 tracking-tighter inline-block">
                                                        {role}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {MODULES.map(module => (
                                            <tr key={module.id} className="hover:bg-gray-50/30 transition-colors group">
                                                <td className="p-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300">
                                                            <module.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-gray-900 leading-tight">{module.label}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{module.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {ROLES.map(role => {
                                                    const perm = getPermission(role, module.id);
                                                    const isSuper = role === 'SUPERADMIN';
                                                    
                                                    return (
                                                        <td key={role} className="p-4 text-center">
                                                            <div className="flex justify-center gap-2">
                                                                {[
                                                                    { key: 'canView', icon: Eye, color: 'blue' },
                                                                    { key: 'canCreate', icon: Plus, color: 'emerald' },
                                                                    { key: 'canEdit', icon: Edit3, color: 'amber' },
                                                                    { key: 'canDelete', icon: Trash2, color: 'red' },
                                                                ].map(action => (
                                                                    <button
                                                                        key={action.key}
                                                                        disabled={isSuper}
                                                                        onClick={() => togglePermission(role, module.id, action.key)}
                                                                        className={`p-2.5 rounded-xl transition-all duration-300 ${
                                                                            isSuper || (perm as any)[action.key]
                                                                            ? `bg-${action.color}-500 text-white shadow-lg shadow-${action.color}-200 scale-110` 
                                                                            : 'bg-gray-50 text-gray-300 grayscale hover:grayscale-0 hover:bg-gray-100'
                                                                        } ${isSuper ? 'cursor-not-allowed opacity-90' : 'hover:-translate-y-1 active:scale-95'}`}
                                                                        title={`${action.key} para ${role} em ${module.id}`}
                                                                    >
                                                                        <action.icon size={14} />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Special Logic Rules Info */}
                        <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-200 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12">
                                <Shield size={160} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/20">
                                    <ShieldAlert size={48} />
                                </div>
                                <div className="space-y-2 max-w-2xl">
                                    <h3 className="text-xl font-black">Regras de Negócio e Segurança</h3>
                                    <p className="text-blue-100 font-medium leading-relaxed">
                                        Perfis com acesso restrito (como Técnicos) possuem travas de status automáticas. Mesmo com permissão de editar, o sistema impedirá o cancelamento de OS ou a visualização de faturamento se não estiver explicitamente habilitado na matriz acima.
                                    </p>
                                    <div className="flex gap-4 pt-4">
                                        <div className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Audit Log Ativo</div>
                                        <div className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">TLS 1.3 Encryption</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'seguranca' && (
                    <div className="space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-6">
                                <div className="flex items-center gap-4 text-blue-600">
                                    <div className="p-3 bg-blue-50 rounded-2xl">
                                        <Lock size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900">Políticas de Acesso</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Tempo de Sessão (minutos)</label>
                                        <input 
                                            type="number" 
                                            value={systemConfig.sessionTimeout}
                                            onChange={e => setSystemConfig({...systemConfig, sessionTimeout: Number(e.target.value)})}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                                        />
                                        <p className="text-xs text-gray-400 mt-2 italic font-medium">Define quanto tempo o usuário pode ficar inativo antes de ser deslogado.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Rotatividade de Senha (dias)</label>
                                        <input 
                                            type="number" 
                                            value={systemConfig.passwordRotationDays}
                                            onChange={e => setSystemConfig({...systemConfig, passwordRotationDays: Number(e.target.value)})}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                                        />
                                        <p className="text-xs text-gray-400 mt-2 italic font-medium">Obriga a troca de senha após o período determinado.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-6 bg-blue-50 rounded-full text-blue-600 mb-2">
                                    <Shield size={48} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900">Protocolo de Auditoria</h3>
                                <p className="text-gray-500 font-medium max-w-xs leading-relaxed">
                                    Todas as alterações nestes parâmetros são registradas no log de auditoria do sistema com IP e usuário responsável.
                                </p>
                                <button 
                                    onClick={saveSystemConfig}
                                    disabled={saving}
                                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                                >
                                    {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                                    Salvar Configurações
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'aparencia' && (
                    <div className="space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-6">
                                <div className="flex items-center gap-4 text-emerald-600">
                                    <div className="p-3 bg-emerald-50 rounded-2xl">
                                        <Eye size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900">Personalização</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Nome do Sistema (Branding)</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex: ERP 3D"
                                            value={systemConfig.brandingText}
                                            onChange={e => setSystemConfig({...systemConfig, brandingText: e.target.value.toUpperCase()})}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-black tracking-tight"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Cor Primária</label>
                                        <div className="flex gap-4 items-center">
                                            <input 
                                                type="color" 
                                                value={systemConfig.brandingColor}
                                                onChange={e => setSystemConfig({...systemConfig, brandingColor: e.target.value})}
                                                className="w-16 h-16 rounded-2xl border-none cursor-pointer p-0 bg-transparent"
                                            />
                                            <input 
                                                type="text" 
                                                value={systemConfig.brandingColor}
                                                onChange={e => setSystemConfig({...systemConfig, brandingColor: e.target.value})}
                                                className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900 p-8 rounded-[32px] shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                    <div className="w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[4px] mb-4">Preview do Layout</h3>
                                
                                <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-[24px] border border-white/5 backdrop-blur-md shadow-2xl">
                                    <div className="p-3 rounded-2xl shadow-lg" style={{ backgroundColor: systemConfig.brandingColor }}>
                                        <Cpu className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-2xl font-black tracking-tight text-white uppercase italic">{systemConfig.brandingText}</span>
                                </div>

                                <button 
                                    onClick={saveSystemConfig}
                                    disabled={saving}
                                    className="mt-4 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-900/40 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                                >
                                    {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                                    Aplicar Alterações
                                </button>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">As mudanças serão aplicadas globalmente.</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'backup' && (
                    <div className="space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* GERAR BACKUP */}
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl space-y-6">
                                <div className="flex items-center gap-4 text-blue-600">
                                    <div className="p-3 bg-blue-50 rounded-2xl">
                                        <Database size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900">Gerar Cópia de Segurança</h3>
                                </div>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    Crie um arquivo comprimido contendo todos os dados do banco de dados e todas as fotos anexadas ao sistema. Recomendamos fazer isso diariamente.
                                </p>
                                <div className="pt-4">
                                    <button 
                                        onClick={() => {
                                            const toastId = toast.loading("Gerando backup completo... Isso pode levar alguns segundos.");
                                            window.location.href = "/api/config/backup/generate";
                                            setTimeout(() => toast.dismiss(toastId), 5000);
                                        }}
                                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                                    >
                                        <Download size={18} /> Baixar Backup Completo (.ZIP)
                                    </button>
                                </div>
                            </div>

                            {/* RESTAURAR BACKUP */}
                            <div className="bg-white p-8 rounded-[32px] border border-red-100 shadow-xl space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <AlertTriangle size={120} className="text-red-600" />
                                </div>
                                <div className="flex items-center gap-4 text-red-600">
                                    <div className="p-3 bg-red-50 rounded-2xl">
                                        <Upload size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900">Restaurar do Arquivo</h3>
                                </div>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    Recupere o sistema a partir de um arquivo de backup. 
                                    <span className="block mt-1 font-bold text-red-500">Atenção: Todos os dados atuais serão APAGADOS e substituídos.</span>
                                </p>
                                <div className="pt-4">
                                    <label className="w-full py-4 bg-red-50 text-red-600 border-2 border-dashed border-red-200 rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer hover:bg-red-100 transition-all flex items-center justify-center gap-3">
                                        <FileArchive size={18} /> Selecionar Arquivo .ZIP
                                        <input 
                                            type="file" 
                                            accept=".zip" 
                                            className="hidden" 
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                if (!confirm("TEM CERTEZA? Esta ação apagará todo o banco de dados atual e restaurará os dados do arquivo selecionado.")) {
                                                    e.target.value = "";
                                                    return;
                                                }

                                                const toastId = toast.loading("Restaurando sistema... Por favor, não feche esta janela.");
                                                const formData = new FormData();
                                                formData.append("file", file);

                                                try {
                                                    const res = await fetch("/api/config/backup/restore", {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    const data = await res.json();
                                                    if (!res.ok) throw new Error(data.error || "Erro na restauração");
                                                    
                                                    toast.success("Sistema restaurado com sucesso!", { id: toastId });
                                                    setTimeout(() => window.location.reload(), 2000);
                                                } catch (err: any) {
                                                    toast.error(err.message, { id: toastId });
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* TUTORIAL / INFORMAÇÕES */}
                        <div className="bg-gray-900 rounded-[32px] p-8 text-white shadow-2xl overflow-hidden relative">
                             <div className="absolute top-0 right-0 p-12 opacity-10">
                                <HelpCircle size={140} />
                            </div>
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="text-2xl font-black flex items-center gap-3">
                                        <HelpCircle className="text-blue-400" /> Como funciona o Backup?
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-2">
                                            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">Base de Dados</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">O sistema extrai todas as tabelas (clientes, pedidos, configurações, etc.) em um arquivo JSON universal de alta portabilidade.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">Fotos e Anexos</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">Todas as fotos da pasta de uploads e os anexos em Base64 são automaticamente incluídos e compactados no arquivo ZIP.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">Integridade</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">O processo de restauração garante que as relações entre os dados sejam mantidas, evitando erros de vínculos.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-blue-400 font-black text-xs uppercase tracking-widest">Formato ZIP</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">Usamos compressão padrão ZIP para que você possa verificar o conteúdo do backup em qualquer computador sem ferramentas especiais.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col justify-center gap-4">
                                    <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/20">
                                        <ShieldAlert className="text-amber-500 mb-2" />
                                        <h4 className="font-bold text-sm text-amber-500 uppercase tracking-tight">Dica de Segurança</h4>
                                        <p className="text-amber-200/70 text-xs mt-1 leading-relaxed">Sempre baixe um backup antes de realizar alterações estruturais ou restaurar um arquivo antigo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RESET DO SISTEMA (Apenas SUPERADMIN) */}
                        {user?.perfil === 'SUPERADMIN' && (
                            <div className="bg-white p-8 rounded-[32px] border border-red-200 shadow-xl space-y-6 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-red-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-4 text-red-600">
                                    <div className="p-3 bg-red-50 rounded-2xl">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Zona de Risco: Reset Total</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        Esta ação irá <span className="text-red-600 font-bold">APAGAR DEFINITIVAMENTE</span> todos os dados do sistema: pedidos, clientes, financeiro, estoque e fotos. Sua conta de usuário atual será a única preservada para garantir seu acesso.
                                    </p>
                                    
                                    <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                                        <input 
                                            type="checkbox" 
                                            id="confirm-reset"
                                            className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" 
                                        />
                                        <span className="text-sm font-bold text-gray-700">Compreendo que todos os dados (exceto meu usuário) serão permanentemente excluídos e que esta ação não pode ser desfeita.</span>
                                    </label>

                                    <button 
                                        onClick={async () => {
                                            const checkbox = document.getElementById('confirm-reset') as HTMLInputElement;
                                            if (!checkbox?.checked) {
                                                toast.error("Você precisa marcar a caixa de confirmação primeiro.");
                                                return;
                                            }

                                            if (!confirm("ÚLTIMO AVISO: Deseja realmente resetar TODO o sistema?")) return;

                                            const toastId = toast.loading("Limpando sistema... Aguarde.");
                                            try {
                                                const res = await fetch("/api/config/system/reset", { method: "POST" });
                                                const data = await res.json();
                                                if (!res.ok) throw new Error(data.error || "Erro ao resetar");

                                                toast.success("Sistema resetado com sucesso!", { id: toastId });
                                                setTimeout(() => window.location.reload(), 2000);
                                            } catch (err: any) {
                                                toast.error(err.message, { id: toastId });
                                            }
                                        }}
                                        className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-200 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Trash2 size={18} /> EXECUTAR RESET AGORA
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
            </PermissionGuard>
    );
}


