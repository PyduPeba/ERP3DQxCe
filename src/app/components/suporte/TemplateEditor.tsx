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
  const [isPreview, setIsPreview] = useState(false);

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
        {!isPreview && (
          <BlockPalette onAddBlock={(type) => {
            const newBlock = createBlock(type);
            setBlocks([...blocks, newBlock]);
            setSelectedBlockId(newBlock.id);
          }} />
        )}

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <div className={`${isPreview ? 'max-w-[21cm] mx-auto' : 'max-w-4xl mx-auto'} space-y-6 transition-all duration-500`}>
            
            {/* Canvas Header */}
            <div className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between no-print ${isPreview ? 'mb-8' : ''}`}>
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {isPreview ? 'Visualização do Relatório' : 'Canvas do Template'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isPreview ? 'Veja como o relatório será impresso/gerado' : 'Arraste blocos da paleta ou clique para adicionar'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                    isPreview 
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isPreview ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                  {isPreview ? 'Voltar para Edição' : 'Visualizar Impressão'}
                </button>

                {!isPreview && (
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                  >
                    Salvar Template
                  </button>
                )}

                {isPreview && (
                   <button
                   onClick={() => window.print()}
                   className="px-6 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center gap-2"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                   </svg>
                   Imprimir / PDF
                 </button>
                )}
              </div>
            </div>

            {/* Droppable Canvas Area */}
            <div className={isPreview ? 'bg-white shadow-2xl min-h-[29.7cm] p-[2cm] origin-top transform transition-all duration-500 rounded-sm' : ''}>
              <DroppableCanvas isEmpty={blocks.length === 0 && !isPreview}>
                {blocks.length === 0 ? (
                  !isPreview && (
                    <>
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 animate-pulse">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-bold text-lg mb-1">Canvas vazio</p>
                      <p className="text-gray-400 text-sm">Arraste componentes da paleta ou clique neles para começar</p>
                    </>
                  )
                ) : (
                  <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    <div className={isPreview ? 'space-y-0' : 'space-y-4'}>
                      {blocks.map((block) => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          data={previewData}
                          onDelete={handleDeleteBlock}
                          onSelect={setSelectedBlockId}
                          isSelected={selectedBlockId === block.id && !isPreview}
                          isPreview={isPreview}
                        />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </DroppableCanvas>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        {!isPreview && (
          <PropertiesPanel
            block={selectedBlock}
            onUpdate={handleUpdateBlock}
            onClose={() => setSelectedBlockId(null)}
          />
        )}
      </div>

      <DragOverlay>
        {activeId && (
          <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-2xl opacity-90">
            Movendo bloco...
          </div>
        )}
      </DragOverlay>
      
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .flex-1 { overflow: visible !important; padding: 0 !important; }
          .bg-gray-100, .bg-gray-50\/50 { background: white !important; }
          .max-w-[21cm] { max-width: none !important; margin: 0 !important; }
          .p-\[2cm\] { padding: 0 !important; }
          .shadow-2xl { shadow: none !important; }
          .border { border: none !important; }
        }
      `}</style>
    </DndContext>
  );
}
