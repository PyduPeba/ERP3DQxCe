"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Clock, Plus, Calendar, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

type Locacao = {
  id: number;
  equipamento: string;
  descricao?: string;
  cliente?: string;
  dataInicio: string;
  dataFim: string;
  valorMensal: number;
  valorTotal?: number;
  status: string;
  observacoes?: string;
};

export default function LocacaoPage() {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocacoes();
  }, []);

  const fetchLocacoes = async () => {
    try {
      const res = await fetch("/api/suporte/locacao");
      const data = await res.json();
      setLocacoes(data);
    } catch (error) {
      console.error("Erro ao buscar locações:", error);
    } finally {
      setLoading(false);
    }
  };

  const ativos = locacoes.filter(l => l.status === "ativo").length;
  const proximosVencimentos = locacoes.filter(l => {
    const diff = new Date(l.dataFim).getTime() - new Date().getTime();
    const dias = diff / (1000 * 60 * 60 * 24);
    return dias <= 7 && dias > 0 && l.status === "ativo";
  }).length;
  const atrasados = locacoes.filter(l => new Date(l.dataFim) < new Date() && l.status === "ativo").length;

  const getStatusColor = (status: string) => {
    const colors = {
      ativo: "bg-emerald-100 text-emerald-700",
      vencido: "bg-red-100 text-red-700",
      finalizado: "bg-gray-100 text-gray-700",
      cancelado: "bg-orange-100 text-orange-700",
    };
    return colors[status as keyof typeof colors] || colors.ativo;
  };

  const isVencendo = (dataFim: string) => {
    const diff = new Date(dataFim).getTime() - new Date().getTime();
    const dias = diff / (1000 * 60 * 60 * 24);
    return dias <= 7 && dias > 0;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Locação de Equipamentos</h1>
            <p className="text-gray-500">Gestão de contratos, disponibilidade e renovações</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Novo Contrato
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Ativos</p>
            <p className="text-2xl font-bold mt-1 text-emerald-600">{ativos}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Próximos Vencimentos</p>
            <p className="text-2xl font-bold mt-1 text-amber-600">{proximosVencimentos}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Atrasados</p>
            <p className="text-2xl font-bold mt-1 text-rose-600">{atrasados}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{locacoes.length}</p>
          </div>
        </div>

        {/* Locações List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Carregando locações...</p>
          </div>
        ) : locacoes.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Sem locações ativas</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              Gerencie aqui o aluguel de seus equipamentos 3D ou ferramentas industriais.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locacoes.map((locacao) => (
              <div key={locacao.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-bold text-gray-900">#{locacao.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(locacao.status)}`}>
                    {locacao.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{locacao.equipamento}</h3>
                <p className="text-sm text-gray-600 mb-4">{locacao.cliente || "Cliente não informado"}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(locacao.dataInicio).toLocaleDateString("pt-BR")} - {new Date(locacao.dataFim).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  {isVencendo(locacao.dataFim) && locacao.status === "ativo" && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Vence em breve</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Valor Mensal</span>
                  <span className="font-semibold text-purple-600">R$ {locacao.valorMensal.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
