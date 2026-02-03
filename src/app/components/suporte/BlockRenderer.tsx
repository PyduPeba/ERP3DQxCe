"use client";

import { TemplateBlock } from "@/types/templateTypes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlockRendererProps {
  block: TemplateBlock;
  data?: any; // Dados reais para preview
  isEditing?: boolean;
}

export default function BlockRenderer({ block, data, isEditing = true }: BlockRendererProps) {
  const baseStyle = {
    ...block.config.style,
    padding: block.config.style?.padding || '1rem'
  };

  // Helper to replace dynamic fields
  const replacePlaceholders = (text: string) => {
    if (!text || !data) return text;
    return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const keys = path.trim().split('.');
      let value = data;
      for (const key of keys) {
        value = value?.[key];
      }
      return value || match;
    });
  };

  switch (block.type) {
    case 'header':
      return (
        <div style={baseStyle} className="border-b-4 border-gray-900 pb-6">
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            {replacePlaceholders(block.config.title || 'RELATÓRIO DE SERVIÇOS TÉCNICOS')}
          </h1>
          {block.config.subtitle && (
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              {replacePlaceholders(block.config.subtitle)}
            </p>
          )}
        </div>
      );

    case 'info':
      const columns = block.config.columns || 2;
      return (
        <div style={baseStyle} className={`grid grid-cols-${columns} gap-6`}>
          {block.config.fields?.map((field, idx) => {
            const [category, key] = field.split('.');
            const value = data?.[category]?.[key] || `{{${field}}}`;
            return (
              <div key={idx}>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                  {key}
                </p>
                <p className="font-bold text-gray-900">{value}</p>
              </div>
            );
          })}
        </div>
      );

    case 'table':
      return (
        <div style={baseStyle} className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-3 text-xs uppercase font-black text-center w-12">Item</th>
                <th className="p-3 text-xs uppercase font-black">Data</th>
                <th className="p-3 text-xs uppercase font-black">Descrição do Serviço</th>
                {block.config.showEquipment && <th className="p-3 text-xs uppercase font-black">Equipamento</th>}
                {block.config.showTombo && <th className="p-3 text-xs uppercase font-black">Patrimônio</th>}
                <th className="p-3 text-xs uppercase font-black text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.itens?.length > 0 ? (
                data.itens.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="p-3 text-xs font-bold text-center text-gray-400">
                      {(idx + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="p-3 text-xs font-bold whitespace-nowrap">
                      {item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '---'}
                    </td>
                    <td className="p-3 text-sm">{item.descricaoServico}</td>
                    {block.config.showEquipment && <td className="p-3 text-xs">{item.equipamento || '-'}</td>}
                    {block.config.showTombo && <td className="p-3 text-xs font-mono">{item.tombo || '-'}</td>}
                    <td className="p-3 text-xs font-bold text-right">{item.status || 'OK'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-400 italic">
                    Nenhum item para exibir
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );

    case 'text':
      return (
        <div style={baseStyle} className="whitespace-pre-wrap">
          {replacePlaceholders(block.config.content || 'Digite seu texto aqui...')}
        </div>
      );

    case 'image':
      const imagesPerRow = block.config.imagesPerRow || 2;
      return (
        <div style={baseStyle}>
          <h3 className="text-lg font-black uppercase mb-4">Anexo Fotográfico</h3>
          <div className={`grid grid-cols-${imagesPerRow} gap-4`}>
            {data?.itens?.flatMap((item: any) => item.fotos || []).length > 0 ? (
              data.itens.flatMap((item: any, iIdx: number) =>
                item.fotos?.map((foto: string, fIdx: number) => (
                  <div key={`${iIdx}-${fIdx}`} className="border-2 border-gray-100 p-3 rounded-xl">
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img src={foto} alt={`Foto ${iIdx + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-500">Item #{iIdx + 1}</p>
                  </div>
                ))
              )
            ) : (
              <p className="text-gray-400 italic col-span-full text-center py-10">
                Nenhuma foto disponível
              </p>
            )}
          </div>
        </div>
      );

    case 'signature':
      return (
        <div style={baseStyle} className="grid grid-cols-2 gap-20 text-center">
          <div>
            <div className="border-t border-gray-900 pt-2 mx-auto max-w-[200px]">
              <p className="text-sm font-bold">Responsável Técnico</p>
              <p className="text-xs text-gray-500 uppercase">
                {data?.prestador?.nomeEmpresa || '{{prestador.nomeEmpresa}}'}
              </p>
            </div>
          </div>
          <div>
            <div className="border-t border-gray-900 pt-2 mx-auto max-w-[200px]">
              <p className="text-sm font-bold">Visto do Cliente</p>
              <p className="text-xs text-gray-500 uppercase">CARIMBO E ASSINATURA</p>
            </div>
          </div>
        </div>
      );

    case 'spacer':
      return <div style={{ height: block.config.height || '2rem' }} />;

    default:
      return (
        <div style={baseStyle} className="bg-gray-100 p-4 rounded text-center text-gray-400">
          Bloco desconhecido: {block.type}
        </div>
      );
  }
}
