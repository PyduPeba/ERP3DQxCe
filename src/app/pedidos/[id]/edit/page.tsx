"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save, Trash2, ArrowLeft, History, User, FileText, Clock, AlertCircle, Edit2, ChevronRight, MoreVertical } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { updatePedido, deletePedido } from "../../../actions/pedidos";

interface Log {
  id: number;
  acao: string;
  detalhes: string;
  usuario: string;
  createdAt: string;
}

interface Pedido {
  id: number;
  cliente: string;
  descricao: string;
  status: string;
  prioridade: string;
  logs: Log[];
}

export default function EditPedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPedido = useCallback(() => {
    fetch(`/api/pedidos/${id}`)
      .then(res => res.json())
      .then(data => {
        setPedido(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchPedido();
  }, [fetchPedido]);

  async function onSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      cliente: formData.get("cliente") as string,
      descricao: formData.get("descricao") as string,
      status: formData.get("status") as string,
      prioridade: formData.get("prioridade") as string,
    };

    try {
      const result = await updatePedido(parseInt(id), data);
      if (result.success) {
        toast.success("Pedido atualizado!");
        fetchPedido(); // Refetch locally to update history logs
      } else {
        toast.error("Erro ao atualizar.");
      }
    } catch {
      toast.error("Erro inesperado.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;
    
    try {
      const result = await deletePedido(parseInt(id));
      if (result.success) {
        toast.success("Pedido excluído.");
        router.push("/pedidos");
      }
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  if (loading) return <DashboardLayout><div>Carregando...</div></DashboardLayout>;
  if (!pedido) return <DashboardLayout><div>Pedido não encontrado.</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={18} />
            Voltar
          </button>
          <button onClick={onDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-50 transition-all">
            <Trash2 size={18} />
            Excluir Pedido
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit2 size={24} className="text-blue-600" />
                  Editar Pedido #{id}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  pedido.status === 'pendente' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                  pedido.status === 'design' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  pedido.status === 'aprovacao' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  pedido.status === 'producao' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  pedido.status === 'finalizado' ? 'bg-green-50 text-green-700 border-green-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {pedido.status}
                </span>
              </h1>

              <form onSubmit={onSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Cliente</label>
                    <input name="cliente" defaultValue={pedido.cliente} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Prioridade</label>
                    <select 
                      name="prioridade" 
                      defaultValue={pedido.prioridade} 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 invisible" /> {/* Spacer */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Status</label>
                    <div className="relative">
                      <select 
                        name="status" 
                        defaultValue={pedido.status} 
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white appearance-none focus:ring-2 focus:ring-blue-500/20 outline-none"
                      >
                        <option value="pendente" className="bg-gray-50 text-gray-700">⚪ Pendente</option>
                        <option value="design" className="bg-blue-50 text-blue-700">🔵 Em Design</option>
                        <option value="aprovacao" className="bg-amber-50 text-amber-700">🟡 Aguardando Aprovação</option>
                        <option value="producao" className="bg-purple-50 text-purple-700">🟣 Em Produção</option>
                        <option value="finalizado" className="bg-green-50 text-green-700">🟢 Finalizado</option>
                        <option value="cancelado" className="bg-red-50 text-red-700">🔴 Cancelado</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Descrição</label>
                  <textarea name="descricao" rows={4} defaultValue={pedido.descricao} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none" />
                </div>

                <button disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                  {saving ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <History size={20} className="text-gray-400" />
                Histórico
              </h3>
              <div className="space-y-4">
                {pedido.logs.map((log) => (
                  <LogItem key={log.id} log={log} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function LogItem({ log }: { log: Log }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = log.detalhes.length > 50;

  return (
    <div className="relative pl-4 border-l-2 border-gray-200 pb-2">
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300" />
      <p className="text-xs font-bold text-gray-700 uppercase tracking-tight">{log.acao.replace('_', ' ')}</p>
      <div className="group relative">
        <p className={`text-xs text-gray-500 mb-1 leading-relaxed ${!expanded && isLong ? 'line-clamp-2' : ''}`}>
          {log.detalhes}
        </p>
        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] text-blue-600 font-bold hover:underline mb-1"
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-medium">{new Date(log.createdAt).toLocaleString('pt-BR')}</span>
        <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">{log.usuario}</span>
      </div>
    </div>
  );
}


