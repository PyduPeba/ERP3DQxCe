"use client";

import { TemplateBlock, AVAILABLE_FIELDS } from "@/types/templateTypes";
import { useState } from "react";
import { X } from "lucide-react";

interface PropertiesPanelProps {
  block: TemplateBlock | null;
  onUpdate: (block: TemplateBlock) => void;
  onClose: () => void;
}

export default function PropertiesPanel({ block, onUpdate, onClose }: PropertiesPanelProps) {
  if (!block) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 flex items-center justify-center">
        <p className="text-gray-400 text-sm text-center">
          Selecione um bloco para configurar suas propriedades
        </p>
      </div>
    );
  }

  const updateConfig = (key: string, value: any) => {
    onUpdate({
      ...block,
      config: {
        ...block.config,
        [key]: value
      }
    });
  };

  const updateStyle = (key: string, value: any) => {
    onUpdate({
      ...block,
      config: {
        ...block.config,
        style: {
          ...block.config.style,
          [key]: value
        }
      }
    });
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h3 className="font-bold text-gray-900">Propriedades</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Block Type Specific Config */}
        {block.type === 'header' && (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Título</label>
              <input
                type="text"
                value={block.config.title || ''}
                onChange={(e) => updateConfig('title', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                placeholder="RELATÓRIO DE SERVIÇOS"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Subtítulo</label>
              <input
                type="text"
                value={block.config.subtitle || ''}
                onChange={(e) => updateConfig('subtitle', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Referência: {{relatorio.mesReferencia}}/{{relatorio.anoReferencia}}"
              />
            </div>
          </>
        )}

        {block.type === 'info' && (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Colunas</label>
              <select
                value={block.config.columns || 2}
                onChange={(e) => updateConfig('columns', Number(e.target.value))}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value={1}>1 Coluna</option>
                <option value={2}>2 Colunas</option>
                <option value={3}>3 Colunas</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Campos</label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(AVAILABLE_FIELDS).map(([category, fields]) => (
                  <div key={category}>
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">{category}</p>
                    {fields.map((field) => {
                      const fieldKey = `${category}.${field.key}`;
                      const isSelected = block.config.fields?.includes(fieldKey);
                      return (
                        <label key={fieldKey} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const currentFields = block.config.fields || [];
                              const newFields = e.target.checked
                                ? [...currentFields, fieldKey]
                                : currentFields.filter(f => f !== fieldKey);
                              updateConfig('fields', newFields);
                            }}
                            className="rounded"
                          />
                          {field.label}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {block.type === 'table' && (
          <>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.config.showEquipment || false}
                onChange={(e) => updateConfig('showEquipment', e.target.checked)}
                className="rounded"
              />
              Mostrar Equipamento
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.config.showTombo || false}
                onChange={(e) => updateConfig('showTombo', e.target.checked)}
                className="rounded"
              />
              Mostrar Patrimônio
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.config.showPhotos || false}
                onChange={(e) => updateConfig('showPhotos', e.target.checked)}
                className="rounded"
              />
              Mostrar Fotos
            </label>
          </>
        )}

        {block.type === 'text' && (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Conteúdo</label>
            <textarea
              value={block.config.content || ''}
              onChange={(e) => updateConfig('content', e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm resize-none"
              placeholder="Digite o texto... Use {{variavel}} para campos dinâmicos"
            />
          </div>
        )}

        {block.type === 'image' && (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Imagens por linha</label>
            <select
              value={block.config.imagesPerRow || 2}
              onChange={(e) => updateConfig('imagesPerRow', Number(e.target.value))}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        )}

        {block.type === 'spacer' && (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Altura</label>
            <input
              type="text"
              value={block.config.height || '2rem'}
              onChange={(e) => updateConfig('height', e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              placeholder="2rem, 50px, etc."
            />
          </div>
        )}

        {block.type === 'signature' && (
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.config.tecnico ?? true}
                onChange={(e) => updateConfig('tecnico', e.target.checked)}
                className="rounded"
              />
              Assinatura do Técnico
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.config.cliente ?? true}
                onChange={(e) => updateConfig('cliente', e.target.checked)}
                className="rounded"
              />
              Visto do Cliente
            </label>
          </div>
        )}

        {/* Common Style Properties */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-xs font-black text-gray-400 uppercase mb-3">Estilo</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alinhamento</label>
              <select
                value={block.config.style?.textAlign || 'left'}
                onChange={(e) => updateStyle('textAlign', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cor do Texto</label>
              <input
                type="color"
                value={block.config.style?.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cor de Fundo</label>
              <input
                type="color"
                value={block.config.style?.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Padding</label>
              <input
                type="text"
                value={block.config.style?.padding || '1rem'}
                onChange={(e) => updateStyle('padding', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                placeholder="1rem, 20px, etc."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
