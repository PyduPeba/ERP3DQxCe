"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TemplateBlock, BlockType, VisualTemplate } from "@/types/templateTypes";
import BlockPalette from "./BlockPalette";
import SortableBlock from "./SortableBlock";
import PropertiesPanel from "./PropertiesPanel";
import { nanoid } from "nanoid";

interface TemplateEditorProps {
  initialTemplate?: VisualTemplate;
  previewData?: any;
  onSave?: (template: VisualTemplate) => void;
}

export default function TemplateEditor({ initialTemplate, previewData, onSave }: TemplateEditorProps) {
  const [blocks, setBlocks] = useState<TemplateBlock[]>(initialTemplate?.blocos || []);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  const createBlock = (type: BlockType): TemplateBlock => {
    const baseBlock: TemplateBlock = {
      id: nanoid(),
      type,
      order: blocks.length,
      config: {}
    };

    // Set default config based on type
    switch (type) {
      case 'header':
        baseBlock.config = {
          title: 'RELATÓRIO DE SERVIÇOS TÉCNICOS',
          subtitle: 'Referência: {{relatorio.mesReferencia}}/{{relatorio.anoReferencia}}',
          showLogo: true
        };
        break;
      case 'info':
        baseBlock.config = {
          columns: 2,
          fields: ['prestador.nomeEmpresa', 'prestador.cnpj', 'cliente.nome', 'cliente.cpfCnpj']
        };
        break;
      case 'table':
        baseBlock.config = {
          showEquipment: true,
          showTombo: true,
          showPhotos: false
        };
        break;
      case 'text':
        baseBlock.config = {
          content: 'Digite seu texto aqui...'
        };
        break;
      case 'image':
        baseBlock.config = {
          imagesPerRow: 2,
          layout: 'grid'
        };
        break;
      case 'spacer':
        baseBlock.config = {
          height: '2rem'
        };
        break;
    }

    return baseBlock;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dragging from palette
    if (active.data.current?.fromPalette) {
      const newBlock = createBlock(active.data.current.type);
      setBlocks([...blocks, newBlock]);
      setSelectedBlockId(newBlock.id);
      return;
    }

    // Reordering existing blocks
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const handleUpdateBlock = (updatedBlock: TemplateBlock) => {
    setBlocks(blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b));
  };

  const handleSave = () => {
    const template: VisualTemplate = {
      nome: initialTemplate?.nome || 'Novo Template',
      categoria: initialTemplate?.categoria || 'Geral',
      blocos: blocks,
      configuracaoGeral: initialTemplate?.configuracaoGeral || {
        pageSize: 'A4',
        margins: { top: 20, right: 20, bottom: 20, left: 20 },
        orientation: 'portrait'
      }
    };
    onSave?.(template);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar - Block Palette */}
        <BlockPalette onAddBlock={(type) => {
          const newBlock = createBlock(type);
          setBlocks([...blocks, newBlock]);
          setSelectedBlockId(newBlock.id);
        }} />

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Canvas Header */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Canvas do Template</h2>
                <p className="text-sm text-gray-500">Arraste blocos da paleta ou reordene os existentes</p>
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                Salvar Template
              </button>
            </div>

            {/* Blocks */}
            {blocks.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-20 text-center">
                <p className="text-gray-400 text-lg mb-2">Canvas vazio</p>
                <p className="text-gray-400 text-sm">Arraste componentes da paleta para começar</p>
              </div>
            ) : (
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4 pl-12">
                  {blocks.map((block) => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      data={previewData}
                      onDelete={handleDeleteBlock}
                      onSelect={setSelectedBlockId}
                      isSelected={selectedBlockId === block.id}
                    />
                  ))}
                </div>
              </SortableContext>
            )}
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <PropertiesPanel
          block={selectedBlock}
          onUpdate={handleUpdateBlock}
          onClose={() => setSelectedBlockId(null)}
        />
      </div>

      <DragOverlay>
        {activeId && (
          <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-2xl opacity-90">
            Movendo bloco...
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
