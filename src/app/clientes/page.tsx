"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Users, Edit, Trash2, CheckCircle, XCircle, Building2, MapPin, Phone } from "lucide-react";
import DashboardLayout from "@/app/components/layout/DashboardLayout";

interface Cliente {
  id: number;
  tipo: string;
  nome: string;
  nomeFantasia?: string;
  cpfCnpj: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  cidade?: string;
  estado?: string;
  status: boolean;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClientes();
  }, [searchTerm]);

  const fetchClientes = async () => {
    try {
      // Debounce na busca seria ideal, mas para MVP vamos direto
      const query = searchTerm ? `?search=${searchTerm}` : "";
      const res = await fetch(`/api/clientes${query}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setClientes(data);
      } else {
        console.error("API Error:", data);
        setClientes([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
      if (confirm("Tem certeza que deseja excluir este cliente?")) {
          try {
              await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
              fetchClientes(); // Recarrega lista
          } catch (error) {
              console.error("Erro ao excluir:", error);
          }
      }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Gestão de Clientes
            </h1>
            <p className="text-gray-500">Base de clientes PF e PJ</p>
          </div>
          <Link
            href="/clientes/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Cliente
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por Nome, Razão Social, CPF ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Carregando clientes...</div>
          ) : clientes.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Users className="w-12 h-12 text-gray-300 mb-2" />
              <p>Nenhum cliente encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase font-semibold">
                  <tr>
                    <th className="p-4">Cliente / Razão Social</th>
                    <th className="p-4">Documento</th>
                    <th className="p-4">Contato</th>
                    <th className="p-4">Localização</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border ${cliente.tipo === 'PJ' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                             {cliente.tipo}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{cliente.nome}</div>
                            {cliente.nomeFantasia && (
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <Building2 size={10} /> {cliente.nomeFantasia}
                                </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-mono">
                        {cliente.cpfCnpj}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600 space-y-1">
                            {cliente.telefone && (
                                <div className="flex items-center gap-1">
                                    <Phone size={12} className="text-gray-400" /> 
                                    {cliente.telefone}
                                </div>
                            )}
                             {cliente.email && (
                                <div className="text-xs text-blue-500 truncate max-w-[150px]">
                                    {cliente.email}
                                </div>
                            )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {(cliente.cidade || cliente.estado) ? (
                            <div className="flex items-center gap-1">
                                <MapPin size={12} className="text-gray-400" />
                                {cliente.cidade}{cliente.cidade && cliente.estado ? ' - ' : ''}{cliente.estado}
                            </div>
                        ) : (
                            <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                         {cliente.status ? (
                             <span className="inline-flex items-center gap-1 text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-wide">
                                 Ativo
                             </span>
                         ) : (
                             <span className="inline-flex items-center gap-1 text-red-600 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wide">
                                 Inativo
                             </span>
                         )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/clientes/${cliente.id}/edit`}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(cliente.id)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Excluir"
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
