"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { ClipboardList, Save, ArrowLeft, Laptop, User, AlertCircle, Package, Plus, X, Wrench, Camera, Image as ImageIcon, ZoomIn } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { compressImage } from "@/lib/imageCompression";
import { usePermissions } from "@/hooks/usePermissions";
import ImageOverlay from "@/app/components/suporte/ImageOverlay";

export default function NovaOSInternaPage() {
    const router = useRouter();
    const { user } = usePermissions();
    const [saving, setSaving] = useState(false);
    
    const [ativos, setAtivos] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    
    const [formData, setFormData] = useState({
        ativoId: "",
        solicitanteId: "",
        tecnicoId: "",
        descricaoProblema: "",
        fotos: [] as string[]
    });

    useEffect(() => {
        if (user && !formData.solicitanteId) {
            setFormData(prev => ({ ...prev, solicitanteId: user.id.toString() }));
        }
    }, [user]);

    const [showCamera, setShowCamera] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Load data for selects
        const loadData = async () => {
             const [ativosRes, usersRes] = await Promise.all([
                 fetch("/api/suporte/ati/ativos"),
                 fetch("/api/users")
             ]);
             const ativosData = await ativosRes.json();
             const usersData = await usersRes.json();

             setAtivos(Array.isArray(ativosData) ? ativosData : []);
             setUsuarios(Array.isArray(usersData) ? usersData : []);
        }
        loadData();
    }, []);

    const safeUsers = Array.isArray(usuarios) ? usuarios : [];

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err: any) {
            toast.error("Erro na câmera: " + (err.message || "Permissão negada"));
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
                        const file = new File([blob], `ati_os_${Date.now()}.jpg`, { type: "image/jpeg" });
                        await handleFileUpload(file);
                        stopCamera();
                        setShowCamera(false);
                    }
                }, "image/jpeg", 0.7);
            }
        }
    };

    const handleFileUpload = async (rawFile: File) => {
        const loadingToast = toast.loading("Otimizando foto...");
        try {
            const file = await compressImage(rawFile);
            const data = new FormData();
            data.append("file", file);

            const res = await fetch("/api/upload", { method: "POST", body: data });
            const json = await res.json();
            
            if (json.url) {
                setFormData(prev => ({ ...prev, fotos: [...prev.fotos, json.url] }));
                toast.success("Foto adicionada!");
            }
        } catch (err) {
            toast.error("Erro ao enviar foto");
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
            const res = await fetch("/api/suporte/ati/os", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao salvar");

            toast.success("Ordem de Serviço aberta!");
            router.push("/suporte/ati/os");
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
                    <Link href="/suporte/ati/os" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Nova OS Interna (ATI)</h1>
                        <p className="text-gray-500">Abertura de serviço para manutenção de infraestrutura</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Seleção do Ativo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Laptop size={14} className="text-blue-500" /> Selecione o Ativo *
                                </label>
                                <select 
                                    required 
                                    name="ativoId" 
                                    value={formData.ativoId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Clique para selecionar um ativo...</option>
                                    {ativos.map(a => (
                                        <option key={a.id} value={a.id}>{a.numeroPatrimonio} - {a.nome} ({a.localizacao || 'Sem local'})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Solicitante */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <User size={14} className="text-blue-500" /> Solicitante (Funcionário) *
                                </label>
                                <select 
                                    required 
                                    name="solicitanteId" 
                                    value={formData.solicitanteId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Quem está com o problema?</option>
                                    {safeUsers.map(u => (
                                        <option key={u.id} value={u.id}>{u.nome} ({u.perfil})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Técnico (Opcional na abertura) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Wrench size={14} className="text-blue-500" /> Técnico Responsável
                                </label>
                                <select 
                                    name="tecnicoId" 
                                    value={formData.tecnicoId} 
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Deixar em aberto...</option>
                                    {safeUsers.filter(u => u.perfil === 'TECNICO' || u.perfil === 'ADMIN' || u.perfil === 'SUPERADMIN').map(u => (
                                        <option key={u.id} value={u.id}>{u.nome}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Descrição do Problema */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <AlertCircle size={14} className="text-red-500" /> Descrição do Defeito / Solicitação *
                                </label>
                                <textarea 
                                    required 
                                    name="descricaoProblema" 
                                    value={formData.descricaoProblema} 
                                    onChange={handleChange} 
                                    rows={4} 
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                                    placeholder="Descreva detalhadamente o que houve..." 
                                />
                            </div>

                            {/* Seção: Fotos */}
                            <div className="md:col-span-2 space-y-4">
                                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Camera size={14} className="text-blue-500" /> Fotos do Equipamento / Problema
                                </label>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {formData.fotos.map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50">
                                            <img src={url} alt={`Foto ${idx}`} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setPreviewPhoto(url)} />
                                            <button 
                                                type="button" 
                                                onClick={() => setFormData(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== idx) }))}
                                                className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-xl transition-all shadow-sm z-10"
                                            >
                                                <X size={14} />
                                            </button>
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                <ZoomIn size={24} className="text-white" />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Upload */}
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

                                    {/* Câmera */}
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
                            </div>

                        </div>

                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                             <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                             <div className="text-xs text-amber-800 leading-relaxed">
                                 A numeração da OS será gerada automaticamente pelo sistema com o prefixo **ATI**. 
                                 Peças do estoque poderão ser adicionadas no momento do encerramento da manutenção através do laudo técnico.
                             </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-100">
                        <Link href="/suporte/ati/os" className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancelar</Link>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ClipboardList size={20} />}
                            Abrir Ordem de Serviço
                        </button>
                    </div>
                </form>

                {/* Camera Modal */}
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

                {/* Photo Preview Overlay */}
                {previewPhoto && (
                    <ImageOverlay 
                        src={previewPhoto} 
                        onClose={() => setPreviewPhoto(null)} 
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
