"use client";

import { BLOCK_TYPES, BlockType } from "@/types/templateTypes";
import { useDraggable } from "@dnd-kit/core";

interface BlockPaletteProps {
  onAddBlock: (type: BlockType) => void;
}

function DraggableBlockItem({ type, label, icon, description, onClick }: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, fromPalette: true }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onClick(type)}
      className={`bg-white p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 cursor-grab active:cursor-grabbing transition-all group select-none ${
        isDragging ? 'opacity-50 scale-95 border-blue-500' : 'hover:shadow-xl hover:shadow-blue-50/50'
      }`}
    >
      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="font-black text-xs text-gray-900 mb-1 uppercase tracking-tight">{label}</h4>
      <p className="text-[10px] text-gray-400 font-medium leading-tight">{description}</p>
    </div>
  );
}

export default function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-100 p-6 overflow-y-auto no-scrollbar shadow-2xl shadow-gray-200/50 z-10">
      <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
        Componentes
      </h3>
      <div className="space-y-4">
        {BLOCK_TYPES.map((blockType) => (
          <DraggableBlockItem
            key={blockType.type}
            type={blockType.type}
            label={blockType.label}
            icon={blockType.icon}
            description={blockType.description}
            onClick={onAddBlock}
          />
        ))}
      </div>
      <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
        <p className="text-[10px] text-emerald-700 font-bold leading-relaxed">
          💡 <strong>Dica:</strong> Arraste ou clique nos componentes para adicioná-los ao canvas.
        </p>
      </div>
    </div>
  );
}
