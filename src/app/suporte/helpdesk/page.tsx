"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Wrench, Plus, Search, Filter, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

type Chamado = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  cliente?: string;
  tecnico?: string;
  createdAt: string;
};

export default function HelpdeskPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchChamados();
  }, []);

  const fetchChamados = async () => {
    try {
      const res = await fetch("/api/suporte/chamados");
      const data = await res.json();
      setChamados(data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      baixa: "bg-gray-100 text-gray-700",
      media: "bg-blue-100 text-blue-700",
      alta: "bg-orange-100 text-orange-700",
      urgente: "bg-red-100 text-red-700",
    };
    return colors[prioridade as keyof typeof colors] || colors.media;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      aberto: "bg-blue-100 text-blue-700",
      em_andamento: "bg-yellow-100 text-yellow-700",
      resolvido: "bg-green-100 text-green-700",
      fechado: "bg-gray-100 text-gray-700",
    };
    return colors[status as keyof typeof colors] || colors.aberto;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suporte Técnico / Helpdesk</h1>
            <p className="text-gray-500">Abertura e gerenciamento de chamados (SLA)</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Novo Chamado
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar chamados..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Chamados List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Carregando chamados...</p>
          </div>
        ) : chamados.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Wrench className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Nenhum chamado aberto</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              Os chamados de suporte aparecerão aqui. Comece abrindo um novo chamado para um cliente.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Título</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Prioridade</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Técnico</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Criado</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((chamado) => (
                  <tr key={chamado.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <td className="p-4 text-sm font-medium text-gray-900">#{chamado.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{chamado.titulo}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{chamado.descricao}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{chamado.cliente || "-"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
                        {chamado.prioridade}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chamado.status)}`}>
                        {chamado.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{chamado.tecnico || "-"}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(chamado.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
