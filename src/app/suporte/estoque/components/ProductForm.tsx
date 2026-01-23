"use client";

import { useState, useEffect } from "react";
import { X, Save, Barcode, DollarSign, Package, Truck, AlertTriangle, Box, Layers, Tag } from "lucide-react";
import { toast } from "sonner";

interface ProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
    existingProduct?: any;
}

export default function ProductForm({ onClose, onSuccess, existingProduct }: ProductFormProps) {
    const [formData, setFormData] = useState({
        codigo: "",
        codigoBarras: "",
        nome: "",
        descricao: "",
        marca: "",
        modelo: "",
        categoria: "",
        unidade: "un",
        minimo: 0,
        custoMedio: "",
        valorVenda: "",
        fornecedorPrincipal: "",
        localizacao: "",
        quantidade: 0,
        fotos: [] as string[],
        rastreavel: false,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (existingProduct) {
            setFormData({
                codigo: existingProduct.codigo || "",
                codigoBarras: existingProduct.codigoBarras || "",
                nome: existingProduct.nome,
                descricao: existingProduct.descricao || "",
                marca: existingProduct.marca || "",
                modelo: existingProduct.modelo || "",
                categoria: existingProduct.categoria || "",
                unidade: existingProduct.unidade || "un",
                minimo: existingProduct.minimo,
                custoMedio: existingProduct.custoMedio ? existingProduct.custoMedio.toString() : "",
                valorVenda: existingProduct.valorVenda ? existingProduct.valorVenda.toString() : (existingProduct.valorUnit ? existingProduct.valorUnit.toString() : ""),
                fornecedorPrincipal: existingProduct.fornecedorPrincipal || (existingProduct.fornecedor || ""),
                localizacao: existingProduct.localizacao || "",
                quantidade: existingProduct.quantidade,
                fotos: existingProduct.fotos || [],
                rastreavel: !!existingProduct.rastreavel
            });
        }
    }, [existingProduct]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        
        // Auto-SKU Logic
        if (name === 'nome' && !existingProduct) {
            const currentSku = formData.codigo;
            // Generate SKU from current input value
            const generated = generateSku(value);
            // If SKU is empty OR matches what we would generate for the PREVIOUS name (heuristic), update it.
            // Simplified: If SKU is empty, auto-fill.
            // If user manually edited SKU, don't touch it. 
            // We can check if "currentSku" is empty.
            if (currentSku === "" || currentSku === generateSku(formData.nome)) {
                 setFormData(prev => ({ ...prev, [name]: value, codigo: generated }));
                 return;
            }
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const generateSku = (name: string) => {
        if (!name) return "";
        return name
            .toUpperCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Z0-9 ]/g, "")
            .split(" ")
            .filter(w => w.length > 1 && !["DE", "DO", "DA", "E", "COM", "PARA"].includes(w)) // Ignore stopwords
            .map(w => w.substring(0, 3))
            .join("-");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        console.log("Submit Iniciado - Payload:", formData);
        try {
            const url = existingProduct 
                ? `/api/suporte/estoque/produtos/${existingProduct.id}`
                : `/api/suporte/estoque`;
            
            const method = existingProduct ? 'PUT' : 'POST';
            
            const payload = { ...formData };
            if (existingProduct) (payload as any).id = existingProduct.id;

            console.log(`Enviando ${method} para ${url}...`);
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const responseData = await res.json();
            console.log("Resposta da API:", responseData);

            if (!res.ok) {
                throw new Error(responseData.error || "Erro ao salvar produto");
            }
            
            toast.success(existingProduct ? "Produto atualizado!" : "Produto cadastrado!");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Erro ao salvar. Verifique os dados.");
            console.error("Erro no Submit:", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-100">
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    {/* Header */}
                    <div className="flex-none flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Package className="w-6 h-6 text-amber-600" />
                            {existingProduct ? "Editar Produto" : "Novo Produto"}
                        </h2>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto bg-white p-5 sm:p-8 [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent]">
                        <div className="space-y-10 pb-10">
                            
                            {/* IDENTIFICAÇÃO & TÉCNICO */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                                    <Tag size={16} /> Identificação & Especificações
                                </h3>
                                
                                {/* IMAGENS DO PRODUTO */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fotos do Produto (Catálogo)</label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {formData.fotos.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-50">
                                                <img src={url} alt={`Produto ${idx}`} className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== idx) }))}
                                                    className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-all text-gray-400 hover:text-amber-600">
                                            <Truck size={24} className="mb-1" />
                                            <span className="text-[10px] font-medium text-center px-1 leading-tight">Adicionar Foto</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        console.log("Iniciando upload de:", file.name);
                                                        const d = new FormData();
                                                        d.append("file", file);
                                                        try {
                                                            const res = await fetch("/api/upload", { method: "POST", body: d });
                                                            const json = await res.json();
                                                            console.log("Resultado upload:", json);
                                                            if (!res.ok) throw new Error(json.error || "Upload failed");
                                                            if (json.url) {
                                                                setFormData(prev => ({ ...prev, fotos: [...prev.fotos, json.url] }));
                                                                toast.success("Foto adicionada!");
                                                            }
                                                        } catch (err: any) {
                                                            toast.error("Erro no upload: " + err.message);
                                                            console.error("Erro no upload:", err);
                                                        }
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
                                        <input required name="nome" value={formData.nome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ex: Cabo HDMI 2m" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                                        <input name="marca" value={formData.marca} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ex: Dell" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                                        <input name="modelo" value={formData.modelo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ex: G700" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                        <input 
                                            name="categoria" 
                                            list="categorias-list"
                                            value={formData.categoria} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                                            placeholder="Selecione ou digite..." 
                                        />
                                        <datalist id="categorias-list">
                                            <option value="Hardware (Desktops/Notebooks)" />
                                            <option value="Periféricos (Teclado/Mouse)" />
                                            <option value="Monitores & Vídeo" />
                                            <option value="Rede & Conectividade" />
                                            <option value="Componentes (RAM/HD/SSD)" />
                                            <option value="Impressão & Consumíveis" />
                                            <option value="Cabos & Adaptadores" />
                                            <option value="Licenças & Software" />
                                            <option value="Ferramentas" />
                                        </datalist>
                                    </div>

                                    <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.rastreavel ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <Barcode size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.rastreavel} 
                                                    onChange={e => setFormData(prev => ({ ...prev, rastreavel: e.target.checked }))}
                                                    className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                                                />
                                                <span className="text-sm font-bold text-gray-800">Rastreável por Serial?</span>
                                            </label>
                                            <p className="text-[10px] text-gray-500 leading-tight">Cada unidade terá um número de série/patrimônio único.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código Interno (SKU)</label>
                                        <div className="relative">
                                            <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input name="codigo" value={formData.codigo} onChange={handleChange} className="w-full pl-9 p-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="SKU-123" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código de Barras (EAN)</label>
                                        <div className="relative">
                                            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input name="codigoBarras" value={formData.codigoBarras} onChange={handleChange} className="w-full pl-9 p-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="789..." />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
                                        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Detalhes técnicos, especificações..." />
                                    </div>
                                </div>
                            </section>

                            {/* ESTOQUE */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                                    <Layers size={16} /> Estoque
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Qtd Atual</label>
                                        <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50" readOnly={!!existingProduct} title={existingProduct ? "Use movimentações para alterar" : ""} />
                                        {existingProduct && <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Ajuste via Movimentação</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                                        <input type="number" name="minimo" value={formData.minimo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                                        <select name="unidade" value={formData.unidade} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none">
                                            <option value="un">Unidade (un)</option>
                                            <option value="cx">Caixa (cx)</option>
                                            <option value="kg">Quilo (kg)</option>
                                            <option value="m">Metro (m)</option>
                                            <option value="l">Litro (l)</option>
                                            <option value="kit">Kit</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                                        <input name="localizacao" value={formData.localizacao} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Prateleira A1" />
                                    </div>
                                </div>
                            </section>

                            {/* FINANCEIRO & FORNECEDOR */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                                    <DollarSign size={16} /> Financeiro & Fornecedor
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Custo Médio (R$)</label>
                                        <input type="number" step="0.01" name="custoMedio" value={formData.custoMedio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço Venda (R$)</label>
                                        <input type="number" step="0.01" name="valorVenda" value={formData.valorVenda} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg font-bold text-green-700 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor Principal</label>
                                        <div className="relative">
                                            <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input name="fornecedorPrincipal" value={formData.fornecedorPrincipal} onChange={handleChange} className="w-full pl-9 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Nome empresa" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-none p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancelar</button>
                        <button type="submit" disabled={saving} className="px-8 py-2.5 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 shadow-lg shadow-amber-200 active:scale-95 transition-all flex items-center gap-2">
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                            Salvar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

