"use client";

import { Wrench, ClipboardList, Package, Clock, BarChart3, Users, Factory } from "lucide-react";

export default function SuporteDashboard() {
  const modules = [
    { name: "Helpdesk", desc: "Suporte Técnico e Chamados", icon: Wrench, color: "bg-blue-500" },
    { name: "Ordens de Serviço", desc: "Gestão de OS e Peças", icon: ClipboardList, color: "bg-emerald-500" },
    { name: "Controle de Estoque", desc: "Entradas, Saídas e Inventário", icon: Package, color: "bg-amber-500" },
    { name: "Locação", desc: "Contratos e Equipamentos", icon: Clock, color: "bg-purple-500" },
    { name: "Relatórios", desc: "Dashboards e Métricas", icon: BarChart3, color: "bg-gray-500" },
    { name: "Clientes & Fornecedores", desc: "Cadastro Geral", icon: Users, color: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ERP Profissional</h1>
        <p className="text-gray-500 mt-2">Suporte Técnico, Gestão e Controle de Estoque</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <div key={m.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
              <m.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{m.name}</h3>
            <p className="text-gray-500 mt-2">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
