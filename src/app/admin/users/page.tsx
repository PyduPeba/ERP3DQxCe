"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Shield, User, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "@/app/components/layout/DashboardLayout";

interface User {
  id: number;
  nome: string;
  usuario: string;
  perfil: string;
  status: boolean;
  email: string | null;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("TODOS");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      SUPERADMIN: "bg-purple-100 text-purple-700 border-purple-200",
      ADMIN: "bg-blue-100 text-blue-700 border-blue-200",
      TECNICO: "bg-orange-100 text-orange-700 border-orange-200",
      FINANCEIRO: "bg-green-100 text-green-700 border-green-200",
      ATENDENTE: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return styles[role] || "bg-gray-50 text-gray-600";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === "TODOS" || user.perfil === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Gestão de Usuários
            </h1>
            <p className="text-gray-500">Controle de acesso e perfis do sistema</p>
          </div>
          <Link
            href="/admin/users/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Usuário
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4 shadow-sm">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, usuário ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODOS">Todos os Perfis</option>
              <option value="SUPERADMIN">SuperAdmin</option>
              <option value="ADMIN">Administrador</option>
              <option value="TECNICO">Técnico</option>
              <option value="FINANCEIRO">Financeiro</option>
              <option value="ATENDENTE">Atendente</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Carregando usuários...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <User className="w-12 h-12 text-gray-300 mb-2" />
              <p>Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase font-semibold">
                  <tr>
                    <th className="p-4">Usuário / Nome</th>
                    <th className="p-4">Perfil</th>
                    <th className="p-4">Contato</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                            {user.nome.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.usuario}</div>
                            <div className="text-sm text-gray-500">{user.nome}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadge(user.perfil)}`}>
                          {user.perfil}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {user.email || "-"}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                            {user.status ? (
                                <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                    <CheckCircle size={12} /> Ativo
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full border border-red-100">
                                    <XCircle size={12} /> Inativo
                                </span>
                            )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Excluir"
                            onClick={() => {
                                if(confirm('Tem certeza que deseja excluir este usuário?')) {
                                    fetch(`/api/users/${user.id}`, { method: 'DELETE' })
                                        .then(() => fetchUsers());
                                }
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
