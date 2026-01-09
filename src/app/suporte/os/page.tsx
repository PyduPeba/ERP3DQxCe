"use client";

import { ClipboardList, Plus } from "lucide-react";

export default function OSPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço (OS)</h1>
          <p className="text-gray-500">Controle de status, peças, mão de obra e assinaturas</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
          <Plus className="w-5 h-5" />
          Gerar OS
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Sem ordens de serviço</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          As ordens de serviço podem ser geradas automaticamente a partir de chamados ou criadas manualmente.
        </p>
      </div>
    </div>
  );
}
