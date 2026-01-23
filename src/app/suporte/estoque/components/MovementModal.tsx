import { useState } from "react";
import { X, ArrowDownLeft, ArrowUpRight, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";

interface MovementModalProps {
    onClose: () => void;
    onSuccess: () => void;
    product: any; // ItemEstoque
    initialType?: 'ENTRADA' | 'SAIDA';
}

export default function MovementModal({ onClose, onSuccess, product, initialType = 'ENTRADA' }: MovementModalProps) {
    const [tipo, setTipo] = useState<'ENTRADA' | 'SAIDA' | 'AJUSTE'>(initialType);
    const [formData, setFormData] = useState({
        quantidade: 1,
        origem: initialType === 'ENTRADA' ? 'COMPRA' : 'OS',
        docReferencia: "",
        observacoes: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/suporte/estoque/movimentacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemId: product.id,
                    tipo,
                    quantidade: formData.quantidade,
                    origem: formData.origem,
                    docReferencia: formData.docReferencia,
                    observacoes: formData.observacoes,
                    usuario: 'Sistema' // TODO: Pegar user real
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Erro ao registrar");
            }

            toast.success("Movimentação registrada com sucesso!");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Registrar Movimentação</h2>
                        <p className="text-sm text-gray-500">{product.nome}</p>
                    </div>
                    <button onClick={onClose}><X className="text-gray-400 hover:text-gray-600" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* TIPO SEAL */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
                        <button type="button" onClick={() => { setTipo('ENTRADA'); setFormData(p => ({...p, origem: 'COMPRA'})); }}
                            className={`flex items-center justify-center gap-1 py-2 text-sm font-bold rounded-md transition-all ${tipo === 'ENTRADA' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            <ArrowDownLeft size={16} /> Entrada
                        </button>
                        <button type="button" onClick={() => { setTipo('SAIDA'); setFormData(p => ({...p, origem: 'OS'})); }}
                            className={`flex items-center justify-center gap-1 py-2 text-sm font-bold rounded-md transition-all ${tipo === 'SAIDA' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            <ArrowUpRight size={16} /> Saída
                        </button>
                        <button type="button" onClick={() => { setTipo('AJUSTE'); setFormData(p => ({...p, origem: 'INVENTARIO'})); }}
                            className={`flex items-center justify-center gap-1 py-2 text-sm font-bold rounded-md transition-all ${tipo === 'AJUSTE' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            <RefreshCw size={16} /> Ajuste
                        </button>
                    </div>

                    {/* CAMPOS */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade ({product.unidade || 'un'})</label>
                        <input type="number" min="1" required className="w-full p-2 border rounded-lg text-lg font-bold text-center"
                            value={formData.quantidade} onChange={e => setFormData({...formData, quantidade: Number(e.target.value)})} />
                        {tipo === 'SAIDA' && (
                            <p className="text-xs text-right mt-1 text-gray-500">Disponível: {product.quantidade}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Origem / Motivo</label>
                            <select className="w-full p-2 border rounded-lg text-sm" value={formData.origem} onChange={e => setFormData({...formData, origem: e.target.value})}>
                                {tipo === 'ENTRADA' && <>
                                    <option value="COMPRA">Compra</option>
                                    <option value="DEVOLUCAO">Devolução</option>
                                    <option value="BRINDE">Bonificação</option>
                                </>}
                                {tipo === 'SAIDA' && <>
                                    <option value="OS">Uso em OS</option>
                                    <option value="VENDA">Venda Direta</option>
                                    <option value="PERDA">Perda / Quebra</option>
                                    <option value="USO_INTERNO">Uso Interno</option>
                                </>}
                                {tipo === 'AJUSTE' && <>
                                    <option value="INVENTARIO">Inventário</option>
                                    <option value="CORRECAO">Correção Saldo</option>
                                </>}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Doc. Referência</label>
                            <input type="text" className="w-full p-2 border rounded-lg text-sm" placeholder="Nota fiscal, OS..."
                                value={formData.docReferencia} onChange={e => setFormData({...formData, docReferencia: e.target.value})} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                        <textarea rows={2} className="w-full p-2 border rounded-lg text-sm resize-none" placeholder="Detalhes adicionais..."
                            value={formData.observacoes} onChange={e => setFormData({...formData, observacoes: e.target.value})} />
                    </div>

                    <button type="submit" disabled={submitting} className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${
                        tipo === 'ENTRADA' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                        tipo === 'SAIDA' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' :
                        'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                    }`}>
                        {submitting ? "Registrando..." : "Confirmar Movimentação"}
                    </button>

                </form>
            </div>
        </div>
    )
}
