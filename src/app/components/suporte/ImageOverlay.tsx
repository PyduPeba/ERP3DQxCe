"use client";

import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { useState } from "react";

interface ImageOverlayProps {
    src: string;
    onClose: () => void;
    alt?: string;
}

export default function ImageOverlay({ src, onClose, alt = "Preview" }: ImageOverlayProps) {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            {/* Toolbar */}
            <div 
                className="absolute top-6 right-6 flex items-center gap-3 z-10"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleZoomOut}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                    title="Diminuir"
                >
                    <ZoomOut size={20} />
                </button>
                <button 
                    onClick={handleZoomIn}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                    title="Aumentar"
                >
                    <ZoomIn size={20} />
                </button>
                <button 
                    onClick={handleRotate}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                    title="Girar"
                >
                    <RotateCw size={20} />
                </button>
                <button 
                    onClick={onClose}
                    className="ml-2 p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors shadow-lg shadow-red-900/20"
                    title="Fechar"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Image Container */}
            <div 
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <img 
                    src={src} 
                    alt={alt}
                    className="max-w-full max-h-full object-contain transition-all duration-300 shadow-2xl"
                    style={{ 
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    }}
                />
            </div>

            {/* Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                Clique fora para fechar • Use os controles acima
            </div>
        </div>
    );
}
