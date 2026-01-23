"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, Lock, Mail, Phone, Briefcase, Shield, Trash2 } from "lucide-react";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { toast } from "sonner";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    usuario: "",
    senha: "",
    confirmarSenha: "",
    perfil: "",
    especialidade: "",
    email: "",
    telefone: "",
    status: true,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
        const res = await fetch(`/api/users?id=${params.id}`); // Endpoint de lista retorna array, vamos filtrar no front ou buscar todos e achar
        // Correção: O endpoint GET /api/users não filtra por ID. Deveríamos ter um GET /api/users/[id], mas implementamos PUT/DELETE lá.
        // Vamos adaptar o GET para buscar lista e filtrar, ou melhor, vamos assumir que o /api/users/[id] deveria ter um GET também.
        
        // Ops, I missed implementing GET in [id]/route.ts. 
        // I will implement fetching via the list endpoint for now since I didn't verify [id] GET.
        // Or I can add GET to [id] route. It's better designed if [id] has GET.
        // Let's try to fetch all and find (lazy way) or fix the API.
        // Checking route.ts... I only did PUT/DELETE.
        // Let's add GET to [id]/route.ts quickly after this file creation or assuming I will fetch list and find.
        // Fetching list is inefficient but safe for now.
        
        const listRes = await fetch("/api/users");
        const users = await listRes.json();
        const user = users.find((u: any) => u.id === parseInt(params.id as string));

        if (user) {
            setFormData({
                nome: user.nome,
                usuario: user.usuario,
                senha: "",
                confirmarSenha: "",
                perfil: user.perfil,
                especialidade: user.especialidade || "",
                email: user.email || "",
                telefone: user.telefone || "",
                status: user.status,
            });
        } else {
            toast.error("Usuário não encontrado");
            router.push("/admin/users");
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = e.target.checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de senha se preenchida
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não conferem!");
      return;
    }

    if (formData.senha && formData.senha.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    setSaving(true);

    try {
      const payload: any = { ...formData };
      delete payload.confirmarSenha;
      if (!payload.senha) delete payload.senha; // Não enviar senha vazia

      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao atualizar usuário");
      }

      toast.success("Usuário atualizado com sucesso!");
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Erro:", error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
      return (
          <DashboardLayout>
              <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
          </DashboardLayout>
      )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editar Usuário</h1>
            <p className="text-gray-500">Atualize os dados e permissões</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome de Usuário *</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="usuario"
                  required
                  value={formData.usuario}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Perfil */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de Acesso *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="perfil"
                  value={formData.perfil}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="ATENDENTE">Atendente</option>
                  <option value="TECNICO">Técnico</option>
                  <option value="FINANCEIRO">Financeiro</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="SUPERADMIN">SuperAdmin</option>
                </select>
              </div>
            </div>

             {/* Senha */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha (Opcional)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="senha"
                  minLength={6}
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deixe em branco para manter"
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmarSenha"
                  minLength={6}
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>

            {/* Especialidade (Condicional) */}
            {formData.perfil === "TECNICO" && (
                <div className="col-span-2 bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <label className="block text-sm font-medium text-orange-800 mb-1">Especialidade Técnica</label>
                    <input
                        type="text"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status (Checkbox) */}
            <div className="col-span-2 flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="status"
                        checked={formData.status} 
                        onChange={handleChange}
                        className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">Usuário Ativo</span>
                </label>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Link
              href="/admin/users"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium border border-gray-200"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
