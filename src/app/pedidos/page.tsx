import DashboardLayout from "../components/layout/DashboardLayout";
import { prisma } from "../lib/prisma";

export default async function Pedidos() {
    const pedidos = await prisma.pedido.findMany({
        orderBy: { id: "desc" },
    });

    type PedidoType = typeof pedidos[number];

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Pedidos</h2>

            <div className="bg-white p-4 rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">Cliente</th>
                            <th className="text-left p-2">Descrição</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pedidos.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    Nenhum pedido encontrado
                                </td>
                            </tr>
                        ) : (
                            pedidos.map((p: PedidoType) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{p.id}</td>
                                    <td className="p-2">{p.cliente}</td>
                                    <td className="p-2">{p.descricao}</td>
                                    <td className="p-2">
                                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
