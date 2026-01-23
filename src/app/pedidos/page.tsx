"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Package, User, Clock, ChevronRight, LayoutGrid, List } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import KanbanBoard from "./components/KanbanBoard";

interface Pedido {
  id: number;
  cliente: string;
  descricao: string;
  status: string;
  prioridade: string;
  createdAt: Date;
}

export default function PedidosPage() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // Note: Using useEffect as a quick way to keep this a Client Component with data
  // In a full implementation, we might split the fetching and the view logic
  useEffect(() => {
    fetch('/api/pedidos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setPedidos(data);
        } else {
            console.error("Pedidos API Error:", data);
            setPedidos([]); // Fallback to empty array
        }
        setLoading(false);
      })
      .catch(err => {
          console.error("Fetch error:", err);
          setLoading(false);
      });
  }, []);

  const PRIORITY_BADGE: Record<string, string> = {
    baixa: "bg-blue-50 text-blue-700 border-blue-100",
    media: "bg-gray-50 text-gray-700 border-gray-100",
    alta: "bg-orange-50 text-orange-700 border-orange-100",
    urgente: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pedidos</h2>
          <p className="text-gray-500">Fluxo de produção e logística</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List size={16} />
              Lista
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                view === "kanban" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutGrid size={16} />
              Kanban
            </button>
          </div>

          <Link
            href="/pedidos/novo"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={20} />
            Novo Pedido
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">Carregando pedidos...</div>
      ) : view === "list" ? (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prioridade</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Criado em</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-medium">
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                        <Package size={48} className="text-gray-200" />
                        <p>Nenhum pedido encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${PRIORITY_BADGE[p.prioridade]}`}>
                        {p.prioridade}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 font-bold">{p.cliente}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 capitalize">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/pedidos/${p.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-block"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <KanbanBoard initialPedidos={pedidos} />
      )}
    </DashboardLayout>
  );
}
