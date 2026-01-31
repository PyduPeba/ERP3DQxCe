"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { ClipboardList, Plus, Search, FileText, CheckCircle, Clock, User, Calendar, X, Save, UserPlus, Box, History, FileCheck, Info, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect, Suspense, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { compressImage } from "@/lib/imageCompression";

type OrdemServico = {
  id: number;
  numero: string;
  cliente?: string;
  descricao: string;
  status: string;
  valorMaoObra?: number | null;
  tecnicoResponsavel?: string;
  chamadoId?: number | null;
  dataInicio?: string;
  dataFim?: string;
  dataEncerramento?: string | null;
  laudoTecnico?: string | null;
  departamentoId?: number | null;
  departamento?: { id: number; nome: string; clienteId: number; } | null;
  itens?: ItemOS[];
};

type ItemOS = {
  id?: number;
  itemId: number;
  item: { nome: string; codigo?: string; unidade: string };
  quantidade: number;
  valorUnitario: number;
};

interface Departamento { id: number; nome: string; clienteId: number; };
type Chamado = { id: number; titulo: string; cliente?: string; departamentoId?: number | null; };
type UserData = { id: number; nome: string; perfil: string; };
type ClienteData = { id: number; nome: string; telefone?: string; };

function OSContent() {
  const { user, canDo, loading: permLoading } = usePermissions();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("geral");
  
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [tecnicos, setTecnicos] = useState<UserData[]>([]);
  const [clientes, setClientes] = useState<ClienteData[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showQuickClientModal, setShowQuickClientModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [clientSearch, setClientSearch] = useState("");
  const [filteredClientes, setFilteredClientes] = useState<ClienteData[]>([]);
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const [formData, setFormData] = useState({
      chamadoId: "",
      cliente: "",
      descricao: "",
      tecnicoResponsavel: "",
      status: "pendente",
      dataInicio: "",
      dataFim: "",
      laudoTecnico: "",
      valorMaoObra: "",
      departamentoId: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [anexos, setAnexos] = useState<any[]>([]);
  const [itensEstoque, setItensEstoque] = useState<any[]>([]);
  const [selectedPecas, setSelectedPecas] = useState<ItemOS[]>([]);
  const [pecaSearch, setPecaSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const [quickClientData, setQuickClientData] = useState({ nome: "", telefone: "" });

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (!loading && chamados.length > 0) {
        const action = searchParams.get("action");
        const chamadoId = searchParams.get("chamadoId");
        
        if (action === "new" && !showModal) {
            setShowModal(true);
            if (chamadoId) {
                handleChamadoChange(chamadoId);
            }
        }
    }
  }, [loading, chamados, searchParams]);

  useEffect(() => {
    if (clientSearch.trim() === "") {
        setFilteredClientes([]);
        return;
    }
    const filtered = clientes.filter(c => c.nome?.toLowerCase().includes((clientSearch || "").toLowerCase()));
    setFilteredClientes(filtered);
  }, [clientSearch, clientes]);

  const fetchData = async () => {
    try {
        const [osRes, chamadosRes, usersRes, clientesRes, estoqueRes] = await Promise.all([
            fetch("/api/suporte/os"),
            fetch("/api/suporte/chamados"),
            fetch("/api/users"),
            fetch("/api/clientes"),
            fetch("/api/suporte/estoque")
        ]);

        const osData = await osRes.json();
        const chamadosData = await chamadosRes.json();
        const usersData = await usersRes.json();
        const clientesData = await clientesRes.json();
        const estoqueData = await estoqueRes.json();

        if (Array.isArray(osData)) {
            setOrdensServico(osData.map((os: any) => ({ ...os, chamadoId: os.chamadoId || null })));
        }
        if (Array.isArray(chamadosData)) setChamados(chamadosData);
        if (Array.isArray(clientesData)) setClientes(clientesData);
        if (Array.isArray(usersData)) {
             setTecnicos(usersData.filter((u: any) => u.perfil === 'TECNICO' || u.perfil === 'SUPERADMIN' || u.perfil === 'ADMIN'));
        }
        if (Array.isArray(estoqueData)) setItensEstoque(estoqueData);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleChamadoChange = (chamadoId: string) => {
      const chamado = chamados.find(c => c.id.toString() === chamadoId);
      if (chamado) {
          setFormData(prev => ({
            ...prev,
            chamadoId,
            cliente: chamado.cliente || prev.cliente,
            descricao: `Ref. Chamado #${chamado.id}: ${chamado.titulo}`,
            departamentoId: chamado.departamentoId ? chamado.departamentoId.toString() : ""
          }));
          setClientSearch(chamado.cliente || "");
          if (chamado.cliente) {
               const clientObj = clientes.find(c => c.nome === chamado.cliente);
               if (clientObj) fetchDepartamentos(clientObj.id);
          }
      } else {
          setFormData(prev => ({ ...prev, chamadoId: "" }));
      }
  }

  const handleSelectClient = (client: ClienteData) => {
      setFormData(prev => ({ ...prev, cliente: client.nome, departamentoId: "" }));
      setClientSearch(client.nome);
      setShowClientSuggestions(false);
      fetchDepartamentos(client.id);
  }

  const fetchLogs = async (osId: number) => {
      try {
          const res = await fetch(`/api/suporte/os/${osId}/logs`);
          if (res.ok) setLogs(await res.json());
      } catch (e) { console.error(e); }
  }

  const handleEdit = (os: OrdemServico) => {
      setEditingId(os.id);
      setFormData({
          chamadoId: os.chamadoId ? os.chamadoId.toString() : "",
          cliente: os.cliente || "",
          descricao: os.descricao || "",
          tecnicoResponsavel: os.tecnicoResponsavel || "",
          status: os.status || "pendente",
          dataInicio: os.dataInicio ? new Date(os.dataInicio).toISOString().split('T')[0] : "",
          dataFim: os.dataFim ? new Date(os.dataFim).toISOString().split('T')[0] : "",
          laudoTecnico: os.laudoTecnico || "",
          valorMaoObra: os.valorMaoObra ? os.valorMaoObra.toString() : "",
          departamentoId: os.departamentoId ? os.departamentoId.toString() : ""
      });
      setSelectedPecas(os.itens || []);
      setClientSearch(os.cliente || "");
      setShowModal(true);
      if (os.departamentoId && os.departamento?.clienteId) {
          fetchDepartamentos(os.departamento.clienteId);
      } else {
          // Fallback to finding client by name if ID isn't directly in the relation
          const clientName = os.cliente || "";
          const clientObj = clientes.find(c => c.nome === clientName);
          if (clientObj) fetchDepartamentos(clientObj.id);
      }
      fetchAnexos(os.id);
      fetchLogs(os.id);
  }
  
  const fetchAnexos = async (osId: number) => {
      try {
          const res = await fetch(`/api/suporte/os/${osId}/anexos`);
          if (res.ok) setAnexos(await res.json());
      } catch (e) { console.error(e); }
  }

  const fetchDepartamentos = async (clienteId: number) => {
      try {
          const res = await fetch(`/api/clientes/${clienteId}/departamentos`);
          if (res.ok) setDepartamentos(await res.json());
          else setDepartamentos([]);
      } catch (e) { setDepartamentos([]); }
  }

    const handleQuickClientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    ...quickClientData, 
                    tipo: "PF", // Default to PF for quick registration
                    status: true 
                })
            });

            if (!res.ok) throw new Error("Erro ao cadastrar cliente");
            
            const newClient = await res.json();
            setClientes(prev => [newClient, ...prev]);
            handleSelectClient(newClient);
            setShowQuickClientModal(false);
            setQuickClientData({ nome: "", telefone: "" });
            toast.success("Cliente cadastrado com sucesso!");
        } catch (error) {
            toast.error("Erro ao cadastrar cliente. Verifique se os dados estão corretos.");
        } finally {
            setSubmitting(false);
        }
    }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files[0] || !editingId) return;
      
      const rawFile = e.target.files[0];
      const loadingToast = toast.loading("Otimizando foto...");
      const file = await compressImage(rawFile);
      toast.dismiss(loadingToast);

      const extension = file.name.split('.').pop() || 'png';
      
      // Fallback for crypto.randomUUID (not available in non-HTTPS mobile environments)
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 10);
      const uniqueName = `os_${editingId}_${timestamp}_${randomStr}.${extension}`;

      const reader = new FileReader();
      reader.onloadend = async () => {
          const base64 = reader.result as string;
          try {
              const res = await fetch(`/api/suporte/os/${editingId}/anexos`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ nome: uniqueName, url: base64, tipo: file.type })
              });
              if(res.ok) {
                  const newAnexo = await res.json();
                  setAnexos(prev => [newAnexo, ...prev]);
                  toast.success("Foto anexada!");
              }
          } catch (error) { toast.error("Erro ao enviar foto"); }
      }
      reader.readAsDataURL(file);
  }

  const handleAddPeca = () => {
      const item = itensEstoque.find(i => i.nome === pecaSearch || i.codigo === pecaSearch);
      if (!item) {
          toast.error("Produto não encontrado no estoque.");
          return;
      }
      if (selectedPecas.find(p => p.itemId === item.id)) {
          toast.error("Item já adicionado à lista.");
          return;
      }
      const newItem: ItemOS = {
          itemId: item.id,
          item: { nome: item.nome, codigo: item.codigo, unidade: item.unidade },
          quantidade: 1,
          valorUnitario: item.valorVenda || 0
      };
      setSelectedPecas([...selectedPecas, newItem]);
      setPecaSearch("");
      toast.success("Peça adicionada!");
  }

  const handleRemovePeca = (index: number) => {
      const newPecas = [...selectedPecas];
      newPecas.splice(index, 1);
      setSelectedPecas(newPecas);
  }

  const handleUpdatePeca = (index: number, field: keyof ItemOS, value: any) => {
      const newPecas = [...selectedPecas];
      newPecas[index] = { ...newPecas[index], [field]: Number(value) };
      setSelectedPecas(newPecas);
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      const finalClientName = formData.cliente || clientSearch;
      const payload = { 
          ...formData, 
          cliente: finalClientName, 
          clienteId: clientes.find(c => c.nome === finalClientName)?.id,
          itens: selectedPecas 
      }; 
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? JSON.stringify({ id: editingId, ...payload }) : JSON.stringify(payload);

      try {
           const res = await fetch("/api/suporte/os", {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: body
          });
          if (!res.ok) throw new Error("Erro OS");
          const updatedOS = await res.json();
          toast.success(editingId ? "OS Atualizada!" : "Ordem de Serviço gerada!");
          if (editingId) setOrdensServico(prev => prev.map(o => o.id === editingId ? updatedOS : o));
          else setOrdensServico(prev => [updatedOS, ...prev]);
          setShowModal(false);
          setEditingId(null);
          setFormData({ chamadoId: "", cliente: "", descricao: "", tecnicoResponsavel: "", status: "pendente", dataInicio: "", dataFim: "", laudoTecnico: "", valorMaoObra: "", departamentoId: "" });
          setSelectedPecas([]);
          setClientSearch("");
          fetchData(); 
      } catch (error) { toast.error("Falha ao salvar OS."); } finally { setSubmitting(false); }
  }
  
  const getStatusColor = (status: string) => {
     const colors: any = { pendente: "bg-gray-100 text-gray-700", em_andamento: "bg-blue-100 text-blue-700", concluido: "bg-green-100 text-green-700", cancelado: "bg-red-100 text-red-700" };
     return colors[status] || colors.pendente;
  };

  return (
    <PermissionGuard module="GESTAO">
        <DashboardLayout>
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço (OS)</h1>
            <p className="text-gray-500">Controle de status, peças, mão de obra e assinaturas</p>
          </div>
          {canDo('GESTAO', 'canCreate') && (
            <button onClick={() => {
                setEditingId(null);
                setFormData({ chamadoId: "", cliente: "", descricao: "", tecnicoResponsavel: "", status: "pendente", dataInicio: "", dataFim: "", laudoTecnico: "", valorMaoObra: "", departamentoId: "" });
                setSelectedPecas([]);
                setClientSearch("");
                setShowModal(true);
                }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" /> Gerar OS
            </button>
          )}
        </div>

        {loading ? <p>Carregando...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordensServico.map((os) => (
              <div key={os.id} onClick={() => handleEdit(os)} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{os.numero}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(os.status)}`}>{os.status.replace("_", " ")}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{os.cliente || "Cliente não informado"}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{os.descricao}</p>
                <div className="mt-2 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Clique para editar</div>
              </div>
            ))}
            </div>
        )}

        {showModal && (
            // ... (keep existing modal content until line 630)
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gray-50 gap-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            <span className="truncate">{editingId ? `Editar OS #${ordensServico.find(o => o.id === editingId)?.numero}` : "Nova Ordem de Serviço"}</span>
                        </h2>
                        
                        <div className="flex items-center gap-3 justify-between sm:justify-end">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 hidden xs:inline">Status:</span>
                                <select 
                                    className={`p-2 rounded-lg border font-medium text-xs sm:text-sm ${
                                        formData.status === 'concluido' ? 'bg-green-50 text-green-700 border-green-200' :
                                        formData.status === 'em_andamento' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        'bg-gray-50 text-gray-700 border-gray-200'
                                    }`}
                                    value={formData.status} 
                                    onChange={e => {
                                        const newStatus = e.target.value;
                                        // Restriction for TECNICO
                                        if (user?.perfil === 'TECNICO' && (newStatus === 'cancelado' || newStatus === 'pendente')) {
                                            toast.error("Técnico não pode definir este status.");
                                            return;
                                        }
                                        setFormData({...formData, status: newStatus});
                                    }}
                                >
                                    <option value="pendente">Pendente</option>
                                    <option value="em_andamento">Em Andamento</option>
                                    <option value="concluido">Concluído</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>
                            
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={24} /></button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                        {/* Tabs Sidebar - Now horizontal on small screens */}
                        <div className="w-full lg:w-48 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100 p-2 overflow-x-auto no-scrollbar lg:overflow-y-auto">
                            <div className="flex lg:flex-col min-w-max lg:min-w-0 space-x-1 lg:space-x-0 lg:space-y-1">
                                {[
                                    { id: "geral", label: "Geral", fullLabel: "Dados Gerais", icon: Info },
                                    { id: "execucao", label: "Execução", fullLabel: "Execução", icon: Clock },
                                    { id: "pecas", label: "Peças", fullLabel: "Peças", icon: Box },
                                    { id: "anexos", label: "Fotos", fullLabel: "Fotos", icon: ImageIcon },
                                    { id: "laudo", label: "Laudo", fullLabel: "Laudo", icon: FileCheck },
                                    { id: "historico", label: "Histórico", fullLabel: "Histórico", icon: History }
                                ].map((tab) => (
                                    <button 
                                        key={tab.id} 
                                        type="button" 
                                        onClick={() => setActiveTab(tab.id)} 
                                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                                            activeTab === tab.id 
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                                            : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-700"
                                        }`}
                                    >
                                        <tab.icon className="w-4 h-4" /> 
                                        <span className="hidden lg:inline">{tab.fullLabel}</span>
                                        <span className="lg:hidden">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
                             <form onSubmit={handleSubmit} id="os-form">
                                 {activeTab === "geral" && (
                                     <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Vincular Chamado</label>
                                            <select className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500" value={formData.chamadoId} onChange={e => handleChamadoChange(e.target.value)}>
                                                <option value="">Sem vínculo</option>
                                                {chamados.map(c => <option key={c.id} value={c.id}>#{c.id} - {c.titulo}</option>)}
                                            </select>
                                         </div>
                                         <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                            <input type="text" className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500" placeholder="Nome do cliente..." value={clientSearch} onChange={e => { setClientSearch(e.target.value); setFormData({...formData, cliente: e.target.value}); setShowClientSuggestions(true); }} onFocus={() => setShowClientSuggestions(true)} />
                                            {showClientSuggestions && (
                                                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-xl z-50 rounded-lg mt-1 overflow-hidden">
                                                    <div className="max-h-48 overflow-auto">
                                                        {filteredClientes.map(c => <button key={c.id} type="button" onClick={() => handleSelectClient(c)} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-50 last:border-0">{c.nome}</button>)}
                                                    </div>
                                                    <button type="button" onClick={() => { setQuickClientData({nome: clientSearch, telefone: ""}); setShowQuickClientModal(true); }} className="w-full text-center px-4 py-3 bg-emerald-50 text-emerald-600 font-bold text-xs uppercase tracking-wider hover:bg-emerald-100 transition-colors">➕ Cadastrar Novo</button>
                                                </div>
                                            )}
                                         </div>
                                         {departamentos.length > 0 && (
                                            <div className="animate-in slide-in-from-top-2 duration-300">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento / Setor</label>
                                                <select className="w-full p-2.5 border rounded-lg bg-blue-50/50 border-blue-200 text-blue-800 text-sm focus:ring-2 focus:ring-blue-500" value={formData.departamentoId || ""} onChange={e => setFormData({...formData, departamentoId: e.target.value})}>
                                                    <option value="">Selecione um setor...</option>
                                                    {departamentos.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                                                </select>
                                            </div>
                                         )}
                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
                                                <input type="date" className="w-full p-2 border rounded-lg" value={formData.dataInicio} onChange={e => setFormData({...formData, dataInicio: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
                                                <input type="date" className="w-full p-2 border rounded-lg" value={formData.dataFim} onChange={e => setFormData({...formData, dataFim: e.target.value})} />
                                            </div>
                                         </div>
                                     </div>
                                 )}

                                 {activeTab === "execucao" && (
                                     <div className="space-y-6 animate-in fade-in duration-300">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Técnico Responsável</label>
                                            <select className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500" value={formData.tecnicoResponsavel} onChange={e => setFormData({...formData, tecnicoResponsavel: e.target.value})}>
                                                <option value="">Selecione...</option>
                                                {tecnicos.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
                                            </select>
                                         </div>
                                          <div className="lg:col-span-2">
                                             <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Serviço</label>
                                             <textarea rows={6} className="w-full p-2.5 border rounded-lg resize-none text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500" placeholder="Detalhes da solicitação..." value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})}></textarea>
                                          </div>
                                     </div>
                                 )}

                                 {activeTab === "pecas" && (
                                     <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                                         <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-stretch sm:items-end shadow-sm">
                                             <div className="flex-1">
                                                 <label className="block text-xs font-black uppercase tracking-widest text-amber-700 mb-2">Adicionar Produto / Peça</label>
                                                 <div className="relative">
                                                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                                                     <input list="stock-items" className="w-full pl-9 p-2.5 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm" placeholder="Busque por nome ou código..." value={pecaSearch} onChange={e => setPecaSearch(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddPeca(); } }} />
                                                     <datalist id="stock-items">{itensEstoque.map(Item => <option key={Item.id} value={Item.nome}>{Item.codigo ? `[${Item.codigo}] ` : ""}{Item.nome} - {Item.quantidade} {Item.unidade} disp.</option>)}</datalist>
                                                 </div>
                                             </div>
                                             <button type="button" onClick={handleAddPeca} className="px-6 py-2.5 bg-amber-600 text-white font-black rounded-lg hover:bg-amber-700 shadow-lg shadow-amber-900/10 whitespace-nowrap text-sm uppercase transition-all active:scale-95">+ Adicionar</button>
                                         </div>
                                         <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                             <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left min-w-[500px]">
                                                    <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400 border-b">
                                                        <tr><th className="p-4">Produto</th><th className="p-4 w-24">Qtd</th><th className="p-4 w-32">Unit. (R$)</th><th className="p-4 w-32">Total (R$)</th><th className="p-4 w-10"></th></tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {selectedPecas.length === 0 ? (<tr><td colSpan={5} className="p-10 text-center text-gray-400 italic">Nenhuma peça adicionada.</td></tr>) : (
                                                            selectedPecas.map((peca, idx) => (
                                                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                                                    <td className="p-4">
                                                                        <div className="font-bold text-gray-900">{peca.item.nome}</div>
                                                                        <div className="text-[10px] text-gray-400 font-mono">{peca.item.codigo}</div>
                                                                    </td>
                                                                    <td className="p-4"><input type="number" min="1" className="w-full p-2 border border-gray-100 rounded-lg text-center font-bold" value={peca.quantidade} onChange={e => handleUpdatePeca(idx, 'quantidade', e.target.value)} /></td>
                                                                    <td className="p-4"><input type="number" step="0.01" className="w-full p-2 border border-gray-100 rounded-lg text-right font-bold" value={peca.valorUnitario} onChange={e => handleUpdatePeca(idx, 'valorUnitario', e.target.value)} /></td>
                                                                    <td className="p-4 font-black text-right text-gray-900">{(peca.quantidade * peca.valorUnitario).toFixed(2)}</td>
                                                                    <td className="p-4 text-right"><button type="button" onClick={() => handleRemovePeca(idx)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><Trash2 size={18} /></button></td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                    {selectedPecas.length > 0 && (
                                                        <tfoot className="bg-gray-50/50 font-black border-t">
                                                            <tr>
                                                                <td colSpan={3} className="p-4 text-right text-[10px] uppercase tracking-widest text-gray-400">Total Peças:</td>
                                                                <td className="p-4 text-right text-lg text-amber-700">R$ {selectedPecas.reduce((acc, p) => acc + (p.quantidade * p.valorUnitario), 0).toFixed(2)}</td>
                                                                <td></td>
                                                            </tr>
                                                        </tfoot>
                                                    )}
                                                </table>
                                             </div>
                                         </div>
                                     </div>
                                 )}

                                 {activeTab === "anexos" && (
                                     <div className="space-y-6 animate-in fade-in duration-300">
                                        {!editingId ? (<div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">Salve a OS primeiro para adicionar fotos.</div>) : (
                                            <>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div 
                                                        onClick={() => cameraInputRef.current?.click()} 
                                                        className="border-2 border-dashed border-emerald-200 rounded-2xl p-6 text-center hover:bg-emerald-50 transition-all cursor-pointer group active:scale-95 bg-white shadow-sm"
                                                    >
                                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                            <ImageIcon className="w-6 h-6 text-emerald-600" />
                                                        </div>
                                                        <p className="text-sm text-gray-900 font-black uppercase tracking-wider">Tirar Foto</p>
                                                        <p className="text-[10px] text-gray-500 mt-1 font-bold">Usar câmera do dispositivo</p>
                                                        <input type="file" ref={cameraInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileUpload} />
                                                    </div>

                                                    <div 
                                                        onClick={() => fileInputRef.current?.click()} 
                                                        className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center hover:bg-blue-50 transition-all cursor-pointer group active:scale-95 bg-white shadow-sm"
                                                    >
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                            <Upload className="w-6 h-6 text-blue-600" />
                                                        </div>
                                                        <p className="text-sm text-gray-900 font-black uppercase tracking-wider">Escolher Arquivo</p>
                                                        <p className="text-[10px] text-gray-500 mt-1 font-bold">Selecionar da galeria</p>
                                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {anexos.map((anexo) => (
                                                        <div key={anexo.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                            <img src={anexo.url} alt={anexo.nome} className="w-full h-full object-cover" />
                                                            <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                                                                <span className="text-xs text-white truncate px-1">{anexo.nome}</span>
                                                                <button type="button" onClick={async () => { if(confirm("Excluir foto?")) { await fetch(`/api/suporte/os/${editingId}/anexos/${anexo.id}`, { method: 'DELETE' }); setAnexos(prev => prev.filter(a => a.id !== anexo.id)); toast.success("Foto removida"); } }} className="text-white hover:text-red-400 p-1"><Trash2 size={16} /></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                     </div>
                                 )}

                                 {activeTab === "laudo" && (
                                     <div className="space-y-6 animate-in fade-in duration-300">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Laudo Técnico Final</label>
                                            <textarea rows={8} className="w-full p-3 border rounded-xl resize-none font-mono text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Digite aqui o parecer técnico detalhado..." value={formData.laudoTecnico} onChange={e => setFormData({...formData, laudoTecnico: e.target.value})}></textarea>
                                         </div>
                                         <div className={`${user?.perfil === 'TECNICO' ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Mão de Obra (R$) {user?.perfil === 'TECNICO' && "(Apenas Financeiro/Admin)"}</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                                <input type="number" step="0.01" className="w-full pl-10 p-2.5 bg-gray-50 border rounded-lg font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500" placeholder="0,00" value={formData.valorMaoObra} onChange={e => setFormData({...formData, valorMaoObra: e.target.value})} />
                                            </div>
                                         </div>
                                     </div>
                                 )}

                                 {activeTab === "historico" && (
                                      <div className="space-y-4 animate-in fade-in duration-300 max-h-[400px] overflow-y-auto pr-2">
                                          {logs.map((log) => (
                                              <div key={log.id} className="ml-6 relative border-l-2 pl-4 py-2 border-gray-100">
                                                  <div className="text-xs font-bold text-gray-900">{log.action} por {log.userName}</div>
                                                  <div className="text-[10px] text-gray-500">{new Date(log.timestamp).toLocaleString("pt-BR")}</div>
                                              </div>
                                          ))}
                                      </div>
                                 )}
                             </form>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
                        <button type="button" onClick={() => setShowModal(false)} className="w-full sm:w-auto px-6 py-2.5 text-gray-700 hover:bg-gray-200/60 rounded-xl font-bold transition-colors">Cancelar</button>
                        {(canDo('GESTAO', 'canEdit') || !editingId) && (
                            <button type="submit" form="os-form" disabled={submitting} className="w-full sm:w-auto px-8 py-2.5 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                                {submitting ? "Salvando..." : "Salvar OS"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

        {/* Modal de Cadastro Rápido de Cliente */}
        {showQuickClientModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                <UserPlus size={20} />
                            </div>
                            <h3 className="font-bold text-gray-900">Cadastro Rápido</h3>
                        </div>
                        <button onClick={() => setShowQuickClientModal(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleQuickClientSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nome / Razão Social</label>
                            <input 
                                type="text" 
                                required 
                                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 bg-gray-50" 
                                placeholder="Nome completo..."
                                value={quickClientData.nome}
                                onChange={e => setQuickClientData({...quickClientData, nome: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
                            <input 
                                type="text" 
                                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 bg-gray-50" 
                                placeholder="(00) 00000-0000"
                                value={quickClientData.telefone}
                                onChange={e => setQuickClientData({...quickClientData, telefone: e.target.value})}
                            />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setShowQuickClientModal(false)} 
                                className="flex-1 py-3 text-gray-700 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={submitting} 
                                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {submitting ? "Salvando..." : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
        </DashboardLayout>
    </PermissionGuard>
  );
}

export default function OSPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OSContent />
    </Suspense>
  );
}
