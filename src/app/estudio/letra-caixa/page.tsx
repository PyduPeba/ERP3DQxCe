"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ThreeScene from "../components/ThreeScene";
import * as THREE from "three";
import { STLLoader, FontLoader, TextGeometry } from "three-stdlib";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Save, RefreshCw, Box, Sliders, Info, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

export default function LetraCaixaPage() {
    // Parameters
    const [palavra, setPalavra] = useState("3D");
    const [tamanhoFonte, setTamanhoFonte] = useState(50);
    const [espacoChars, setEspacoChars] = useState(-1.5); // Valor padrão para conectar letras
    const [espessuraLetra, setEspessuraLetra] = useState(10);
    const [espessuraTampa, setEspessuraTampa] = useState(1);
    const [espessuraBase, setEspessuraBase] = useState(2);
    const [larguraBorda, setLarguraBorda] = useState(1);
    const [larguraDegrau, setLarguraDegrau] = useState(0.8);
    const [tolerancia, setTolerancia] = useState(0.2);
    const [parteExibir, setParteExibir] = useState("Completo");

    // UI & 3D State
    const [mesh, setMesh] = useState<THREE.Object3D | null>(null);
    const [generating, setGenerating] = useState(false);
    const [isDraft, setIsDraft] = useState(true);
    const lastRequest = useRef<string>("");
    const stlCache = useRef<{ params: string, buffer: ArrayBuffer } | null>(null);

    // 1. Geração de Preview Local (Rápida - Draft Mode)
    const generateLocalPreview = useCallback(async () => {
        setIsDraft(true);
        const group = new THREE.Group();
        const fontLoader = new FontLoader();
        
        try {
            const font = await fontLoader.loadAsync('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json');
            
            const boxMat = new THREE.MeshStandardMaterial({ 
                color: 0xca8a04, 
                transparent: true, 
                opacity: 0.8,
                metalness: 0.2,
                roughness: 0.5
            });

            const lidMat = new THREE.MeshStandardMaterial({ 
                color: 0xe0f2fe, // Azul clarinho para a tampa
                transparent: true, 
                opacity: 0.9,
                metalness: 0.3,
                roughness: 0.3
            });

            const wallMat = new THREE.MeshStandardMaterial({ 
                color: 0xca8a04,
                side: THREE.DoubleSide
            });

            let offsetX = 0;
            const letters = palavra.split("");
            
            // Calculamos o centro total primeiro
            let totalWidth = 0;
            const letterGeos: THREE.BufferGeometry[] = [];
            const spacingVal = (espacoChars * (tamanhoFonte / 10));
            
            letters.forEach((char, i) => {
                const geo = new TextGeometry(char, {
                    font: font,
                    size: tamanhoFonte,
                    height: 1,
                    curveSegments: 4
                });
                geo.computeBoundingBox();
                const width = geo.boundingBox ? geo.boundingBox.max.x - geo.boundingBox.min.x : tamanhoFonte * 0.6;
                totalWidth += width;
                if (i < letters.length - 1) totalWidth += spacingVal;
                letterGeos.push(geo);
            });

            offsetX = -totalWidth / 2;

            letters.forEach((char, i) => {
                const charGroup = new THREE.Group();
                const charWidth = letterGeos[i].boundingBox ? letterGeos[i].boundingBox.max.x - letterGeos[i].boundingBox.min.x : 0;

                // 1. Base (Sólida)
                if (parteExibir !== "Letra") {
                    const baseGeo = new TextGeometry(char, {
                        font: font,
                        size: tamanhoFonte,
                        height: espessuraBase,
                        curveSegments: 6
                    });
                    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
                    charGroup.add(baseMesh);

                    // 2. Paredes (Simulamos o oco)
                    const wallGeo = new TextGeometry(char, {
                        font: font,
                        size: tamanhoFonte,
                        height: espessuraLetra,
                        curveSegments: 6
                    });
                    const wallMesh = new THREE.Mesh(wallGeo, boxMat);
                    wallMesh.position.z = espessuraBase;
                    charGroup.add(wallMesh);

                    // Furo Visual (Simulação de profundidade)
                    const holeGeo = new TextGeometry(char, {
                        font: font,
                        size: tamanhoFonte,
                        height: espessuraLetra + 0.1,
                        curveSegments: 6
                    });
                    const holeMat = new THREE.MeshBasicMaterial({ color: 0x221100, transparent: true, opacity: 0.6 });
                    const holeMesh = new THREE.Mesh(holeGeo, holeMat);
                    
                    // Escala baseada no larguraDegrau (aproximado)
                    const holeScale = Math.max(0.7, 1 - (larguraDegrau / 5));
                    holeMesh.scale.set(holeScale, holeScale, 1);
                    
                    // Centraliza o furo na letra
                    holeMesh.position.x = charWidth * (1 - holeScale) / 2;
                    holeMesh.position.y = tamanhoFonte * (1 - holeScale) / 2;
                    holeMesh.position.z = espessuraBase + 0.2;
                    
                    charGroup.add(holeMesh);
                }

                // 3. Tampa
                if (parteExibir === "Completo" || parteExibir === "Borda" || parteExibir === "Letra") {
                    const lidGeo = new TextGeometry(char, {
                        font: font,
                        size: tamanhoFonte,
                        height: espessuraTampa,
                        curveSegments: 6
                    });
                    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
                    
                    if (parteExibir === "Letra") {
                        charGroup.add(lidMesh);
                    } else {
                        lidMesh.position.z = espessuraBase + espessuraLetra;
                        if (parteExibir === "Borda") lidMesh.position.z += 10;
                        charGroup.add(lidMesh);
                    }
                }

                charGroup.position.x = offsetX;
                group.add(charGroup);
                
                offsetX += charWidth + spacingVal;
            });

            group.rotation.x = -Math.PI / 2;
            setMesh(group);
        } catch (e) {
            console.error("Font Load Error", e);
        }
    }, [palavra, tamanhoFonte, espessuraLetra, espessuraBase, espessuraTampa, parteExibir, espacoChars]);

    // 2. Geração Profissional via OpenSCAD (Production Mode)
    const prepararModelo = async () => {
        const currentParams = JSON.stringify({ 
            palavra, tamanhoFonte, espessuraLetra, espessuraTampa, 
            espessuraBase, larguraBorda, larguraDegrau, tolerancia, parteExibir, espacoChars
        });
        
        // Frontend Cache Check
        if (stlCache.current && stlCache.current.params === currentParams) {
            console.log("[Frontend Cache] Reusing last generated buffer");
            toast.success("Recuperado do Cache Local", { duration: 2000 });
            
            const loader = new STLLoader();
            const geometry = loader.parse(stlCache.current.buffer);
            const material = new THREE.MeshStandardMaterial({ color: 0xca8a04, metalness: 0.3, roughness: 0.4 });
            const newMesh = new THREE.Mesh(geometry, material);
            newMesh.rotation.x = -Math.PI / 2;
            geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            geometry.boundingBox!.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);

            setMesh(newMesh);
            setIsDraft(false);
            return;
        }

        setGenerating(true);
        const toastId = toast.loading("Calculando Geometria Industrial...");

        try {
            const response = await fetch('/api/estudio/generate-stl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: currentParams
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Erro na geração do STL");
            }

            const xCache = response.headers.get('X-Cache');
            const arrayBuffer = await response.arrayBuffer();
            
            // Save to Frontend Cache
            stlCache.current = { params: currentParams, buffer: arrayBuffer };

            const loader = new STLLoader();
            const geometry = loader.parse(arrayBuffer);
            
            const material = new THREE.MeshStandardMaterial({ 
                color: 0xca8a04,
                metalness: 0.3,
                roughness: 0.4
            });

            const newMesh = new THREE.Mesh(geometry, material);
            newMesh.rotation.x = -Math.PI / 2;
            
            geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            geometry.boundingBox!.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);

            setMesh(newMesh);
            setIsDraft(false);
            setGenerating(false);
            
            if (xCache === 'HIT') {
                toast.success("Recuperado do Servidor!", { id: toastId });
            } else {
                toast.success("Modelo Industrial Preparado!", { id: toastId });
            }
        } catch (err: any) {
            console.error("3D Error:", err);
            setGenerating(false);
            toast.error(err.message || "Erro no motor CAD", { id: toastId });
        }
    };

    useEffect(() => {
        generateLocalPreview();
    }, [generateLocalPreview]);

    const exportSTL = async () => {
        if (isDraft) {
            toast.error("Clique em PREPARAR antes de exportar.");
            return;
        }
        
        const currentParams = JSON.stringify({ 
            palavra, tamanhoFonte, espessuraLetra, espessuraTampa, 
            espessuraBase, larguraBorda, larguraDegrau, tolerancia, parteExibir, espacoChars
        });

        const toastId = toast.loading("Baixando STL Final...");

        try {
            const response = await fetch('/api/estudio/generate-stl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: currentParams
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `letra_caixa_${palavra}.stl`;
            a.click();
            toast.success("Download Concluído!", { id: toastId });
        } catch (err) {
            toast.error("Erro no download", { id: toastId });
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
                            <Box size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                                Estúdio Letra Caixa
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border uppercase ${isDraft ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                                    {isDraft ? 'Draft Live' : 'Industrial Prep'}
                                </span>
                            </h1>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                {isDraft ? 'Ajuste em tempo real' : 'Geometria de Precisão OpenSCAD'} • Preview Híbrido
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                    {/* VIEWPORT */}
                    <div className="lg:col-span-8 bg-[#f8fafc] rounded-[2rem] border-2 border-dashed border-gray-200 relative overflow-hidden group">
                        <ThreeScene mesh={mesh} />
                        
                        {/* Loading Overlay */}
                        <AnimatePresence>
                            {generating && (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center gap-4">
                                        <Loader2 size={48} className="text-indigo-600 animate-spin" />
                                        <div>
                                            <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest">Calculando Geometria</h4>
                                            <p className="text-xs text-gray-400 font-medium tracking-tight">Motor industrial CAD em execução...</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute top-6 left-6 flex gap-2">
                             <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-tighter shadow-sm flex items-center gap-2">
                                <Info size={14} className="text-indigo-600" /> {isDraft ? 'Visualização de Rascunho' : 'Geometria Final (Oca)'}
                             </div>
                             {!isDraft && (
                                <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm flex items-center gap-2 animate-pulse">
                                    Modelo Pronto
                                </div>
                             )}
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-4 w-full justify-center px-4 font-bold">
                             {isDraft ? (
                                <button 
                                    onClick={prepararModelo} disabled={generating}
                                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl shadow-2xl flex items-center gap-2 hover:bg-indigo-700 transition-all text-sm uppercase tracking-widest hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                    <Play size={20} fill="currentColor" /> Preparar para Impressão
                                </button>
                             ) : (
                                <>
                                    <button 
                                        onClick={exportSTL}
                                        className="bg-gray-900 text-white px-8 py-3 rounded-2xl shadow-2xl flex items-center gap-2 hover:bg-black transition-all text-xs uppercase tracking-widest"
                                    >
                                        <Download size={18} /> Baixar STL Final
                                    </button>
                                    <button 
                                        onClick={() => setIsDraft(true)}
                                        className="bg-white text-gray-900 px-8 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 hover:bg-gray-50 transition-all text-xs uppercase tracking-widest"
                                    >
                                        <RefreshCw size={18} /> Editar Novamente
                                    </button>
                                </>
                             )}
                        </div>
                    </div>

                    {/* PARAMS PANEL */}
                    <div className="lg:col-span-4 bg-white rounded-[2rem] border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest flex items-center gap-2">
                                <Sliders size={16} className="text-indigo-600" /> Ajustes Técnicos
                            </h3>
                        </div>

                        <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Palavra</label>
                                    <input value={palavra} onChange={(e) => setPalavra(e.target.value.toUpperCase())} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-indigo-100 outline-none font-black text-xl text-indigo-900" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tamanho (mm)</label>
                                        <input type="number" value={tamanhoFonte} onChange={(e) => setTamanhoFonte(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-lg border-2 border-gray-50 bg-gray-50 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Espaço Chars</label>
                                        <input type="number" step="0.1" value={espacoChars} onChange={(e) => setEspacoChars(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-lg border-2 border-gray-50 bg-gray-50 outline-none" />
                                    </div>
                                </div>

                                <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Profundidade Total (mm)</label>
                                        <div className="flex gap-4 items-center">
                                            <input type="range" min="1" max="150" value={espessuraLetra} onChange={(e) => setEspessuraLetra(parseInt(e.target.value))} className="flex-1 accent-indigo-600" />
                                            <span className="w-10 text-center font-black text-indigo-600 text-xs">{espessuraLetra}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Esp. Base</label>
                                            <input type="number" step="0.1" value={espessuraBase} onChange={(e) => setEspessuraBase(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white border border-indigo-100 outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Esp. Tampa</label>
                                            <input type="number" step="0.1" value={espessuraTampa} onChange={(e) => setEspessuraTampa(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white border border-indigo-100 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Parede Caixa (mm)</label>
                                        <input type="number" step="0.1" value={larguraBorda} onChange={(e) => setLarguraBorda(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-lg border-2 border-gray-50 bg-gray-50 outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ombro Encaixe (mm)</label>
                                        <input type="number" step="0.1" value={larguraDegrau} onChange={(e) => setLarguraDegrau(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-lg border-2 border-gray-50 bg-gray-50 outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                                        <span>Tolerância Mecânica (mm)</span>
                                        <span className="text-indigo-600">Encaixe Real</span>
                                    </label>
                                    <input type="number" step="0.05" value={tolerancia} onChange={(e) => setTolerancia(parseFloat(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-50 bg-indigo-50/30 outline-none font-bold text-indigo-600" />
                                </div>

                                <div className="space-y-1 pt-2">
                                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Visualização</label>
                                     <select value={parteExibir} onChange={(e) => setParteExibir(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-black text-xs uppercase outline-none">
                                         <option value="Completo">Montagem Final</option>
                                         <option value="Borda">Borda / Caixa Oca</option>
                                         <option value="Letra">Letra de Encaixe</option>
                                     </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
