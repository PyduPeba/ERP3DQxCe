"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import ThreeScene from "../components/ThreeScene";
import * as THREE from "three";
import { FontLoader, TextGeometry, STLExporter } from "three-stdlib";
import { CSG } from "three-csg-ts";
import { motion } from "framer-motion";
import { Dog, Download, Save, RefreshCw, Heart, Star } from "lucide-react";
import { toast } from "sonner";

export default function TagsPetPage() {
    const [name, setName] = useState("REX");
    const [phone, setPhone] = useState("11 99999-9999");
    const [shape, setShape] = useState("Bone");
    const [thickness, setThickness] = useState(3);
    const [mesh, setMesh] = useState<THREE.Object3D | null>(null);
    const [generating, setGenerating] = useState(false);
    
    const fontUrl = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json";

    const generate3D = useCallback(async () => {
        setGenerating(true);
        const loader = new FontLoader();
        
        loader.load(fontUrl, (font) => {
            try {
                const group = new THREE.Group();
                
                // 1. Create Base Shape
                let baseShape = new THREE.Shape();
                if (shape === "Bone") {
                    // Simplified Bone Shape
                    const r = 5;
                    baseShape.moveTo(-15, 0);
                    baseShape.absarc(-15, 5, r, Math.PI, 0, false);
                    baseShape.absarc(-15, -5, r, 0, Math.PI, false);
                    baseShape.lineTo(15, -10);
                    baseShape.absarc(15, -5, r, -Math.PI, 0, false);
                    baseShape.absarc(15, 5, r, 0, Math.PI, false);
                    baseShape.lineTo(-15, 10);
                } else if (shape === "Heart") {
                    const x = 0, y = 0;
                    baseShape.moveTo( x + 5, y + 5 );
                    baseShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
                    baseShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
                    baseShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
                    baseShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
                    baseShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
                    baseShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
                } else {
                    // Oval
                    baseShape.ellipse(0, 0, 20, 12, 0, Math.PI * 2, false, 0);
                }

                const extrudeSettings = { depth: thickness, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 0.5, bevelSegments: 3 };
                const baseGeo = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
                const baseMat = new THREE.MeshStandardMaterial({ color: 0xef4444 }); // red-500
                const baseMesh = new THREE.Mesh(baseGeo, baseMat);
                
                // Center base
                baseGeo.computeBoundingBox();
                const bCenter = baseGeo.boundingBox!.getCenter(new THREE.Vector3());
                baseMesh.position.x = -bCenter.x;
                baseMesh.position.y = -bCenter.y;
                group.add(baseMesh);

                const nameMat = new THREE.MeshStandardMaterial({ color: 0xffffff });

                // 2. Name Text
                const nameGeo = new TextGeometry(name, { font: font, size: 6, height: 1.5 });
                const nameMesh = new THREE.Mesh(nameGeo, nameMat);
                nameGeo.computeBoundingBox();
                nameMesh.position.x = -nameGeo.boundingBox!.max.x / 2;
                nameMesh.position.y = 1;
                nameMesh.position.z = thickness;
                group.add(nameMesh);

                // 3. Phone Text
                const phoneGeo = new TextGeometry(phone, { font: font, size: 3, height: 1 });
                const phoneMesh = new THREE.Mesh(phoneGeo, nameMat);
                phoneGeo.computeBoundingBox();
                phoneMesh.position.x = -phoneGeo.boundingBox!.max.x / 2;
                phoneMesh.position.y = -5;
                phoneMesh.position.z = thickness;
                group.add(phoneMesh);

                setMesh(group);
                setGenerating(false);
                toast.success("Tag PET gerada!");
            } catch (err) {
                console.error("Erro na criação da geometria:", err);
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
    }, [name, phone, shape, thickness]);

    useEffect(() => {
        generate3D();
    }, [generate3D]);

    return (
        <PermissionGuard module="ESTUDIO">
            <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-6 pb-12">
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
                            <Dog size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Gerador Tags PET</h1>
                            <p className="text-gray-500 text-sm italic">Estilo e segurança para os pets</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Nome do Pet</label>
                                    <input value={name} onChange={(e) => setName(e.target.value.toUpperCase())} className="w-full px-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20 outline-none font-bold text-lg" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Telefone</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-6 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-500/20 outline-none font-medium" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Formato</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["Bone", "Heart", "Oval"].map(s => (
                                            <button key={s} onClick={() => setShape(s)} className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${shape === s ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'}`}>
                                                {s === "Bone" ? "Osso" : s === "Heart" ? "Coração" : "Oval"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={generate3D} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                                Atualizar Design
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-gray-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-[500px]">
                        <ThreeScene mesh={mesh} />
                        <div className="absolute top-6 right-6 flex gap-2">
                            <button className="p-3 bg-white/10 backdrop-blur rounded-2xl text-white hover:bg-white/20 transition-all">
                                <RefreshCw size={20} className={generating ? 'animate-spin' : ''} />
                            </button>
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                             <button className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-red-500/40 hover:scale-105 transition-all flex items-center gap-3">
                                <Download size={20} /> BAIXAR STL
                             </button>
                        </div>
                    </div>
                </div>
            </div>
            </DashboardLayout>
        </PermissionGuard>
    );
}
