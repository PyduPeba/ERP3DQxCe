"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import ThreeScene from "../components/ThreeScene";
import * as THREE from "three";
import { FontLoader, TextGeometry, STLExporter } from "three-stdlib";
import { CSG } from "three-csg-ts";
import { motion } from "framer-motion";
import { Download, Save, RefreshCw, Key, Type } from "lucide-react";
import { toast } from "sonner";

export default function ChaveirosPage() {
    const [text, setText] = useState("KAYK");
    const [fontSize, setFontSize] = useState(20);
    const [thickness, setThickness] = useState(4);
    const [mesh, setMesh] = useState<THREE.Object3D | null>(null);
    const [generating, setGenerating] = useState(false);
    
    // We'll load a font from a CDN for now
    const fontUrl = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json";

    const generate3D = async () => {
        setGenerating(true);
        const loader = new FontLoader();
        
        loader.load(fontUrl, (font) => {
            try {
                // 1. Create Text
                const textGeo = new TextGeometry(text, {
                    font: font,
                    size: fontSize,
                    height: thickness,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.5,
                    bevelSize: 0.3,
                    bevelOffset: 0,
                    bevelSegments: 5
                } as any);
                textGeo.computeBoundingBox();
                const centerOffset = -0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);
                
                const textMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
                const textMesh = new THREE.Mesh(textGeo, textMaterial);
                textMesh.position.x = centerOffset;
                
                // 2. Create Base (Rounded Box around text)
                const padding = 5;
                const width = (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x) + padding * 2;
                const height = (textGeo.boundingBox!.max.y - textGeo.boundingBox!.min.y) + padding * 2;
                
                const baseGeo = new THREE.BoxGeometry(width, height, thickness / 2);
                const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b });
                const baseMesh = new THREE.Mesh(baseGeo, baseMaterial);
                baseMesh.position.z = -thickness / 4;
                baseMesh.position.y = (textGeo.boundingBox!.max.y + textGeo.boundingBox!.min.y) / 2;

                // 3. Automatic Hole (CSG)
                const holeRadius = 2.5;
                const holeGeo = new THREE.CylinderGeometry(holeRadius, holeRadius, thickness * 2, 32);
                const holeMesh = new THREE.Mesh(holeGeo);
                holeMesh.position.set(-width / 2 + padding / 2, baseMesh.position.y, 0);
                holeMesh.rotation.x = Math.PI / 2;

                baseMesh.updateMatrix();
                holeMesh.updateMatrix();
                
                const baseCSG = CSG.fromMesh(baseMesh);
                const holeCSG = CSG.fromMesh(holeMesh);
                const finalBaseCSG = baseCSG.subtract(holeCSG);
                const finalBaseMesh = CSG.toMesh(finalBaseCSG, baseMesh.matrix, baseMaterial);

                const group = new THREE.Group();
                group.add(textMesh);
                group.add(finalBaseMesh);
                
                setMesh(group);
                setGenerating(false);
                toast.success("Modelo 3D gerado!");
            } catch (err) {
                console.error("Erro na criação do chaveiro:", err);
                setGenerating(false);
                toast.error("Erro ao processar modelo 3D.");
                setMesh(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshStandardMaterial({ color: 0xff0000 })));
            }
        }, 
undefined, (err) => {
            console.error("Erro ao carregar fonte:", err);
            setGenerating(false);
            toast.error("Erro ao carregar fonte 3D.");
        });
    };

    useEffect(() => {
        generate3D();
    }, []);

    const exportSTL = () => {
        if (!mesh) return;
        const exporter = new STLExporter();
        const str = exporter.parse(mesh);
        const blob = new Blob([str], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `chaveiro_${text}.stl`;
        link.click();
        toast.info("Exportação STL iniciada.");
    };

    return (
        <PermissionGuard module="ESTUDIO">
            <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Key className="text-amber-500" />
                            Gerador de Chaveiros 3D
                        </h1>
                        <p className="text-gray-500">Crie e exporte modelos para impressão 3D</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={exportSTL} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all font-semibold">
                            <Download size={18} /> STL
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold">
                            <Save size={18} /> Salvar no Pedido
                        </button>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
                    {/* PREVIEW */}
                    <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                        <ThreeScene mesh={mesh} />
                        {generating && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* CONTROLS */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 overflow-y-auto">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Type size={18} className="text-blue-600" />
                            Parâmetros
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Texto</label>
                                <input 
                                    value={text} 
                                    onChange={(e) => setText(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none" 
                                    placeholder="NOME"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Tamanho da Fonte ({fontSize}mm)</label>
                                <input 
                                    type="range" min="10" max="100" 
                                    value={fontSize} 
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Espessura ({thickness}mm)</label>
                                <input 
                                    type="range" min="1" max="20" 
                                    value={thickness} 
                                    onChange={(e) => setThickness(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={generate3D}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                        >
                            <RefreshCw size={18} /> Atualizar Preview
                        </button>

                        <div className="pt-6 border-t border-gray-100">
                             <p className="text-[10px] text-gray-400 leading-tight">
                                Nota: O furo é posicionado automaticamente para melhor equilíbrio do chaveiro.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
            </DashboardLayout>
        </PermissionGuard>
    );
}
