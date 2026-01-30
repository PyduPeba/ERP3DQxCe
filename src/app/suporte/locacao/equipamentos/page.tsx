"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Search, Filter, Edit2, Archive, CheckCircle, AlertTriangle, Monitor, ArrowLeft, LayoutDashboard, X, Camera, Image as ImageIcon, Box } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { compressImage } from "@/lib/imageCompression";

export default function EquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState<any>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("TODOS");
  const [inventoryProducts, setInventoryProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    codigoPatrimonio: "",
    status: "DISPONIVEL",
    condicao: "Novo",
    valorAquisicao: "",
    valorLocacaoBase: "",
    descricao: "",
    fotoUrl: "",
    fotos: [] as string[],
    itemEstoqueId: "" as string | number
  });

  const startCamera = async () => {
    console.log("Tentando iniciar câmera...");
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Câmera não suportada ou conexão insegura (use HTTPS).");
      console.error("navigator.mediaDevices not supported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      console.log("Camera stream obtained", stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Erro na câmera:", err);
      toast.error(`Erro: ${err.message || "Permissão negada"}`);
    }
  };

  const stopMediaStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const closeCamera = () => {
    stopMediaStream();
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 10);
            const filename = `camera_${timestamp}_${randomStr}.jpg`;
            const file = new File([blob], filename, { type: "image/jpeg" });
            
            const data = new FormData();
            data.append("file", file);
            try {
                const res = await fetch("/api/upload", { method: "POST", body: data });
                const json = await res.json();
                if (json.url) {
                    setFormData(prev => ({ 
                        ...prev, 
                        fotoUrl: prev.fotoUrl || json.url, 
                        fotos: [...(prev.fotos || []), json.url] 
                    }));
                    toast.success("Foto capturada!");
                    closeCamera();
                }
            } catch (err) {
                toast.error("Erro ao salvar foto.");
            }
          }
        }, "image/jpeg", 0.7);
      }
    }
  };

  useEffect(() => {
    if (showCamera) {
        startCamera();
    } else {
        stopMediaStream();
    }
    return () => stopMediaStream(); 
  }, [showCamera]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      
      const rawFile = e.target.files[0];
      const loadingToast = toast.loading("Otimizando foto...");
      const file = await compressImage(rawFile);
      toast.dismiss(loadingToast);

      const data = new FormData();
      data.append("file", file);

      try {
          const res = await fetch("/api/upload", { method: "POST", body: data });
          const json = await res.json();
          if (json.url) {
              setFormData(prev => ({ 
                  ...prev, 
                  fotoUrl: prev.fotoUrl || json.url, // Keep first as main
                  fotos: [...(prev.fotos || []), json.url] 
              }));
              toast.success("Foto adicionada!");
          }
      } catch (err) {
          toast.error("Erro ao enviar foto.");
      }
  };

  useEffect(() => {
    fetchEquipamentos();
    fetchInventoryProducts();
  }, []);

  const fetchInventoryProducts = async () => {
    try {
      const res = await fetch("/api/suporte/estoque/produtos");
      const data = await res.json();
      if (Array.isArray(data)) {
        setInventoryProducts(data);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos do estoque:", err);
    }
  };

  const fetchEquipamentos = async () => {
    try {
      const res = await fetch("/api/locacao/equipamentos");
      if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("API Fetch Error:", res.status, errorData);
          setEquipamentos([]);
          return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
          setEquipamentos(data);
      } else {
          setEquipamentos([]);
          console.error("API Invalid format:", data);
      }
    } catch (err) {
      toast.error("Erro ao carregar equipamentos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, keepOpen = false) => {
    e.preventDefault();
    try {
      const method = formData.id ? "PUT" : "POST";
      const res = await fetch("/api/locacao/equipamentos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          valorAquisicao: formData.valorAquisicao ? Number(formData.valorAquisicao) : null,
          valorLocacaoBase: formData.valorLocacaoBase ? Number(formData.valorLocacaoBase) : null,
          itemEstoqueId: formData.itemEstoqueId ? Number(formData.itemEstoqueId) : null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success(formData.id ? "Equipamento atualizado!" : "Equipamento criado!");
      
      fetchEquipamentos();
      
      if (keepOpen) {
          // Reset only unique fields to facilitate batch entry of similar items
          setFormData(prev => ({ 
              ...prev, 
              id: null, 
              nome: "", 
              numeroSerie: "",
              codigoPatrimonio: ""
          }));
      } else {
          setShowModal(false);
          setFormData({ 
            id: null, nome: "", marca: "", modelo: "", numeroSerie: "", codigoPatrimonio: "", 
            status: "DISPONIVEL", condicao: "Novo", valorAquisicao: "", valorLocacaoBase: "", 
            descricao: "", fotoUrl: "", fotos: [], itemEstoqueId: "" 
          });
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEdit = (eq: any) => {
    setFormData({
      id: eq.id,
      nome: eq.nome,
      marca: eq.marca || "",
      modelo: eq.modelo || "",
      numeroSerie: eq.numeroSerie || "",
      codigoPatrimonio: eq.codigoPatrimonio || "",
      status: eq.status,
      condicao: eq.condicao || "Usado",
      valorAquisicao: eq.valorAquisicao || "",
      valorLocacaoBase: eq.valorLocacaoBase || "",
      descricao: eq.descricao || "",
      fotoUrl: eq.fotoUrl || "",
      fotos: eq.fotos || (eq.fotoUrl ? [eq.fotoUrl] : []),
      itemEstoqueId: eq.itemEstoqueId || ""
    });
    setShowPreview(false);
    setShowModal(true);
  };

  const filtered = Array.isArray(equipamentos) ? equipamentos.filter(eq => {
    const term = search.toLowerCase();
    const matchesSearch = eq.nome.toLowerCase().includes(term) || 
                          eq.numeroSerie?.toLowerCase().includes(term) ||
                          eq.codigoPatrimonio?.toLowerCase().includes(term);
    const matchesStatus = filterStatus === "TODOS" || eq.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  return (
    <PermissionGuard module="LOCACAO">
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
          <Link href="/suporte/locacao" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <ArrowLeft size={16} /> Voltar para Dashboard
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/suporte" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <LayoutDashboard size={16} /> Menu Principal
          </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <Monitor className="w-8 h-8 text-indigo-600" />
             Gestão de Equipamentos
           </h1>
           <p className="text-slate-500 text-sm">Cadastre e controle seus ativos para locação.</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: null, nome: "", marca: "", modelo: "", numeroSerie: "", codigoPatrimonio: "", status: "DISPONIVEL", condicao: "Novo", valorAquisicao: "", valorLocacaoBase: "", descricao: "", fotoUrl: "", fotos: [], itemEstoqueId: "" }); setShowModal(true); }}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-3 sm:py-2 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 font-bold uppercase tracking-wider transition-all active:scale-95"
        >
          <Plus size={18} /> Novo Equipamento
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
           <input 
             className="w-full pl-10 pr-4 py-3 md:py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-all" 
             placeholder="Buscar por nome, serial ou modelo..." 
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
        <select 
          className="w-full md:w-auto border border-slate-200 rounded-xl px-4 py-3 md:py-2 text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 font-medium"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="TODOS">Todos Status</option>
          <option value="DISPONIVEL">Disponível</option>
          <option value="LOCADO">Locado</option>
          <option value="MANUTENCAO">Em Manutenção</option>
        </select>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="col-span-3 text-center py-10 text-slate-400">Carregando...</p> : 
         filtered.length === 0 ? <p className="col-span-3 text-center py-10 text-slate-400">Nenhum equipamento encontrado.</p> :
          filtered.map(eq => (
            <div 
              key={eq.id} 
              onClick={() => {
                setSelectedEquipamento(eq);
                setCurrentPhotoIndex(0);
                setShowPreview(true);
              }}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow group cursor-pointer"
            >
             
             {/* Image Cover */}
             <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                {eq.fotos && eq.fotos.length > 0 ? (
                    <img src={eq.fotos[0]} alt={eq.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : eq.fotoUrl ? (
                    <img src={eq.fotoUrl} alt={eq.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Monitor size={32} />
                    </div>
                )}
             </div>

             <div className="flex justify-between items-start mb-3">
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                  ${eq.status === 'DISPONIVEL' ? 'bg-emerald-100 text-emerald-700' : 
                    eq.status === 'LOCADO' ? 'bg-blue-100 text-blue-700' : 
                    'bg-amber-100 text-amber-700'}`}>
                  {eq.status}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(eq);
                  }} 
                  className="text-slate-300 hover:text-indigo-600 transition-colors bg-slate-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <Edit2 size={16} />
                </button>
             </div>
             
             <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">{eq.nome}</h3>
             <div className="text-sm text-slate-500 mb-4 space-y-1">
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    {eq.numeroSerie && <span className="bg-slate-100 px-1.5 py-0.5 rounded border">S/N: {eq.numeroSerie}</span>}
                    {eq.codigoPatrimonio && <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 font-bold">PAT: {eq.codigoPatrimonio}</span>}
                </div>
                <p className="text-xs truncate">{eq.marca} • {eq.modelo}</p>
             </div>

             <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                <span className="text-slate-400 text-xs">{eq.condicao}</span>
                {eq.valorLocacaoBase && <span className="font-bold text-indigo-600">R$ {eq.valorLocacaoBase.toFixed(2)}<span className="text-[10px] font-normal text-slate-400">/mês</span></span>}
             </div>
           </div>
          ))
        }
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
             <div className="bg-indigo-50 p-6 border-b border-indigo-100 shrink-0">
               <h2 className="text-xl font-bold text-indigo-900">{formData.id ? "Editar Equipamento" : "Novo Equipamento"}</h2>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
               <div className="grid grid-cols-2 gap-4">
                 
                  {/* Image Upload Section */}
                  <div className="col-span-2 space-y-3">
                      <label className="block text-sm font-medium text-indigo-900">Fotos do Equipamento</label>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        multiple 
                        onChange={handleUpload} 
                        className="hidden" 
                        accept="image/*" 
                      />

                      {/* Photo Grid */}
                      <div className="grid grid-cols-4 gap-2 mb-2">
                          {formData.fotos && formData.fotos.map((url, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                                  <img src={url} alt={`Foto ${idx}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== idx) }))}
                                    className="absolute top-1 right-1 bg-white/80 hover:bg-red-500 hover:text-white text-slate-700 p-1 rounded-full transition-colors"
                                  >
                                      <X size={14} />
                                  </button>
                              </div>
                          ))}
                          
                          {/* Add File Button */}
                          <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                          >
                              <ImageIcon className="text-slate-400 mb-1" />
                              <span className="text-xs text-slate-500">Galeria</span>
                          </div>

                          {/* Camera Button */}
                          <div 
                              onClick={() => {
                                  console.log("Botão câmera clicado!");
                                  setShowCamera(true);
                              }}
                              className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                          >
                              <div className="bg-indigo-100 p-2 rounded-full mb-1">
                                  <Camera size={20} className="text-indigo-600" />
                              </div>
                              <span className="text-xs text-slate-500">Câmera</span>
                          </div>
                      </div>
                  </div>

                  <div className="col-span-2 space-y-4">
                     {/* Item do Estoque Link */}
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Item de Catálogo (Estoque)</label>
                       <select 
                         value={formData.itemEstoqueId} 
                         onChange={e => {
                            const val = e.target.value;
                            setFormData(prev => ({...prev, itemEstoqueId: val}));
                            if (val) {
                                const prod = inventoryProducts.find(p => p.id === Number(val));
                                if (prod) {
                                    setFormData(prev => ({
                                        ...prev,
                                        itemEstoqueId: val,
                                        nome: prev.nome || prod.nome,
                                        marca: prev.marca || prod.marca || "",
                                        modelo: prev.modelo || prod.modelo || ""
                                    }));
                                }
                            }
                         }}
                         className="w-full p-2 border rounded-lg bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-indigo-500"
                       >
                         <option value="">-- Selecione o item base do estoque --</option>
                         {inventoryProducts.map(p => (
                             <option key={p.id} value={p.id}>{p.nome} ({p.categoria})</option>
                         ))}
                       </select>
                       <p className="text-[10px] text-slate-400 mt-1">Vincule o serial a um produto do estoque para manter o controle de inventário sincronizado.</p>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-indigo-900 mb-1">Nome de Exibição *</label>
                       <input required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Notebook Dell Latitude" />
                     </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Marca</label>
                    <input value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Ex: Dell" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Modelo</label>
                    <input value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Ex: 5420" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Número de Série (S/N)</label>
                    <input value={formData.numeroSerie} onChange={e => setFormData({...formData, numeroSerie: e.target.value})} className="w-full p-2 border rounded-lg font-mono text-sm" placeholder="ABC-12345" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Código Patrimônio</label>
                    <input value={formData.codigoPatrimonio} onChange={e => setFormData({...formData, codigoPatrimonio: e.target.value})} className="w-full p-2 border rounded-lg font-mono text-sm uppercase" placeholder="PAT-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Condição</label>
                    <select value={formData.condicao} onChange={e => setFormData({...formData, condicao: e.target.value})} className="w-full p-2 border rounded-lg bg-white">
                       <option>Novo</option>
                       <option>Seminovo</option>
                       <option>Usado</option>
                       <option>Danificado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Valor Aquisição (R$)</label>
                    <input type="number" step="0.01" value={formData.valorAquisicao} onChange={e => setFormData({...formData, valorAquisicao: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Valor Locação Base (R$)</label>
                    <input type="number" step="0.01" value={formData.valorLocacaoBase} onChange={e => setFormData({...formData, valorLocacaoBase: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Sugestão mensal" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-indigo-900 mb-1">Status</label>
                    <div className="flex gap-4">
                      {["DISPONIVEL", "LOCADO", "MANUTENCAO", "APOSENTADO"].map(s => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={formData.status === s} onChange={() => setFormData({...formData, status: s})} className="text-indigo-600 focus:ring-indigo-500" />
                          <span className="text-sm">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                 <div className="flex justify-between w-full pt-4 border-t border-slate-100">
                   <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg">Cancelar</button>
                   <div className="flex gap-2">
                       {!formData.id && (
                           <button 
                             type="button" 
                             onClick={(e) => handleSubmit(e, true)}
                             className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100"
                           >
                             Salvar e Criar Outro
                           </button>
                       )}
                       <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                         {formData.id ? "Salvar Alterações" : "Salvar Equipamento"}
                       </button>
                   </div>
                 </div>
               </form>
          </div>
        </div>
      )}
      {/* Preview Modal */}
      {showPreview && selectedEquipamento && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Left: Photo Gallery */}
            <div className="w-full md:w-1/2 bg-slate-950 flex flex-col relative group">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="absolute top-4 left-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-all md:hidden"
                >
                  <X size={20} />
                </button>

                <div className="flex-1 flex items-center justify-center p-4">
                   {selectedEquipamento.fotos && selectedEquipamento.fotos.length > 0 ? (
                       <img 
                         src={selectedEquipamento.fotos[currentPhotoIndex] || selectedEquipamento.fotos[0]} 
                         className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
                       />
                   ) : selectedEquipamento.fotoUrl ? (
                        <img 
                          src={selectedEquipamento.fotoUrl} 
                          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
                        />
                   ) : (
                       <div className="text-slate-700 flex flex-col items-center">
                           <Monitor size={64} className="mb-4 opacity-20" />
                           <p className="text-sm opacity-40">Sem fotos disponíveis</p>
                       </div>
                   )}
                </div>

                {/* Photo Thumbnails */}
                {selectedEquipamento.fotos && selectedEquipamento.fotos.length > 1 && (
                    <div className="p-4 flex gap-2 overflow-x-auto bg-black/20 backdrop-blur-md shrink-0">
                        {selectedEquipamento.fotos.map((f: string, i: number) => (
                            <div 
                              key={i} 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPhotoIndex(i);
                              }}
                              className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-all
                                ${currentPhotoIndex === i ? 'border-indigo-400 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                            >
                                <img src={f} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 flex flex-col bg-white overflow-y-auto">
                <div className="p-8 space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            {selectedEquipamento.itemEstoque && (
                                <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full w-fit mb-2 border border-indigo-100">
                                    <Box size={12} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{selectedEquipamento.itemEstoque.nome}</span>
                                </div>
                            )}
                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">{selectedEquipamento.nome}</h2>
                            <p className="text-slate-500 font-medium mt-1">{selectedEquipamento.marca} • {selectedEquipamento.modelo}</p>
                        </div>
                        <button 
                          onClick={() => setShowPreview(false)}
                          className="hidden md:block text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all"
                        >
                          <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest
                          ${selectedEquipamento.status === 'DISPONIVEL' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                            selectedEquipamento.status === 'LOCADO' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                            'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                          {selectedEquipamento.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {selectedEquipamento.condicao}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Número de Série</p>
                            <p className="font-mono text-slate-700 font-medium">{selectedEquipamento.numeroSerie || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cód. Patrimônio</p>
                            <p className="font-mono text-indigo-700 font-bold">{selectedEquipamento.codigoPatrimonio || "N/A"}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Valores de Referência</h3>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Custo Aquisição</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {selectedEquipamento.valorAquisicao ? `R$ ${selectedEquipamento.valorAquisicao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ 0,00"}
                                </p>
                            </div>
                            <div className="flex-1 bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-100">
                                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Locação Base</p>
                                <p className="text-xl font-bold text-white">
                                    {selectedEquipamento.valorLocacaoBase ? `R$ ${selectedEquipamento.valorLocacaoBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ 0,00"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {selectedEquipamento.descricao && (
                        <div className="space-y-2">
                             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Observações</h3>
                             <p className="text-slate-600 text-sm leading-relaxed">{selectedEquipamento.descricao}</p>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-100 flex gap-4 mt-auto">
                        <button 
                          onClick={() => handleEdit(selectedEquipamento)}
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all"
                        >
                            <Edit2 size={18} />
                            Editar Equipamento
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="relative aspect-[3/4] bg-slate-900">
               <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
               <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="p-6 flex items-center justify-between bg-zinc-900">
               <button onClick={closeCamera} className="text-white hover:bg-zinc-800 p-3 rounded-full">
                 <X size={24} />
               </button>
               
               <button 
                 onClick={capturePhoto}
                 className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-95 transition-transform"
               >
                 <div className="w-full h-full bg-white rounded-full"></div>
               </button>

               <div className="w-12"></div> {/* Spacer for alignment */}
            </div>
          </div>
        </div>
      )}
        </div>
      </DashboardLayout>
    </PermissionGuard>
  );
}
