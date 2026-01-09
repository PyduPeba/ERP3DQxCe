"use client";

import { BarChart3, TrendingUp, Users, Wrench, Package } from "lucide-react";

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Dashboards</h1>
        <p className="text-gray-500">Métricas de SLA, estoque, chamados e faturamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-64 flex flex-col items-center justify-center text-gray-400">
           <BarChart3 className="w-12 h-12 mb-4 opacity-20" />
           <p>Gráfico de Chamados por Período</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-64 flex flex-col items-center justify-center text-gray-400">
           <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
           <p>Faturamento Recorrente (Locação)</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Resumo Geral</h3>
        <div className="space-y-4">
           {[
             { label: "SLA Médio", value: "0h", icon: Clock },
             { label: "Satisfação do Cliente", value: "N/A", icon: Users },
             { label: "Gasto com Peças", value: "R$ 0,00", icon: Package },
           ].map((item) => (
             <div key={item.label} className="flex items-center justify-between border-b pb-2 last:border-0">
               <div className="flex items-center gap-2">
                 <item.icon className="w-4 h-4 text-gray-400" />
                 <span className="text-gray-600">{item.label}</span>
               </div>
               <span className="font-semibold">{item.value}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
