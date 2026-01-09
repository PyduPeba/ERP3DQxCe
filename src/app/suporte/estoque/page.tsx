"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Package, Plus, ArrowUpRight, ArrowDownLeft, AlertTriangle, Search } from "lucide-react";
import { useState, useEffect } from "react";

type ItemEstoque = {
  id: number;
  codigo?: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  quantidade: number;
  minimo: number;
  valorUnit?: number;
  fornecedor?: string;
  localizacao?: string;
};

export default function EstoquePage() {
  const [itens, setItens] = useState<ItemEstoque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    try {
      const res = await fetch("/api/suporte/estoque");
      const data = await res.json();
      setItens(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalItens = itens.length;
  const itensEstoqueBaixo = itens.filter(i => i.quantidade <= i.minimo).length;
  const valorTotal = itens.reduce((acc, i) => acc + (i.valorUnit || 0) * i.quantidade, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors text-sm shadow-sm">
              <Plus className="w-4 h-4" />
              Novo Item
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Total em Estoque</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{totalItens} items</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Estoque Mínimo atingido</p>
            <p className="text-2xl font-bold mt-1 text-amber-600">{itensEstoqueBaixo}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Valor Total</p>
            <p className="text-2xl font-bold mt-1 text-purple-600">R$ {valorTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, nome ou categoria..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Items List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Carregando itens...</p>
          </div>
        ) : itens.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Estoque vazio</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              Cadastre suas peças e equipamentos para começar o controle de movimentações.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Código</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Nome</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Categoria</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Quantidade</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Mínimo</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Valor Unit.</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Localização</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <td className="p-4 text-sm font-medium text-gray-900">{item.codigo || "-"}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{item.nome}</div>
                      {item.descricao && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.descricao}</div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-700">{item.categoria || "-"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${item.quantidade <= item.minimo ? "text-amber-600" : "text-gray-900"}`}>
                          {item.quantidade}
                        </span>
                        {item.quantidade <= item.minimo && (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{item.minimo}</td>
                    <td className="p-4 text-sm text-gray-700">
                      {item.valorUnit ? `R$ ${item.valorUnit.toFixed(2)}` : "-"}
                    </td>
                    <td className="p-4 text-sm text-gray-700">{item.localizacao || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
