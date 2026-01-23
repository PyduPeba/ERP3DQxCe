"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import { Package, Plus, ArrowUpRight, ArrowDownLeft, AlertTriangle, Search, Upload, Barcode } from "lucide-react";
import { useState, useEffect } from "react";

type ItemEstoque = {
  id: number;
  codigo?: string;
  codigoBarras?: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  unidade?: string;
  quantidade: number;
  minimo: number;
  valorVenda?: number; // antigo valorUnit
  custoMedio?: number;
  fornecedorPrincipal?: string;
  localizacao?: string;
};

import ProductForm from "./components/ProductForm";
import MovementModal from "./components/MovementModal";
import ImportModal from "./components/ImportModal";

export default function EstoquePage() {
  const [itens, setItens] = useState<ItemEstoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemEstoque | null>(null);
  const [movementType, setMovementType] = useState<'ENTRADA' | 'SAIDA'>('ENTRADA');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    try {
      const res = await fetch("/api/suporte/estoque");
      const data = await res.json();
      if (Array.isArray(data)) {
          setItens(data);
      } else {
          console.error("API Error:", data);
          setItens([]);
      }
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setItens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ItemEstoque) => {
      setSelectedItem(item);
      setShowProductModal(true);
  }

  const handleMovement = (item: ItemEstoque, type: 'ENTRADA' | 'SAIDA') => {
      setSelectedItem(item);
      setMovementType(type);
      setShowMovementModal(true);
  }

  const filteredItens = itens.filter(i => 
      i.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (i.codigo && i.codigo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (i.categoria && i.categoria.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItens = itens.length;
  const itensEstoqueBaixo = itens.filter(i => i.quantidade <= i.minimo).length;
  const valorTotal = itens.reduce((acc, i) => acc + (i.valorVenda || 0) * i.quantidade, 0);

  return (
    <PermissionGuard module="GESTAO">
        <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
            <p className="text-gray-500">Gestão de peças, produtos, entradas e saídas</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <button onClick={() => setShowImportModal(true)} className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm shadow-sm">
              <Upload className="w-4 h-4 text-blue-500" />
              Importar
            </button>
            <button onClick={() => { setSelectedItem(null); setShowProductModal(true); }} className="w-full sm:w-auto bg-amber-600 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors text-sm shadow-lg shadow-amber-900/10 font-bold uppercase tracking-wider">
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Total em Estoque</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{totalItens} items</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Estoque Mínimo atingido</p>
            <p className="text-2xl font-bold mt-1 text-amber-600">{itensEstoqueBaixo}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Valor Total</p>
            <p className="text-2xl font-bold mt-1 text-purple-600">R$ {valorTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, nome ou categoria..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Items List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Carregando itens...</p>
          </div>
        ) : itens.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Estoque vazio</h2>
            <p className="text-gray-500 max-w-sm mt-2">
              Cadastre suas peças e equipamentos para começar o controle de movimentações.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                <table className="w-full min-w-[1000px] sm:min-w-0">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Item</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Código</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoria</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Quantidade</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Mínimo</th>
                      <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Valor Unit.</th>
                      <th className="text-right p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItens.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-all group animate-in fade-in slide-in-from-left-2 duration-300">
                        <td className="p-4" onClick={() => handleEdit(item)}>
                           <div className="flex items-center gap-3 cursor-pointer">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 shadow-inner">
                                    {item.fotos && item.fotos.length > 0 ? (
                                        <img src={item.fotos[0]} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Package size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="max-w-[200px]">
                                    <div className="font-bold text-gray-900 flex items-center gap-2 truncate">
                                        {item.nome}
                                        {item.rastreavel && (
                                            <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-0.5 shrink-0">
                                                <Barcode size={8} /> RASTREÁVEL
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-tighter truncate">{item.marca} {item.modelo}</div>
                                </div>
                           </div>
                        </td>
                        <td className="p-4 text-sm font-mono text-[10px] text-gray-500">{item.codigo || item.codigoBarras || "-"}</td>
                        <td className="p-4">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-200">
                                {item.categoria || "N/A"}
                            </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-black px-2 py-1 rounded-md text-[10px] uppercase tracking-widest ${item.quantidade <= item.minimo ? "bg-red-100 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                              {item.quantidade} {item.unidade}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-gray-400 font-bold">{item.minimo}</td>
                        <td className="p-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                          {item.valorVenda ? `R$ ${item.valorVenda.toFixed(2)}` : "-"}
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-1 justify-end">
                                <button onClick={() => handleMovement(item, 'ENTRADA')} title="Registrar Entrada" className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors border border-transparent hover:border-emerald-200"><ArrowDownLeft size={16} /></button>
                                <button onClick={() => handleMovement(item, 'SAIDA')} title="Registrar Saída" className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-200"><ArrowUpRight size={16} /></button>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        )}
        
        {/* Modals */}
        {showProductModal && (
            <ProductForm 
                onClose={() => { setShowProductModal(false); setSelectedItem(null); }} 
                onSuccess={fetchItens}
                existingProduct={selectedItem}
            />
        )}
        {showMovementModal && selectedItem && (
            <MovementModal
                onClose={() => { setShowMovementModal(false); setSelectedItem(null); }}
                onSuccess={fetchItens}
                product={selectedItem}
                initialType={movementType}
            />
        )}
        {showImportModal && (
            <ImportModal 
                onClose={() => setShowImportModal(false)}
                onSuccess={fetchItens}
            />
        )}
      </div>
        </DashboardLayout>
    </PermissionGuard>
  );
}
