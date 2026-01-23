"use client";

import { useEffect, useState } from "react";
import { Monitor, FileText, TrendingUp, AlertCircle, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import DashboardLayout from "@/app/components/layout/DashboardLayout";

export default function LocacaoDashboard() {
  const [stats, setStats] = useState({
    totalContratos: 0,
    contratosAtivos: 0,
    totalEquipamentos: 0,
    equipamentosDisponiveis: 0,
    equipamentosLocados: 0,
    faturamentoMensal: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [resContratos, resEquipamentos] = await Promise.all([
           fetch("/api/locacao/contratos"),
           fetch("/api/locacao/equipamentos")
        ]);
        
        const contratos = await resContratos.json();
        const equipamentos = await resEquipamentos.json();

        if (Array.isArray(contratos) && Array.isArray(equipamentos)) {
            const ativos = contratos.filter((c: any) => c.status === 'ATIVO');
            setStats({
                totalContratos: contratos.length,
                contratosAtivos: ativos.length,
                totalEquipamentos: equipamentos.length,
                equipamentosDisponiveis: equipamentos.filter((e: any) => e.status === 'DISPONIVEL').length,
                equipamentosLocados: equipamentos.filter((e: any) => e.status === 'LOCADO').length,
                faturamentoMensal: ativos.reduce((acc: number, curr: any) => acc + (Number(curr.valorTotalMensal) || 0), 0)
            });
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-400">Carregando indicadores...</div>;

  return (
    <PermissionGuard module="LOCAÇÃO">
        <DashboardLayout>
            <div className="p-6 max-w-7xl mx-auto space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Locação de Equipamentos</h1>
                <p className="text-slate-500">Visão geral do seus ativos e locações.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText size={20}/></div>
                          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">ATIVOS</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-800">{stats.contratosAtivos}</div>
                      <p className="text-sm text-slate-500">Contratos vigentes</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp size={20}/></div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800">R$ {stats.faturamentoMensal.toFixed(2)}</div>
                      <p className="text-sm text-slate-500">Receita mensal recorrente</p>
                  </div>

                  <Link href="/suporte/locacao/equipamentos" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-300 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Monitor size={20}/></div>
                          <div className="text-xs text-slate-400 group-hover:text-indigo-600">Ver todos &rarr;</div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800">{stats.totalEquipamentos}</div>
                      <p className="text-sm text-slate-500">{stats.equipamentosDisponiveis} Disponíveis / {stats.equipamentosLocados} Locados</p>
                  </Link>

                  <Link href="/suporte/locacao/contratos" className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-300 transition-colors group">
                       <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertCircle size={20}/></div>
                          <div className="text-xs text-slate-400 group-hover:text-indigo-600">Gerenciar &rarr;</div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800">{stats.totalContratos}</div>
                      <p className="text-sm text-slate-500">Total de contratos gerados</p>
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/suporte/locacao/contratos" className="p-6 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow flex items-center gap-4 group">
                  <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Novo Contrato</h3>
                    <p className="text-sm text-slate-500">Iniciar nova locação</p>
                  </div>
                </Link>
                
                <Link href="/" className="p-6 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow flex items-center gap-4 group">
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <LayoutDashboard size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Menu Principal</h3>
                    <p className="text-sm text-slate-500">Voltar para o início</p>
                  </div>
                </Link>
              </div>

              <div className="flex gap-4">
                  <Link href="/suporte/locacao/contratos" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">
                     + Novo Contrato
                  </Link>
                  <Link href="/suporte/locacao/equipamentos" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                     + Cadastrar Equipamento
                  </Link>
              </div>
            </div>
        </DashboardLayout>
    </PermissionGuard>
  );
}
