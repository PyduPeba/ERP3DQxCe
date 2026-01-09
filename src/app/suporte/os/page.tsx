"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ClipboardList, Plus, Search, FileText } from "lucide-react";
import { useState, useEffect } from "react";

type OrdemServico = {
  id: number;
  numero: string;
  cliente?: string;
  descricao: string;
  status: string;
  valorMaoObra?: number;
  createdAt: string;
};

export default function OSPage() {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOS();
  }, []);

  const fetchOS = async () => {
    try {
      const res = await fetch("/api/suporte/os");
      const data = await res.json();
      setOrdensServico(data);
    } catch (error) {
      console.error("Erro ao buscar OS:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: "bg-gray-100 text-gray-700",
      em_andamento: "bg-blue-100 text-blue-700",
      concluido: "bg-green-100 text-green-700",
      cancelado: "bg-red-100 text-red-700",
    };
    return colors[status as keyof typeof colors] || colors.pendente;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço (OS)</h1>
            <p className="text-gray-500">Controle de status, peças, mão de obra e assinaturas</p>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Gerar OS
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número, cliente ou descrição..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* OS List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Carregando ordens de serviço...</p>
          </div>
        ) : ordensServico.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Sem ordens de serviço</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              As ordens de serviço podem ser geradas automaticamente a partir de chamados ou criadas manualmente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordensServico.map((os) => (
              <div key={os.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-gray-900">{os.numero}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(os.status)}`}>
                    {os.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{os.cliente || "Cliente não informado"}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{os.descricao}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(os.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                  {os.valorMaoObra && (
                    <span className="font-semibold text-emerald-600">
                      R$ {os.valorMaoObra.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
