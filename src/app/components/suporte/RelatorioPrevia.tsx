"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RelatorioPreviaProps {
    data: {
        numero?: string;
        mesReferencia: number;
        anoReferencia: number;
        tipoTemplate: string;
        observacoes?: string;
        createdAt?: string | Date;
        cliente?: {
            nome: string;
            cpfCnpj?: string;
            logradouro?: string;
            numero?: string;
            bairro?: string;
            cidade?: string;
            estado?: string;
        };
    };
    itens: {
        data: string | Date;
        descricaoServico: string;
        equipamento?: string;
        tombo?: string;
        status?: string;
        fotos?: string[];
    }[];
}

export default function RelatorioPrevia({ data, itens }: RelatorioPreviaProps) {
    const parseSafeDate = (dateVal: any) => {
        if (!dateVal) return null;
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? null : d;
    };

    const dataGeracao = parseSafeDate(data.createdAt) || new Date();
    const dataRef = (data.anoReferencia && data.mesReferencia) ? new Date(data.anoReferencia, data.mesReferencia - 1) : null;
    
    return (
        <div className="bg-white shadow-2xl print:shadow-none print:m-0 min-h-[297mm] p-[15mm] md:p-[20mm] font-serif text-gray-900 border border-gray-100 flex flex-col">
            {/* Header Section */}
            <div className="border-b-4 border-gray-900 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-1">RELATÓRIO DE SERVIÇOS TÉCNICOS</h1>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        Referência: {dataRef ? format(dataRef, 'MMMM', { locale: ptBR }) : '---'} / {data.anoReferencia || '---'}
                    </p>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-xl font-bold">{data.numero || "RASCUNHO"}</p>
                    <p className="text-xs text-gray-400">Gerado em {dataGeracao.toLocaleDateString('pt-BR')}</p>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Prestador</p>
                        <p className="font-bold">SUA EMPRESA DE TI LTDA</p>
                        <p className="text-xs text-gray-600">CNPJ: 00.000.000/0001-00</p>
                        <p className="text-xs text-gray-600">Contato: suporte@empresa.com.br</p>
                    </div>
                </div>
                <div className="space-y-4 border-l-0 md:border-l md:pl-10 border-gray-100">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cliente / Órgão Público</p>
                        <p className="font-bold uppercase text-lg">{data.cliente?.nome || "Não selecionado"}</p>
                        <p className="text-xs text-gray-600">{data.cliente?.cpfCnpj ? `CNPJ/CPF: ${data.cliente.cpfCnpj}` : ''}</p>
                        <p className="text-xs text-gray-600">
                            {data.cliente ? (
                                <>
                                    {data.cliente.logradouro || 'Endereço não informado'}
                                    {data.cliente.numero ? `, ${data.cliente.numero}` : ''}
                                    {data.cliente.bairro ? ` - ${data.cliente.bairro}` : ''}
                                    {data.cliente.cidade ? ` - ${data.cliente.cidade}` : ''}
                                    {data.cliente.estado ? `/${data.cliente.estado}` : ''}
                                </>
                            ) : (
                                'Selecione um cliente para ver o endereço'
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table of Content */}
            <div className="mb-10 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="p-3 text-[10px] uppercase font-black tracking-widest w-12 text-center">Item</th>
                            <th className="p-3 text-[10px] uppercase font-black tracking-widest w-24">Data</th>
                            <th className="p-3 text-[10px] uppercase font-black tracking-widest">Discriminação das Atividades Realizadas</th>
                            {data.tipoTemplate === 'DETALHADO' && <th className="p-3 text-[10px] uppercase font-black tracking-widest w-32">Patrimônio</th>}
                            <th className="p-3 text-[10px] uppercase font-black tracking-widest text-right w-24">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {itens.length === 0 ? (
                            <tr>
                                <td colSpan={data.tipoTemplate === 'DETALHADO' ? 5 : 4} className="p-10 text-center text-gray-400 italic">
                                    Nenhuma atividade registrada neste relatório.
                                </td>
                            </tr>
                        ) : (
                            itens.map((item, idx) => (
                                <tr key={idx} className="page-break-inside-avoid">
                                    <td className="p-3 text-xs font-bold text-center align-top text-gray-400">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </td>
                                    <td className="p-3 text-xs font-bold align-top whitespace-nowrap">
                                        {parseSafeDate(item.data)?.toLocaleDateString('pt-BR') || '---'}
                                    </td>
                                    <td className="p-3 text-sm leading-relaxed align-top">
                                        <div className="whitespace-pre-wrap">{item.descricaoServico}</div>
                                        {item.equipamento && <div className="text-[10px] text-gray-500 mt-1 font-bold">Equip: {item.equipamento}</div>}
                                        {item.fotos && item.fotos.length > 0 && (
                                            <div className="mt-2 text-[9px] font-black text-blue-600 uppercase flex items-center gap-1 bg-blue-50 w-fit px-2 py-0.5 rounded-full border border-blue-100">
                                                📷 Ver Anexo Fotográfico
                                            </div>
                                        )}
                                    </td>
                                    {data.tipoTemplate === 'DETALHADO' && <td className="p-3 text-xs align-top font-mono">{item.tombo || '-'}</td>}
                                    <td className="p-3 text-xs font-bold text-right align-top">{item.status || 'OK'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Observations */}
            {data.observacoes && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-10 italic text-sm text-gray-700">
                    <p className="font-bold not-italic mb-2 text-xs uppercase tracking-widest text-gray-400">Observações Técnicas:</p>
                    {data.observacoes}
                </div>
            )}

            {/* Photographic Annex */}
            {itens.some((item) => item.fotos && item.fotos.length > 0) && (
                <div className="mt-10 page-break-before-auto flex flex-col gap-6">
                    <div className="border-b-2 border-gray-900 pb-2">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter flex justify-between items-end">
                            ANEXO I: EVIDÊNCIAS FOTOGRÁFICAS
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">Fotos dos serviços técnicos</span>
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        {itens.map((item, iIdx) => 
                            item.fotos?.map((foto, fIdx) => (
                                <div key={`${iIdx}-${fIdx}`} className="border-2 border-gray-100 p-4 rounded-2xl flex flex-col gap-3 page-break-inside-avoid shadow-sm hover:shadow-md transition-shadow bg-gray-50/30">
                                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center relative group">
                                        <img 
                                            src={foto} 
                                            className="w-full h-full object-cover" 
                                            alt={`Evidência ${iIdx + 1}`}
                                            onError={(e) => {
                                                (e.target as any).src = 'https://placehold.co/600x400?text=Erro+ao+Carregar+Foto';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                    </div>
                                    <div className="px-1 flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[11px] font-black text-gray-900 uppercase underline decoration-blue-500 decoration-2 underline-offset-4">Item #{(iIdx + 1).toString().padStart(2, '0')}</p>
                                            <p className="text-[10px] font-bold text-gray-400">{parseSafeDate(item.data)?.toLocaleDateString('pt-BR') || '---'}</p>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2 italic leading-relaxed">{item.descricaoServico}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Footer Signature */}
            <div className="mt-auto pt-20 grid grid-cols-2 gap-20 text-center">
                <div>
                    <div className="border-t border-gray-900 pt-2 mx-auto max-w-[200px]">
                        <p className="text-sm font-bold">Responsável Técnico</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">SUA EMPRESA DE TI</p>
                    </div>
                </div>
                <div>
                    <div className="border-t border-gray-900 pt-2 mx-auto max-w-[200px]">
                        <p className="text-sm font-bold">Visto do Cliente</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">CARIMBO E ASSINATURA</p>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="mt-10 text-center text-[8px] text-gray-300 uppercase tracking-widest">
                Este documento é parte integrante do processo de auditoria e faturamento.
            </div>
        </div>
    );
}
