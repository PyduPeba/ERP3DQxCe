"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { Laptop, Save, ArrowLeft, Tag, Calendar, DollarSign, MapPin, Box, User, Camera, Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { compressImage } from "@/lib/imageCompression";

export default function NovoAtivoPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [clientes, setClientes] = useState<any[]>([]);
    
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        categoria: "TI",
        numeroPatrimonio: "",
        numeroSerie: "",
        dataAquisicao: "",
        valorAquisicao: "",
        localizacao: "",
        status: "OPERACIONAL",
        tipoPropriedade: "INTERNO", // INTERNO ou CLIENTE
        clienteId: "",
        fotos: [] as string[]
    });

    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        fetch("/api/clientes").then(res => res.json()).then(data => {
            if (Array.isArray(data)) setClientes(data);
        });
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err: any) {
            toast.error("Erro ao acessar câmera: " + (err.message || "Permissão negada"));
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
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
                        const file = new File([blob], `ati_asset_${Date.now()}.jpg`, { type: "image/jpeg" });
                        await handleFileUpload(file);
                        stopCamera();
                        setShowCamera(false);
                    }
                }, "image/jpeg", 0.7);
            }
        }
    };

    const handleFileUpload = async (rawFile: File) => {
        console.log("Starting upload for:", rawFile.name, rawFile.size);
        const loadingToast = toast.loading("Otimizando foto...");
        try {
            const file = await compressImage(rawFile);
            console.log("Compressed file size:", file.size);
            const data = new FormData();
            data.append("file", file);

            const res = await fetch("/api/upload", { method: "POST", body: data });
            const json = await res.json();
            console.log("Upload response:", json);
            
            if (json.url) {
                setFormData(prev => ({ ...prev, fotos: [...prev.fotos, json.url] }));
                toast.success("Foto adicionada!");
            } else {
                console.error("No URL in response:", json);
            }
        } catch (err) {
            console.error("Upload process error:", err);
            toast.error("Erro ao processar foto");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    useEffect(() => {
        if (showCamera) startCamera();
        else stopCamera();
        return () => stopCamera();
    }, [showCamera]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/suporte/ati/ativos", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar");

            toast.success("Ativo cadastrado com sucesso!");
            router.push("/suporte/ati/ativos");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/suporte/ati/ativos" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Novo Ativo Interno</h1>
                        <p className="text-gray-500">Cadastre um novo bem no patrimônio da empresa</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        {/* Seção: Identificação */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Tag size={14} /> Propriedade & Identificação
                            </h3>
                            
                            {/* Toggle Propriedade */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Este ativo pertence a quem?</label>
                                    <div className="flex gap-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, tipoPropriedade: 'INTERNO', clienteId: '' }))}
                                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${formData.tipoPropriedade === 'INTERNO' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            Propriedade da Empresa
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, tipoPropriedade: 'CLIENTE' }))}
                                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${formData.tipoPropriedade === 'CLIENTE' ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            Propriedade de Cliente
                                        </button>
                                    </div>
                                </div>

                                {formData.tipoPropriedade === 'CLIENTE' && (
                                    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                        <label className="block text-xs font-black text-gray-400 uppercase mb-2 flex items-center gap-2">
                                            <User size={12} className="text-amber-500" /> Selecione o Cliente / Órgão Público *
                                        </label>
                                        <select 
                                            required 
                                            name="clienteId" 
                                            value={formData.clienteId} 
                                            onChange={handleChange} 
                                            className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm font-medium"
                                        >
                                            <option value="">Clique para selecionar o proprietário...</option>
                                            {clientes.map(c => (
                                                <option key={c.id} value={c.id}>{c.nome} {c.cpfCnpj ? `(${c.cpfCnpj})` : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Ativo *</label>
                                    <input required name="nome" value={formData.nome} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ex: Notebook Dell Latitude 3420" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Número de Patrimônio / Tombo *</label>
                                    <input required name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" placeholder="Ex: ATI-001 ou Munic-123" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Número de Série</label>
                                    <input name="numeroSerie" value={formData.numeroSerie} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" placeholder="S/N: XXXXXXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                                    <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                        <option value="TI">TI (Hardware/Software)</option>
                                        <option value="Infraestrutura">Infraestrutura (Ar cond., Rede)</option>
                                        <option value="Móveis">Móveis & Utensílios</option>
                                        <option value="Veículos">Veículos</option>
                                        <option value="Ferramentas">Ferramentas de Trabalho</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status Inicial</label>
                                    <div className="flex gap-2">
                                        {['OPERACIONAL', 'MANUTENCAO', 'INATIVO'].map(status => (
                                            <button 
                                                key={status}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, status }))}
                                                className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all ${
                                                    formData.status === status 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-50" />

                        {/* Seção: Aquisição & Localização */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Box size={14} /> Detalhes de Aquisição & Localização
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" /> Data de Aquisição
                                    </label>
                                    <input type="date" name="dataAquisicao" value={formData.dataAquisicao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <DollarSign size={14} className="text-gray-400" /> Valor de Aquisição
                                    </label>
                                    <input type="number" step="0.01" name="valorAquisicao" value={formData.valorAquisicao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0,00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-400" /> Localização / Setor
                                    </label>
                                    <input name="localizacao" value={formData.localizacao} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ex: Sala 02 - TI" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Descrição / Observações</label>
                                    <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Detalhes técnicos adicionais, fornecedor, garantia..." />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-50" />

                        {/* Seção: Fotos */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Camera size={14} /> Fotos do Equipamento (Opcional)
                            </h3>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {formData.fotos.map((url, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50">
                                        <img src={url} alt={`Foto ${idx}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== idx) }))}
                                            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-xl transition-all shadow-sm"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                
                                {/* Botão Upload */}
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group">
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} 
                                    />
                                    <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                                        <ImageIcon size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Galeria</span>
                                </label>

                                {/* Botão Câmera */}
                                <button 
                                    type="button"
                                    onClick={() => setShowCamera(true)}
                                    className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                                >
                                    <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                                        <Camera size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Câmera</span>
                                </button>
                            </div>
                        </section>

                    </div>

                    {/* Footer / Botões */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <Link href="/suporte/ati/ativos" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancelar</Link>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            Salvar Ativo
                        </button>
                    </div>
                </form>

                {/* Camera Modal Overlay */}
                {showCamera && (
                    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="w-full max-w-lg bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="relative aspect-[3/4] bg-gray-900">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                                <canvas ref={canvasRef} className="hidden" />
                                <button 
                                    onClick={() => setShowCamera(false)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-8 flex items-center justify-center bg-zinc-900">
                                <button 
                                    type="button"
                                    onClick={capturePhoto}
                                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-95 transition-all shadow-xl"
                                >
                                    <div className="w-full h-full bg-white rounded-full" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
