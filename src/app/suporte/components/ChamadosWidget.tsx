"use client";

import { useState, useEffect } from "react";
import { Wrench, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

type ChamadoRecente = {
  id: number;
  titulo: string;
  status: string;
  prioridade: string;
  createdAt: string;
};

export default function ChamadosWidget() {
  const [chamados, setChamados] = useState<ChamadoRecente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/suporte/chamados")
      .then(res => res.json())
      .then(data => {
        // Pegar apenas os 5 mais recentes
        setChamados(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Chamados Recentes</h3>
        </div>
        <p className="text-sm text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Chamados Recentes</h3>
        </div>
        <Link href="/suporte/helpdesk" className="text-sm text-blue-600 hover:text-blue-700">
          Ver todos
        </Link>
      </div>

      {chamados.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum chamado aberto</p>
      ) : (
        <div className="space-y-3">
          {chamados.map((chamado) => (
            <div key={chamado.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                chamado.prioridade === 'urgente' ? 'bg-red-500' :
                chamado.prioridade === 'alta' ? 'bg-orange-500' :
                chamado.prioridade === 'media' ? 'bg-blue-500' : 'bg-gray-400'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{chamado.titulo}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    chamado.status === 'aberto' ? 'bg-blue-100 text-blue-700' :
                    chamado.status === 'em_andamento' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {chamado.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(chamado.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
