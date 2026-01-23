import { useState } from "react";
import { X, Upload, FileJson, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ImportModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function ImportModal({ onClose, onSuccess }: ImportModalProps) {
    const [jsonContent, setJsonContent] = useState("");
    const [preview, setPreview] = useState<any[] | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{message: string, details: any} | null>(null);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setJsonContent(val);
        setResult(null);
        try {
            if (!val.trim()) { setPreview(null); return; }
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
                setPreview(parsed);
            } else {
                setPreview(null);
            }
        } catch (e) {
            setPreview(null);
        }
    }

    const handleImport = async () => {
        if (!preview) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/suporte/estoque/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preview)
            });
            const data = await res.json();
            
            if (res.ok) {
                toast.success("Importação finalizada!");
                setResult(data); // Show detailed report
                if (data.details.success > 0) onSuccess(); // Refresh list background
            } else {
                toast.error(data.error || "Erro na importação");
            }
        } catch (e) {
            toast.error("Erro de conexão");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-blue-600" /> 
                            Importar Dados
                        </h2>
                        <p className="text-sm text-gray-500">Cole uma lista de produtos em formato JSON</p>
                    </div>
                    <button onClick={onClose}><X className="text-gray-400 hover:text-gray-600" /></button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-4">
                    {!result ? (
                        <>
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-xs text-blue-800 font-mono">
                                <p className="font-bold mb-2">Modelo de JSON esperado:</p>
                                <pre>{`[
  { 
    "nome": "Produto Teste", 
    "codigo": "SKU01", 
    "quantidade": 10, 
    "preco": 99.90,
    "categoria": "Cabos"
  }
]`}</pre>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cole o JSON aqui:</label>
                                <textarea 
                                    className={`w-full h-64 p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 ${preview ? 'border-green-300 bg-green-50/30' : 'border-gray-300'}`}
                                    placeholder="[]"
                                    value={jsonContent}
                                    onChange={handleJsonChange}
                                ></textarea>
                                <div className="flex justify-between mt-2 text-sm">
                                    <span className={preview ? "text-green-600 font-medium" : "text-gray-400"}>
                                        {preview ? <><CheckCircle size={14} className="inline mr-1"/> Validado: {preview.length} itens encontrados</> : "Formato JSON inválido ou vazio"}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className={`p-4 rounded-lg border text-center ${result.details.failed === 0 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                                <h3 className="font-bold text-lg">{result.message}</h3>
                            </div>
                            
                            {result.details.errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle size={16}/> Erros encontrados:</h4>
                                    <ul className="text-xs text-red-700 space-y-1 max-h-40 overflow-y-auto list-disc pl-4">
                                        {result.details.errors.map((err: string, idx: number) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    {result ? (
                         <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900">
                             Fechar
                         </button>
                    ) : (
                        <>
                            <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancelar</button>
                            <button 
                                onClick={handleImport} 
                                disabled={!preview || submitting}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
                            >
                                {submitting ? "Processando..." : "Importar Agora"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
