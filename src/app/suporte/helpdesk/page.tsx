"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { Wrench, Plus, Search, Filter, X, Save, AlertCircle, Eye, CheckCircle, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";

type Chamado = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  status: string;
  cliente: string;
  tipoAtendimento: string;
  categoria: string;
  equipamento?: string;
  numeroSerie?: string;
  patrimonio?: string;
  tecnico?: string;
  solucao?: string;
  fechadoEm?: string;
  createdAt: string;
};

type Cliente = {
    id: number;
    nome: string;
};

export default function HelpdeskPage() {
  const { user, canDo, loading: permLoading } = usePermissions();
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
      titulo: "",
      clienteId: "",
      tipoAtendimento: "remoto",
      categoria: "software",
      equipamento: "",
      numeroSerie: "",
      patrimonio: "",
      prioridade: "media",
      descricao: "",
      sla: ""
  });

  const [editData, setEditData] = useState({
      status: "",
      solucao: "",
      tecnico: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const [chamadosRes, clientesRes] = await Promise.all([
            fetch("/api/suporte/chamados"),
            fetch("/api/clientes")
        ]);
        const chamadosData = await chamadosRes.json();
        const clientesData = await clientesRes.json();
        if (Array.isArray(chamadosData)) setChamados(chamadosData);
        if (Array.isArray(clientesData)) setClientes(clientesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
          const selectedCliente = clientes.find(c => c.id.toString() === formData.clienteId);
          const payload = { ...formData, cliente: selectedCliente?.nome || "Cliente Não Identificado" };
          const res = await fetch("/api/suporte/chamados", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error("Erro");
          toast.success("Chamado aberto!");
          setShowCreateModal(false);
          setFormData({
            titulo: "", clienteId: "", tipoAtendimento: "remoto", categoria: "software",
            equipamento: "", numeroSerie: "", patrimonio: "", prioridade: "media", descricao: "", sla: ""
          });
          fetchData();
      } catch (error) {
          toast.error("Erro ao criar.");
      } finally {
          setSubmitting(false);
      }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedChamado) return;
      setSubmitting(true);
      try {
           const updateRes = await fetch(`/api/suporte/chamados`, { 
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: selectedChamado.id, ...editData })
           });
           if (!updateRes.ok) throw new Error("Erro");
           toast.success("Chamado atualizado!");
           setShowEditModal(false);
           fetchData();
      } catch (error) {
          toast.error("Erro ao atualizar.");
      } finally {
          setSubmitting(false);
      }
  }

  const openEditModal = (chamado: Chamado) => {
      setSelectedChamado(chamado);
      setEditData({
          status: chamado.status,
          solucao: chamado.solucao || "",
          tecnico: chamado.tecnico || ""
      });
      setShowEditModal(true);
  }

  return (
    <PermissionGuard module="GESTAO">
        <DashboardLayout>
      <div className="space-y-6 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suporte Técnico / Helpdesk</h1>
            <p className="text-gray-500">Abertura e gerenciamento de chamados (SLA)</p>
          </div>
          {canDo('GESTAO', 'canCreate') && (
            <button 
                onClick={() => setShowCreateModal(true)} 
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10"
            >
                <Plus className="w-5 h-5" /> Novo Chamado
            </button>
          )}
        </div>

        {loading ? <p>Carregando...</p> : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                <table className="w-full min-w-[800px] sm:min-w-0">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Título</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Prioridade</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {chamados.map((chamado) => (
                      <tr key={chamado.id} onClick={() => openEditModal(chamado)} className="hover:bg-gray-50/80 cursor-pointer transition-all group animate-in fade-in slide-in-from-left-2 duration-300">
                        <td className="p-4 font-black text-gray-400">#{chamado.id}</td>
                        <td className="p-4">
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase text-xs">
                                {chamado.titulo}
                            </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 font-medium">{chamado.cliente}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                chamado.prioridade === 'alta' ? 'bg-red-100 text-red-700' :
                                chamado.prioridade === 'media' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                                {chamado.prioridade}
                            </span>
                        </td>
                        <td className="p-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                {chamado.status}
                            </span>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Eye size={16} />
                                </button>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            {chamados.length === 0 && <div className="p-12 text-center text-gray-500">Nenhum chamado aberto.</div>}
          </div>
        )}

        {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="text-blue-600" /> Novo Chamado</h2>
                        <button onClick={() => setShowCreateModal(false)}><X size={24} /></button>
                    </div>
                    <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium mb-1">Título</label><input required className="w-full p-2 border rounded-lg" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} /></div>
                            <div><label className="block text-sm font-medium mb-1">Cliente</label><select required className="w-full p-2 border rounded-lg" value={formData.clienteId} onChange={e => setFormData({...formData, clienteId: e.target.value})}>{clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></div>
                         </div>
                         <div className="flex justify-end gap-3 pt-4"><button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Salvar</button></div>
                    </form>
                </div>
            </div>
        )}

        {showEditModal && selectedChamado && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="font-bold flex items-center gap-2"><Wrench size={20} /> Chamado #{selectedChamado.id}</h2>
                        <button onClick={() => setShowEditModal(false)}><X size={24} /></button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl text-sm">
                                <div className="font-bold mb-1 text-gray-500 uppercase text-[10px]">Descrição</div>
                                <p className="text-gray-900">{selectedChamado.descricao}</p>
                            </div>
                            <label className="block text-sm font-medium">Solução Técnica</label>
                            <textarea className="w-full p-3 border rounded-xl outline-none" rows={5} value={editData.solucao} onChange={e => setEditData({...editData, solucao: e.target.value})} disabled={selectedChamado.status === 'fechado'} />
                         </div>
                         <div className="space-y-4">
                            <label className="block text-sm font-medium">Status</label>
                            <select 
                                className="w-full p-2 border rounded-lg font-bold" 
                                value={editData.status} 
                                onChange={e => {
                                    const next = e.target.value;
                                    if (user?.perfil === 'TECNICO' && (next === 'aberto' || next === 'fechado')) {
                                        toast.error("Técnico não pode definir este status.");
                                        return;
                                    }
                                    setEditData({...editData, status: next});
                                }}
                                disabled={selectedChamado.status === 'fechado'}
                            >
                                <option value="aberto">Aberto</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="resolvido">Resolvido</option>
                                <option value="fechado">Fechado</option>
                            </select>
                            <button onClick={handleEditSubmit} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg">Salvar Alterações</button>
                         </div>
                    </div>
                </div>
            </div>
        )}
      </div>
        </DashboardLayout>
    </PermissionGuard>
  );
}
