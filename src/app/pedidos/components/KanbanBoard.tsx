"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Clock, User, AlertCircle, MoreVertical, Edit2 } from "lucide-react";
import Link from "next/link";
import { updateStatus } from "../../actions/pedidos";
import { toast } from "sonner";

interface Pedido {
  id: number;
  cliente: string;
  descricao: string;
  status: string;
  prioridade: string;
}

interface KanbanProps {
  initialPedidos: Pedido[];
}

const COLUMNS = [
  { id: "pendente", title: "Pendente", color: "bg-gray-100 text-gray-700" },
  { id: "design", title: "Em Design", color: "bg-blue-100 text-blue-700" },
  { id: "aprovacao", title: "Aguardando Aprovação", color: "bg-amber-100 text-amber-700" },
  { id: "producao", title: "Em Produção", color: "bg-purple-100 text-purple-700" },
  { id: "finalizado", title: "Finalizado", color: "bg-green-100 text-green-700" },
];

const PRIORITY_COLORS: Record<string, string> = {
  baixa: "bg-blue-100 text-blue-600",
  media: "bg-gray-100 text-gray-600",
  alta: "bg-orange-100 text-orange-600",
  urgente: "bg-red-100 text-red-600",
};

export default function KanbanBoard({ initialPedidos }: KanbanProps) {
  const [pedidos, setPedidos] = useState(initialPedidos);

  async function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const pedidoId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    // Optimistic update
    const updatedPedidos = pedidos.map(p => 
      p.id === pedidoId ? { ...p, status: newStatus } : p
    );
    setPedidos(updatedPedidos);

    try {
      const res = await updateStatus(pedidoId, newStatus);
      if (res.success) {
        toast.success(`Status atualizado para ${newStatus}`);
      } else {
        toast.error("Erro ao atualizar status.");
        setPedidos(pedidos); // Rollback
      }
    } catch (error) {
      toast.error("Erro de conexão.");
      setPedidos(pedidos); // Rollback
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-8 min-h-[70vh]">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-80">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${col.color}`}>
                  {col.title}
                </span>
                <span className="text-gray-400 text-xs">
                  {pedidos.filter(p => p.status === col.id).length}
                </span>
              </div>
            </div>

            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex flex-col gap-3 p-3 rounded-2xl min-h-[500px] transition-colors ${
                    snapshot.isDraggingOver ? "bg-blue-50/50 outline-2 outline-dashed outline-blue-200" : "bg-gray-50/50"
                  }`}
                >
                  {pedidos
                    .filter((p) => p.status === col.id)
                    .map((p, index) => (
                      <Draggable key={p.id} draggableId={p.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 group hover:shadow-md hover:border-blue-200 transition-all ${
                              snapshot.isDragging ? "shadow-xl border-blue-400 ring-4 ring-blue-500/10" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${PRIORITY_COLORS[p.prioridade]}`}>
                                {p.prioridade}
                              </span>
                              <Link 
                                href={`/pedidos/${p.id}/edit`}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Edit2 size={14} />
                              </Link>
                            </div>

                            <h4 className="font-bold text-gray-900 mb-1 leading-tight">{p.cliente}</h4>
                            <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{p.descricao}</p>

                            <div className="flex items-center justify-between text-gray-400 pt-3 border-t border-gray-50">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-mono font-bold">#{p.id}</span>
                              </div>
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                                  {p.cliente.charAt(0)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
