"use client";

import { useState, useEffect } from "react";
import { Package, AlertTriangle } from "lucide-react";
import Link from "next/link";

type ItemEstoqueBaixo = {
  id: number;
  nome: string;
  quantidade: number;
  minimo: number;
};

export default function EstoqueWidget() {
  const [itens, setItens] = useState<ItemEstoqueBaixo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/suporte/estoque")
      .then(res => res.json())
      .then(data => {
        // Filtrar itens com estoque baixo
        const baixo = data.filter((i: ItemEstoqueBaixo) => i.quantidade <= i.minimo).slice(0, 5);
        setItens(baixo);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Alertas de Estoque</h3>
        </div>
        <p className="text-sm text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Alertas de Estoque</h3>
        </div>
        <Link href="/suporte/estoque" className="text-sm text-amber-600 hover:text-amber-700">
          Ver estoque
        </Link>
      </div>

      {itens.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Todos os itens OK</span>
        </div>
      ) : (
        <div className="space-y-3">
          {itens.map((item) => (
            <div key={item.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">{item.nome}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-600">{item.quantidade}</p>
                <p className="text-xs text-gray-500">mín: {item.minimo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
