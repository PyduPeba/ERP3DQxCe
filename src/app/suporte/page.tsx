import DashboardLayout from "../components/layout/DashboardLayout";
import Link from "next/link";
import { Wrench, ClipboardList, Package, Clock, BarChart3, Users, TrendingUp, AlertTriangle, Monitor } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SuporteDashboard() {
    // Buscar estatísticas e config do sistema
    let chamadosAbertos = 0;
    let osAndamento = 0;
    let itensEstoque = 0;
    let locacoesAtivas = 0;
    let itensEstoqueBaixo = 0;
    let ativosATI = 0;
    let systemConfig = null;

    try {
        // Buscar Config de Branding
        systemConfig = await prisma.systemConfig.findUnique({ where: { id: 1 } });
        if (!systemConfig) {
            systemConfig = await prisma.systemConfig.create({ data: { id: 1, brandingText: "ERP Profissional" } });
        }

        const countSafe = async (model: any, where?: any) => {
            try {
                if (model && typeof model.count === "function") {
                    return await model.count(where ? { where } : {});
                }
                return 0;
            } catch (e) {
                console.error("Error counting model:", e);
                return 0;
            }
        };

        // Contagens com status (Incase of capitalization issues, we check both or just ensure they exist)
        const [cAbertos, osAnd, iEstoque, lAtivas, aATI] = await Promise.all([
            countSafe(prisma.chamado, { 
                status: { in: ["aberto", "em_andamento", "pendente", "ABERTO", "EM_ANDAMENTO", "PENDENTE", "Aberto", "Pendente"] } 
            }),
            countSafe(prisma.ordemServico, { 
                status: { in: ["pendente", "em_andamento", "PENDENTE", "EM_ANDAMENTO", "Pendente", "Em Andamento"] } 
            }),
            countSafe(prisma.itemEstoque),
            countSafe(prisma.contratoLocacao, { 
                status: { in: ["ATIVO", "ativo", "Ativo", "ATRASADO", "atrasado", "Atrasado"] } 
            }),
            countSafe(prisma.ativoInterno)
        ]);

        chamadosAbertos = cAbertos;
        osAndamento = osAnd;
        itensEstoque = iEstoque;
        locacoesAtivas = lAtivas;
        ativosATI = aATI;

        // Itens com estoque baixo
        const allItens = await prisma.itemEstoque.findMany({ select: { quantidade: true, minimo: true } });
        itensEstoqueBaixo = allItens.filter((i: any) => i.quantidade <= (i.minimo || 0)).length;
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
    }

    const modules = [
        { 
            name: "Helpdesk", 
            desc: "Suporte Técnico e Chamados", 
            icon: Wrench, 
            color: "bg-blue-500",
            href: "/suporte/helpdesk",
            stat: `${chamadosAbertos} abertos`
        },
        { 
            name: "Ordens de Serviço", 
            desc: "Gestão de OS e Peças", 
            icon: ClipboardList, 
            color: "bg-emerald-500",
            href: "/suporte/os",
            stat: `${osAndamento} em andamento`
        },
        { 
            name: "Assistência Interna (ATI)", 
            desc: "Ativos e Manutenção Interna", 
            icon: Monitor, 
            color: "bg-indigo-600",
            href: "/suporte/ati",
            stat: `${ativosATI} ativos`
        },
        { 
            name: "Controle de Estoque", 
            desc: "Entradas, Saídas e Inventário", 
            icon: Package, 
            color: "bg-amber-500",
            href: "/suporte/estoque",
            stat: `${itensEstoque} itens`
        },
        { 
            name: "Locação", 
            desc: "Contratos e Equipamentos", 
            icon: Clock, 
            color: "bg-purple-500",
            href: "/suporte/locacao",
            stat: `${locacoesAtivas} ativos`
        },
        { 
            name: "Relatórios", 
            desc: "Dashboards e Métricas", 
            icon: BarChart3, 
            color: "bg-gray-500",
            href: "/suporte/relatorios",
            stat: "Visualizar"
        },
    ];

  const stats = [
    { label: "Chamados Abertos", value: chamadosAbertos, icon: Wrench, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "OS em Andamento", value: osAndamento, icon: ClipboardList, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Locações Ativas", value: locacoesAtivas, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Estoque Baixo", value: itensEstoqueBaixo, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{systemConfig?.brandingText || "ERP Profissional"}</h1>
          <p className="text-gray-500 mt-2">Suporte Técnico, Gestão e Controle de Estoque</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Módulos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <Link key={m.name} href={m.href}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group h-full">
                  <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{m.name}</h3>
                  <p className="text-gray-500 mt-2 text-sm">{m.desc}</p>
                  <p className="text-xs text-gray-400 mt-3 font-medium">{m.stat}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
