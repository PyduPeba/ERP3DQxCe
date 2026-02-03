"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { Building2, Save, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ConfiguracaoPrestadorPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nomeEmpresa: "",
        cnpj: "",
        contato: ""
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch("/api/configuracoes/prestador");
            const data = await res.json();
            if (data) {
                setFormData({
                    nomeEmpresa: data.nomeEmpresa || "",
                    cnpj: data.cnpj || "",
                    contato: data.contato || ""
                });
            }
        } catch (error) {
            toast.error("Erro ao carregar configurações");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/configuracoes/prestador", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Configurações salvas com sucesso!");
            } else {
                const error = await res.json();
                toast.error(error.error || "Erro ao salvar configurações");
            }
        } catch (error) {
            toast.error("Erro na comunicação com o servidor");
        } finally {
            setSaving(false);
        }
    };

    return (
        <PermissionGuard module="CONFIG">
            <DashboardLayout>
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href="/configuracoes" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Configuração do Prestador</h1>
                            <p className="text-gray-500">Dados da empresa que aparecem nos relatórios mensais</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center">
                            <p className="text-gray-500">Carregando...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                            <div className="p-8 bg-blue-600">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Building2 size={24} /> Dados do Prestador de Serviços
                                </h2>
                                <p className="text-blue-100 text-sm">Estas informações aparecerão no rodapé dos relatórios mensais</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Nome da Empresa *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nomeEmpresa}
                                        onChange={e => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Ex: SUA EMPRESA DE TI LTDA"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        CNPJ *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cnpj}
                                        onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Ex: 00.000.000/0001-00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Contato *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contato}
                                        onChange={e => setFormData({ ...formData, contato: e.target.value })}
                                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Ex: Contato: suporte@empresa.com.br"
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                                <Link href="/configuracoes" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">
                                    Cancelar
                                </Link>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Save size={20} />
                                    )}
                                    Salvar Configurações
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </PermissionGuard>
    );
}
