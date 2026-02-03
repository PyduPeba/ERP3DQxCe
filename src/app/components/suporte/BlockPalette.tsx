"use client";

import { BLOCK_TYPES, BlockType } from "@/types/templateTypes";
import { useDraggable } from "@dnd-kit/core";

interface BlockPaletteProps {
  onAddBlock: (type: BlockType) => void;
}

function DraggableBlockItem({ type, label, icon, description }: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, fromPalette: true }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-lg'
      }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-bold text-sm text-gray-900 mb-1">{label}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
        Componentes
      </h3>
      <div className="space-y-3">
        {BLOCK_TYPES.map((blockType) => (
          <DraggableBlockItem
            key={blockType.type}
            type={blockType.type}
            label={blockType.label}
            icon={blockType.icon}
            description={blockType.description}
          />
        ))}
      </div>
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700">
          💡 <strong>Dica:</strong> Arraste os componentes para o canvas para construir seu template.
        </p>
      </div>
    </div>
  );
}
