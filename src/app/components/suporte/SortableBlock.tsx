"use client";

import { TemplateBlock } from "@/types/templateTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BlockRenderer from "./BlockRenderer";
import { GripVertical, Trash2, Settings } from "lucide-react";

interface SortableBlockProps {
  block: TemplateBlock;
  data?: any;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isPreview?: boolean;
}

export default function SortableBlock({ block, data, onDelete, onSelect, isSelected, isPreview = false }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected && !isPreview ? 'ring-2 ring-blue-500 rounded-xl' : ''}`}
      onClick={() => !isPreview && onSelect(block.id)}
    >
      {/* Drag Handle & Actions */}
      {!isPreview && (
        <div className="absolute -left-12 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
          <button
            {...attributes}
            {...listeners}
            className="p-2 bg-gray-700 text-white rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors"
          >
            <GripVertical size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(block.id);
            }}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Block Content */}
      <div className={`${
        isPreview 
        ? 'border-none' 
        : `bg-white border-2 rounded-xl overflow-hidden ${isSelected ? 'border-blue-500 shadow-lg shadow-blue-50' : 'border-gray-200'}`
      } transition-all`}>
        <BlockRenderer block={block} data={data} isEditing={!isPreview} />
      </div>
    </div>
  );
}
