"use client";

import { Wrench, Plus, Search, Filter } from "lucide-react";

export default function HelpdeskPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suporte Técnico / Helpdesk</h1>
          <p className="text-gray-500">Abertura e gerenciamento de chamados (SLA)</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Novo Chamado
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Wrench className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Nenhum chamado aberto</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          Os chamados de suporte aparecerão aqui. Comece abrindo um novo chamado para um cliente.
        </p>
      </div>
    </div>
  );
}
