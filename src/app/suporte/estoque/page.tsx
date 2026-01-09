"use client";

import { Package, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function EstoquePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-500">Gestão de peças, produtos, entradas e saídas</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm">
            <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
            Entrada
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm">
            <ArrowUpRight className="w-4 h-4 text-rose-500" />
            Saída
          </button>
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Novo Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total em Estoque", value: "0 items", color: "text-blue-600" },
          { label: "Estoque Mínimo atingido", value: "0", color: "text-amber-600" },
          { label: "Movimentações (Mês)", value: "0", color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Estoque vazio</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          Cadastre suas peças e equipamentos para começar o controle de movimentações.
        </p>
      </div>
    </div>
  );
}
