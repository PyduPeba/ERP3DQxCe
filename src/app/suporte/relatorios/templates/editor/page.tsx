"use client";

import DashboardLayout from "@/app/components/layout/DashboardLayout";
import PermissionGuard from "@/app/components/auth/PermissionGuard";
import TemplateEditor from "@/app/components/suporte/TemplateEditor";
import { VisualTemplate } from "@/types/templateTypes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TemplateEditorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get('id');
    
    const [template, setTemplate] = useState<VisualTemplate | undefined>();
    const [loading, setLoading] = useState(!!templateId);
    const [previewData, setPreviewData] = useState<any>(null);

    useEffect(() => {
        // Load template if editing
        if (templateId) {
            loadTemplate(templateId);
        }
        
        // Load preview data
        loadPreviewData();
    }, [templateId]);

    const loadTemplate = async (id: string) => {
        try {
            const res = await fetch(`/api/suporte/relatorios/templates/visual/${id}`);
            if (res.ok) {
                const data = await res.json();
                setTemplate(data);
            }
        } catch (error) {
            toast.error("Erro ao carregar template");
        } finally {
            setLoading(false);
        }
    };

    const loadPreviewData = async () => {
        try {
            // Fetch sample data for preview
            const prestadorRes = await fetch("/api/configuracoes/prestador");
            const prestador = await prestadorRes.json();
            
            setPreviewData({
                prestador,
                cliente: {
                    nome: "PREFEITURA MUNICIPAL DE EXEMPLO",
                    cpfCnpj: "00.000.000/0001-00",
                    logradouro: "Rua Principal",
                    numero: "100",
                    bairro: "Centro",
                    cidade: "Cidade",
                    estado: "UF"
                },
                relatorio: {
                    numero: "REL-000001",
                    mesReferencia: new Date().getMonth() + 1,
                    anoReferencia: new Date().getFullYear(),
                    dataGeracao: new Date()
                },
                itens: [
                    {
                        data: new Date(),
                        descricaoServico: "Manutenção preventiva em equipamento de rede",
                        equipamento: "Switch 24 portas",
                        tombo: "TI-001",
                        status: "Concluído",
                        fotos: []
                    }
                ]
            });
        } catch (error) {
            console.error("Erro ao carregar dados de preview", error);
        }
    };

    const handleSave = async (template: VisualTemplate) => {
        try {
            const method = templateId ? "PUT" : "POST";
            const url = templateId 
                ? `/api/suporte/relatorios/templates/visual/${templateId}`
                : "/api/suporte/relatorios/templates/visual";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(template)
            });

            if (res.ok) {
                toast.success("Template salvo com sucesso!");
                router.push("/suporte/relatorios?tab=templates");
            } else {
                const error = await res.json();
                toast.error(error.error || "Erro ao salvar template");
            }
        } catch (error) {
            toast.error("Erro na comunicação com o servidor");
        }
    };

    if (loading) {
        return (
            <PermissionGuard module="SUPORTE">
                <DashboardLayout>
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-gray-500">Carregando editor...</p>
                    </div>
                </DashboardLayout>
            </PermissionGuard>
        );
    }

    return (
        <PermissionGuard module="SUPORTE">
            <div className="h-screen flex flex-col">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
                    <Link 
                        href="/suporte/relatorios?tab=templates" 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {templateId ? 'Editar Template Visual' : 'Novo Template Visual'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Arraste e configure blocos para criar seu template personalizado
                        </p>
                    </div>
                </div>

                {/* Editor */}
                <TemplateEditor
                    initialTemplate={template}
                    previewData={previewData}
                    onSave={handleSave}
                />
            </div>
        </PermissionGuard>
    );
}
