"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
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

const DroppableCanvas = ({ children, isEmpty }: { children: React.ReactNode, isEmpty: boolean }) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable',
    data: { isCanvas: true }
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`min-h-[400px] transition-all ${isEmpty ? 'border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center p-20' : ''}`}
    >
      {children}
    </div>
  );
};

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
      case 'signature':
        baseBlock.config = {
          tecnico: true,
          cliente: true
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
      const type = active.data.current.type;
      const newBlock = createBlock(type);
      
      // If dropped over an existing block, insert there. Otherwise add to end.
      const overIndex = blocks.findIndex(b => b.id === over.id);
      if (overIndex !== -1) {
        const newBlocks = [...blocks];
        newBlocks.splice(overIndex, 0, newBlock);
        setBlocks(newBlocks);
      } else {
        setBlocks([...blocks, newBlock]);
      }
      
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
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Left Sidebar - Block Palette */}
        <BlockPalette onAddBlock={(type) => {
          const newBlock = createBlock(type);
          setBlocks([...blocks, newBlock]);
          setSelectedBlockId(newBlock.id);
        }} />

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Canvas Header */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900">Canvas do Template</h2>
                <p className="text-sm text-gray-500">Arraste blocos da paleta ou clique para adicionar</p>
              </div>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                Salvar Template
              </button>
            </div>

            {/* Droppable Canvas Area */}
            <DroppableCanvas isEmpty={blocks.length === 0}>
              {blocks.length === 0 ? (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-1">Canvas vazio</p>
                  <p className="text-gray-400 text-sm">Arraste componentes da paleta ou clique neles para começar</p>
                </>
              ) : (
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
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
            </DroppableCanvas>
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
