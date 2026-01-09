"use client";

import { Clock, Plus, Calendar } from "lucide-react";

export default function LocacaoPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locação de Equipamentos</h1>
          <p className="text-gray-500">Gestão de contratos, disponibilidade e renovações</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
          <Plus className="w-5 h-5" />
          Novo Contrato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ativos", value: "0", color: "text-emerald-600" },
          { label: "Próximos Vencimentos", value: "0", color: "text-amber-600" },
          { label: "Atrasados", value: "0", color: "text-rose-600" },
          { label: "Disponíveis", value: "0", color: "text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Sem locações ativas</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          Gerencie aqui o aluguel de seus equipamentos 3D ou ferramentas industriais.
        </p>
      </div>
    </div>
  );
}
