"use client";

import { useEffect, useState } from "react";
import { Laptop, Calendar, User, ShieldCheck } from "lucide-react";

export default function ImprimirProtocoloPage({ params }: { params: { id: string } }) {
    const [move, setMove] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/suporte/ati/movimentacoes/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setMove(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div className="p-10 text-center">Carregando formulário...</div>;
    if (!move || move.error) return <div className="p-10 text-center text-red-500 font-bold">Erro: Movimentação não encontrada.</div>;

    return (
        <div className="min-h-screen bg-white p-8 md:p-16 text-black print:p-0">
            {/* Header / Logo Area */}
            <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Termo de Responsabilidade</h1>
                    <p className="text-sm font-bold text-gray-600">Assistência Técnica Interna - ATI</p>
                </div>
                <div className="text-right text-xs">
                    <p className="font-bold">Protocolo: #ATI-MOV-{move.id.toString().padStart(4, '0')}</p>
                    <p>{new Date(move.createdAt).toLocaleDateString()} - {new Date(move.createdAt).toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8 text-sm leading-relaxed">
                <p>
                    Eu, <span className="font-bold underline">{move.usuario.nome}</span>, portador do perfil <span className="font-bold">{move.usuario.perfil}</span>, 
                    declaro para os devidos fins que recebi/entreguei o equipamento abaixo descrito, de propriedade desta empresa, 
                    estando o mesmo nas condições relatadas neste documento.
                </p>

                {/* Asset Box */}
                <div className="border border-black p-4 rounded-lg bg-gray-50/50">
                    <h3 className="font-black uppercase text-xs mb-3 border-b border-black/10 pb-1">Descrição do Ativo</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Equipamento</p>
                            <p className="font-bold">{move.ativo.nome}</p>
                            <p className="text-xs text-gray-600">{move.ativo.descricao || "Nenhum detalhe adicional"}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Patrimônio / Serial</p>
                            <p className="font-bold">{move.ativo.numeroPatrimonio} {move.ativo.numeroSerie ? `/ ${move.ativo.numeroSerie}` : ''}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Tipo de Movimentação</p>
                            <p className="font-bold text-lg">{move.tipo === 'ENTREGA' ? '✅ ENTREGA AO COLABORADOR' : '🔄 DEVOLUÇÃO AO PATRIMÔNIO'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Condição do Bem</p>
                            <p className="font-medium">{move.condicaoNoMomento || "Não informada"}</p>
                        </div>
                    </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                    <h3 className="font-black uppercase text-xs">Responsabilidades e Deveres:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[13px]">
                        <li>Zelar pela conservação e guarda do equipamento, evitando danos por negligência ou mau uso.</li>
                        <li>Não realizar alterações físicas ou lógicas (instalação de softwares não autorizados) sem prévia consulta ao TI.</li>
                        <li>Em caso de perda, roubo ou furto, comunicar imediatamente o setor de TI e a diretoria.</li>
                        <li>O equipamento deve ser devolvido imediatamente em caso de desligamento ou por solicitação da empresa.</li>
                    </ul>
                </div>

                <div className="pt-12">
                    <p className="text-center italic text-gray-500 text-xs mb-20">
                        Documento processado digitalmente sob supervisão do técnico: <span className="font-bold text-black">{move.tecnico.nome}</span>
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="w-80 border-t border-black mb-2"></div>
                        <p className="font-bold uppercase text-sm">{move.usuario.nome}</p>
                        <p className="text-xs text-gray-500">Assinatura do Colaborador</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-8 left-8 right-8 text-[9px] text-gray-400 text-center border-t border-gray-100 pt-4 print:hidden">
                <button 
                    onClick={() => window.print()}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-gray-200 mb-4"
                >
                    Imprimir Documento
                </button>
                <p>Este documento é para uso interno exclusivo. Impresso via ERP 3DQX em {new Date().toLocaleString()}</p>
            </div>
            
            <style jsx global>{`
                @media print {
                    button { display: none !important; }
                    .print-hidden { display: none !important; }
                    body { background: white !important; }
                }
            `}</style>
        </div>
    );
}
