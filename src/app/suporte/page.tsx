import DashboardLayout from "../components/layout/DashboardLayout";
import Link from "next/link";
import { Wrench, ClipboardList, Package, Clock, BarChart3, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { prisma } from "../lib/prisma";

export default async function SuporteDashboard() {
  // Buscar estatísticas
  const [chamadosAbertos, osAndamento, itensEstoque, locacoesAtivas] = await Promise.all([
    prisma.chamado.count({ where: { status: { in: ["aberto", "em_andamento"] } } }),
    prisma.ordemServico.count({ where: { status: { in: ["pendente", "em_andamento"] } } }),
    prisma.itemEstoque.count(),
    prisma.locacao.count({ where: { status: "ativo" } }),
  ]);

  // Itens com estoque baixo
  const itensEstoqueBaixo = await prisma.itemEstoque.count({
    where: {
      quantidade: {
        lte: prisma.itemEstoque.fields.minimo,
      },
    },
  });

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
          <h1 className="text-3xl font-bold text-gray-900">ERP Profissional</h1>
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
