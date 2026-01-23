"use client";

import { useEffect, useState } from "react";
import { Plus, Search, FileText, Calendar, Check, Trash2, User, ArrowLeft, LayoutDashboard, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import DashboardLayout from "@/app/components/layout/DashboardLayout";

export default function ContratosPage() {
  const [contratos, setContratos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState<any>(null);

  // Form States
  const [step, setStep] = useState(1);
  const [newContrato, setNewContrato] = useState({
      clienteId: "",
      dataInicio: "",
      dataFim: "",
      diaVencimento: "5",
      renovacaoAuto: false,
      observacoes: "",
      itens: [] as any[] // { id, nome, valor }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resContratos, resClientes, resEquipamentos] = await Promise.all([
          fetch("/api/locacao/contratos"),
          fetch("/api/clientes"),
          fetch("/api/locacao/equipamentos?status=DISPONIVEL")
      ]);
      
      const contratosData = await resContratos.json();
      const clientesData = await resClientes.json();
      const equipamentosData = await resEquipamentos.json();

      setContratos(Array.isArray(contratosData) ? contratosData : []);
      setClientes(Array.isArray(clientesData) ? clientesData : []);
      setEquipamentosDisponiveis(Array.isArray(equipamentosData) ? equipamentosData : []);
    } catch (err) {
      console.error("Erro loading data:", err);
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => newContrato.itens.reduce((acc, item) => acc + Number(item.valor), 0);

  const handleSubmit = async () => {
      try {
          const payload = {
              ...newContrato,
              valorTotalMensal: calculateTotal()
          };
          const res = await fetch("/api/locacao/contratos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error);

          toast.success("Contrato criado com sucesso!");
          setShowModal(false);
          fetchData(); // Reload to see new contract and update equipment availability
          setNewContrato({ clienteId: "", dataInicio: "", dataFim: "", diaVencimento: "5", renovacaoAuto: false, observacoes: "", itens: [] });
          setStep(1);
      } catch (err: any) {
          toast.error(err.message);
      }
  }

  const handleAddItem = (eq: any) => {
      if(newContrato.itens.find(i => i.id === eq.id)) return;
      setNewContrato(prev => ({
          ...prev,
          itens: [...prev.itens, { id: eq.id, nome: eq.nome, valor: eq.valorLocacaoBase || 0 }]
      }));
  }

  const handleRemoveItem = (index: number) => {
      const newItens = [...newContrato.itens];
      newItens.splice(index, 1);
      setNewContrato(prev => ({ ...prev, itens: newItens }));
  }

  return (
    <PermissionGuard module="LOCAÇÃO">
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Navigation Header */}
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
          <Link href="/suporte/locacao" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <ArrowLeft size={16} /> Voltar para Dashboard
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <LayoutDashboard size={16} /> Menu Principal
          </Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <FileText className="w-8 h-8 text-indigo-600" />
             Contratos de Locação
           </h1>
           <p className="text-slate-500 text-sm">Gerencie locações ativas e históricos.</p>
        </div>
        <button 
          onClick={() => { setShowModal(true); setStep(1); }}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-3 sm:py-2 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/10 font-bold uppercase tracking-wider transition-all active:scale-95"
        >
          <Plus size={18} /> Novo Contrato
        </button>
      </div>

      {/* Contracts List */}
      <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 animate-pulse">Carregando contratos...</p>
            </div>
          ) : contratos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <FileText className="mx-auto w-12 h-12 text-slate-200 mb-4" />
                <p className="text-slate-400 font-medium">Nenhum contrato ativo.</p>
            </div>
          ) : Array.isArray(contratos) ? contratos.map(c => (
              <div key={c.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 group">
                  <div className="space-y-3 w-full lg:w-auto">
                      <div className="flex items-center justify-between lg:justify-start gap-4">
                          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                <User size={20} />
                              </div>
                              {c.cliente?.nome || "Cliente Desconhecido"}
                          </h3>
                          <span className={`lg:hidden px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${c.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                              {c.status}
                          </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                          <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50">
                              <Calendar size={14} className="text-indigo-400" />
                              <span className="text-xs font-bold font-mono tracking-tighter">
                                {format(new Date(c.dataInicio), 'dd/MM/yyyy')} — {format(new Date(c.dataFim), 'dd/MM/yyyy')}
                              </span>
                          </div>
                          {c.diaVencimento && (
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Vencimento dia {c.diaVencimento}
                            </div>
                          )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                          {c.itens.map((i: any) => (
                              <div key={i.id} className="bg-white text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-indigo-100 shadow-sm flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                  {i.equipamento.nome}
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50 gap-4">
                      <div className="text-left lg:text-right">
                          <div className="text-2xl font-black text-emerald-600 tracking-tighter">
                             R$ {c.valorTotalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                             <span className="text-[10px] uppercase font-black text-slate-400 ml-1">/mês</span>
                          </div>
                          <span className={`hidden lg:inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-1 ${c.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                              {c.status}
                          </span>
                      </div>
                      <button 
                        onClick={() => setSelectedContrato(c)} 
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all rounded-xl text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-200"
                      >
                          <Eye size={16} /> Detalhes
                      </button>
                  </div>
              </div>
          )) : <p className="text-center text-red-500">Erro ao carregar contratos.</p>
          }
      </div>

      {/* Details Modal */}
      {selectedContrato && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-slate-800">Detalhes do Contrato</h2>
                      <button onClick={() => setSelectedContrato(null)} className="text-slate-400 hover:text-slate-600">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="p-6 space-y-6">
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="text-sm text-slate-500">Cliente</div>
                              <div className="font-bold text-lg text-slate-800">{selectedContrato.cliente?.nome}</div>
                          </div>
                          <div className="text-right">
                              <div className="text-sm text-slate-500">Status</div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedContrato.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                  {selectedContrato.status}
                              </span>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                          <div>
                              <div className="text-xs text-slate-500">Data Início</div>
                              <div className="font-medium text-slate-700">{new Date(selectedContrato.dataInicio).toLocaleDateString()}</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-500">Data Fim</div>
                              <div className="font-medium text-slate-700">{new Date(selectedContrato.dataFim).toLocaleDateString()}</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-500">Dia Vencimento</div>
                              <div className="font-medium text-slate-700">Dia {selectedContrato.diaVencimento}</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-500">Valor Mensal</div>
                              <div className="font-medium text-emerald-600">R$ {Number(selectedContrato.valorTotalMensal).toFixed(2)}</div>
                          </div>
                      </div>

                      <div>
                          <h3 className="font-bold text-slate-800 mb-2 border-b pb-1">Equipamentos Locados</h3>
                          <ul className="space-y-2">
                              {selectedContrato.itens.map((item: any) => (
                                  <li key={item.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                                      <span className="font-medium text-slate-700">{item.equipamento.nome}</span>
                                      <span className="text-slate-500 font-mono text-xs">{item.equipamento.numeroSerie}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {selectedContrato.observacoes && (
                          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-800">
                              <span className="font-bold block mb-1">Observações:</span>
                              {selectedContrato.observacoes}
                          </div>
                      )}
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                      {/* Placeholder for future actions like 'Encerrar Contrato' */}
                      <button onClick={() => setSelectedContrato(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 font-medium">
                          Fechar
                      </button>
                  </div>
              </div>
          </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
             
             {/* Header */}
             <div className="bg-indigo-50 p-6 border-b border-indigo-100 flex justify-between items-center">
               <h2 className="text-xl font-bold text-indigo-900">Novo Contrato de Locação</h2>
               <div className="flex gap-2">
                   {[1, 2, 3].map(n => (
                       <div key={n} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === n ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-600'}`}>
                           {n}
                       </div>
                   ))}
               </div>
             </div>

             {/* Body */}
             <div className="flex-1 p-6 overflow-y-auto">
                 {step === 1 && (
                     <div className="space-y-6 max-w-lg mx-auto">
                         <h3 className="text-lg font-medium text-slate-700 text-center">Dados do Cliente e Datas</h3>
                         <div className="space-y-4">
                             <div>
                                 <label className="block text-sm font-medium mb-1">Cliente</label>
                                 <select 
                                    className="w-full p-3 border rounded-lg bg-white"
                                    value={newContrato.clienteId}
                                    onChange={e => setNewContrato({...newContrato, clienteId: e.target.value})}
                                 >
                                     <option value="">Selecione um Cliente...</option>
                                     {clientes.map(c => <option key={c.id} value={c.id}>{c.nome} {c.cpfCnpj ? `(${c.cpfCnpj})` : ''}</option>)}
                                 </select>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="block text-sm font-medium mb-1">Data Início</label>
                                     <input type="date" className="w-full p-2 border rounded-lg" value={newContrato.dataInicio} onChange={e => setNewContrato({...newContrato, dataInicio: e.target.value})} />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium mb-1">Data Fim</label>
                                     <input type="date" className="w-full p-2 border rounded-lg" value={newContrato.dataFim} onChange={e => setNewContrato({...newContrato, dataFim: e.target.value})} />
                                 </div>
                             </div>
                             <div>
                                 <label className="flex items-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                     <input type="checkbox" checked={newContrato.renovacaoAuto} onChange={e => setNewContrato({...newContrato, renovacaoAuto: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" />
                                     <div>
                                         <span className="font-medium text-slate-800">Renovação Automática</span>
                                         <p className="text-xs text-slate-500">Renovar contrato automaticamente ao fim do período se não houver cancelamento.</p>
                                     </div>
                                 </label>
                             </div>
                         </div>
                     </div>
                 )}

                 {step === 2 && (
                     <div className="h-full flex flex-col">
                         <h3 className="text-lg font-medium text-slate-700 mb-4">Selecionar Equipamentos</h3>
                         
                         <div className="flex gap-6 h-full">
                             {/* Available List */}
                             <div className="flex-1 bg-slate-50 rounded-xl p-4 border overflow-y-auto">
                                 <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Disponíveis</h4>
                                 {equipamentosDisponiveis.map(eq => (
                                     <div key={eq.id} className="bg-white p-3 rounded-lg border mb-2 flex justify-between items-center shadow-sm cursor-pointer hover:border-indigo-500 transition-colors"
                                        onClick={() => handleAddItem(eq)}
                                     >
                                         <div>
                                             <div className="font-medium text-slate-800">{eq.nome}</div>
                                             <div className="text-xs text-slate-500">{eq.marca} - {eq.numeroSerie}</div>
                                         </div>
                                         <Plus size={16} className="text-indigo-600" />
                                     </div>
                                 ))}
                                 {equipamentosDisponiveis.length === 0 && <p className="text-sm text-center text-slate-400 mt-10">Nenhum equipamento disponível.</p>}
                             </div>

                             {/* Selected List */}
                             <div className="flex-1 bg-white rounded-xl p-4 border-2 border-dashed border-indigo-200 overflow-y-auto">
                                 <h4 className="text-sm font-bold text-indigo-600 uppercase mb-3">Selecionados para Locação</h4>
                                 {newContrato.itens.length === 0 ? (
                                     <p className="text-center text-slate-400 mt-10 text-sm">Clique nos itens à esquerda para adicionar.</p>
                                 ) : (
                                     newContrato.itens.map((item, idx) => (
                                         <div key={idx} className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-2">
                                             <div className="flex justify-between items-start mb-2">
                                                 <span className="font-medium text-indigo-900">{item.nome}</span>
                                                 <button onClick={() => handleRemoveItem(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                             </div>
                                             <div className="flex items-center gap-2 text-sm">
                                                 <label>R$</label>
                                                 <input 
                                                    type="number" 
                                                    className="w-24 p-1 rounded border text-right font-medium text-slate-700"
                                                    value={item.valor}
                                                    onChange={e => {
                                                        const newItens = [...newContrato.itens];
                                                        newItens[idx].valor = e.target.value;
                                                        setNewContrato({...newContrato, itens: newItens});
                                                    }}
                                                 />
                                                 <span className="text-slate-400">/mês</span>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                         </div>
                     </div>
                 )}

                 {step === 3 && (
                     <div className="space-y-6 max-w-lg mx-auto text-center py-10">
                         <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-4">
                             <Check size={32} />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-800">Resumo do Contrato</h3>
                         
                         <div className="bg-slate-50 p-6 rounded-xl text-left space-y-3">
                             <div className="flex justify-between border-b pb-2">
                                 <span className="text-slate-500">Cliente</span>
                                 <span className="font-medium text-slate-900">{clientes.find(c => c.id == newContrato.clienteId)?.nome}</span>
                             </div>
                             <div className="flex justify-between border-b pb-2">
                                 <span className="text-slate-500">Período</span>
                                 <span className="font-medium text-slate-900">{newContrato.dataInicio} até {newContrato.dataFim}</span>
                             </div>
                             <div className="flex justify-between pt-2">
                                 <span className="text-slate-500">Valor Mensal</span>
                                 <span className="font-bold text-xl text-emerald-600">R$ {calculateTotal().toFixed(2)}</span>
                             </div>
                             <div className="text-xs text-slate-400 text-center pt-4">
                                 {newContrato.itens.length} equipamentos selecionados.
                             </div>
                         </div>
                     </div>
                 )}
             </div>

             {/* Footer */}
             <div className="bg-white p-6 border-t border-slate-100 flex justify-between">
                 <button 
                    onClick={() => { if(step > 1) setStep(step - 1); else setShowModal(false); }}
                    className="px-6 py-2 text-slate-600 hover:bg-slate-50 font-medium rounded-lg"
                 >
                     {step === 1 ? 'Cancelar' : 'Voltar'}
                 </button>
                 
                 {step < 3 ? (
                     <button 
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 && !newContrato.clienteId}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                         Próximo
                     </button>
                 ) : (
                     <button 
                        onClick={handleSubmit}
                        className="px-8 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                     >
                         Confirmar Contrato
                     </button>
                 )}
             </div>

          </div>
        </div>
      )}
        </div>
      </DashboardLayout>
    </PermissionGuard>
  );
}
