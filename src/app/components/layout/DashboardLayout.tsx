"use client";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Printer,
    Settings,
    Flame,
    Sparkles,
    Box,
    Type,
    Key,
    Dog,
    Link2,
    ChevronDown,
    Wrench,
    ClipboardList,
    Package,
    Clock,
    BarChart3,
    LogOut,
    Shield,
    Monitor,
    FileText,
    Menu,
    X
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
    const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    // Dropdown states - initialized based on current path for persistence across remounts
    const [isStudioOpen, setIsStudioOpen] = useState(pathname.startsWith('/estudio') || pathname.startsWith('/producao'));
    const [isGestaoOpen, setIsGestaoOpen] = useState(pathname.startsWith('/suporte') && !pathname.startsWith('/suporte/locacao'));
    const [isLocacaoOpen, setIsLocacaoOpen] = useState(pathname.startsWith('/suporte/locacao'));
    
    // Auth & Permissions
    const { user, permissions, loading: permLoading, canDo } = usePermissions();
    const [systemConfig, setSystemConfig] = useState<any>(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpenMobile(false);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!permLoading && !user) {
            router.push("/login");
        }

        // Fetch system config (branding)
        fetch("/api/config/system")
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setSystemConfig(data);
            })
            .catch(() => {});
    }, [user, permLoading, router]);

    const canAccess = (module: string) => canDo(module, 'canView');

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const menuItems = [
        { href: "/suporte", icon: LayoutDashboard, label: "Dashboard", module: 'DASHBOARD' },
        { href: "/pedidos", icon: ShoppingCart, label: "Pedidos", module: 'PEDIDOS' },
        { href: "/clientes", icon: Users, label: "Clientes", module: 'CLIENTES' },
    ];

    const studioItems = [
        { href: "/estudio/letra-caixa", icon: Box, label: "Letra Caixa" },
        { href: "/estudio/frase-decorativa", icon: Type, label: "Frase Decorativa" },
        { href: "/estudio/nome-decorativo", icon: Type, label: "Nome Decorativo" },
        { href: "/estudio/chaveiro-articulado", icon: Link2, label: "Articulado" },
        { href: "/estudio/chaveiros", icon: Key, label: "Chaveiros" },
        { href: "/estudio/tags-pet", icon: Dog, label: "Tags PET" },
        { href: "/producao", icon: Printer, label: "Produção", module: 'PRODUCAO' },
    ];

    const gestaoItems = [
        { href: "/suporte/helpdesk", icon: Wrench, label: "Helpdesk" },
        { href: "/suporte/os", icon: ClipboardList, label: "Ordens de Serviço" },
        { href: "/suporte/ati", icon: Monitor, label: "Assistência Interna (ATI)" },
        { href: "/suporte/estoque", icon: Package, label: "Estoque" },
        { href: "/suporte/relatorios", icon: BarChart3, label: "Relatórios" },
    ];

    const locacaoItems = [
        { href: "/suporte/locacao", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/suporte/locacao/equipamentos", icon: Monitor, label: "Equipamentos" },
        { href: "/suporte/locacao/contratos", icon: FileText, label: "Contratos" },
    ];

    const settingsItem = { href: "/config", icon: Settings, label: "Configurações", module: 'CONFIG' };

    const visibleModulesCount = [
        'DASHBOARD',
        'PEDIDOS',
        'CLIENTES',
        'ESTUDIO',
        'GESTAO',
        'LOCACAO',
        'CONFIG'
    ].filter(m => canAccess(m)).length;

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 italic-sidebar">
            {/* MOBILE HEADER */}
            {isMobile && (
                <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 z-50 border-b border-gray-800 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl shadow-lg" style={{ backgroundColor: systemConfig?.brandingColor || '#f97316' }}>
                            <Flame size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight uppercase italic">{systemConfig?.brandingText || 'ERP 3D'}</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        {isSidebarOpenMobile ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>
            )}

            {/* OVERLAY MOBILE */}
            {isMobile && isSidebarOpenMobile && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsSidebarOpenMobile(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-50
                    ${isMobile 
                        ? `fixed inset-y-0 left-0 w-72 transform ${isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full shadow-2xl shadow-black/50'} ` 
                        : `${isDesktopExpanded ? "w-64" : "w-20"}`
                    }
                `}
            >
                {/* SIDEBAR HEADER (Desktop only or Drawer top) */}
                <div className="h-16 flex items-center px-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4 overflow-hidden w-full">
                        <div className="p-2 rounded-xl shadow-lg shadow-orange-950/20" style={{ backgroundColor: systemConfig?.brandingColor || '#f97316' }}>
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-xl font-black tracking-tight uppercase italic transition-all duration-300 ${(!isMobile && !isDesktopExpanded) ? "opacity-0 w-0 invisible" : "opacity-100"}`}>
                            {systemConfig?.brandingText || 'ERP 3D'}
                        </span>
                        
                        {!isMobile && (visibleModulesCount > 2) && (
                            <button 
                                onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
                                className="ml-auto p-1.5 hover:bg-gray-800 rounded-lg text-gray-400"
                            >
                                <ChevronDown className={`w-4 h-4 transition-transform ${isDesktopExpanded ? 'rotate-90' : '-rotate-90'}`} />
                            </button>
                        )}
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        // Special check for Dashboard (always allow or check)
                        if (item.module !== 'DASHBOARD' && !canAccess(item.module)) return null;
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group"
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                    {/* STUDIO SECTION */}
                    {canAccess('ESTUDIO') && (
                        <div className="pt-4 border-t border-gray-800 mt-4">
                            <button
                                onClick={() => setIsStudioOpen(!isStudioOpen)}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-400" />
                                    <span
                                        className={`whitespace-nowrap font-semibold transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                            }`}
                                    >
                                        Estúdio 3D
                                    </span>
                                </div>
                                {(isMobile || isDesktopExpanded) && (
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isStudioOpen ? 'rotate-180' : ''}`} />
                                )}
                            </button>

                            {(isStudioOpen && (isMobile || isDesktopExpanded)) && (
                                <div className="mt-2 ml-4 space-y-1">
                                    {studioItems.map((item) => {
                                        if (item.module && !canAccess(item.module)) return null;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                                            >
                                                <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                <span className="text-sm whitespace-nowrap">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* GESTÃO PROFISSIONAL SECTION */}
                    {canAccess('GESTAO') && (
                        <div className="pt-4 border-t border-gray-800 mt-4">
                            <button
                                onClick={() => setIsGestaoOpen(!isGestaoOpen)}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Wrench className="w-5 h-5 flex-shrink-0 text-blue-400" />
                                    <span
                                        className={`whitespace-nowrap font-semibold transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                            }`}
                                    >
                                        Gestão Profissional
                                    </span>
                                </div>
                                {(isMobile || isDesktopExpanded) && (
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isGestaoOpen ? 'rotate-180' : ''}`} />
                                )}
                            </button>

                            {(isGestaoOpen && (isMobile || isDesktopExpanded)) && (
                                <div className="mt-2 ml-4 space-y-1">
                                    {gestaoItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                                        >
                                            <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                            <span className="text-sm whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* LOCAÇÃO SECTION */}
                    {canAccess('LOCACAO') && (
                        <div className="pt-4 border-t border-gray-800 mt-4">
                            <button
                                onClick={() => setIsLocacaoOpen(!isLocacaoOpen)}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                                    <span
                                        className={`whitespace-nowrap font-semibold transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                            }`}
                                    >
                                        Locação
                                    </span>
                                </div>
                                {(isMobile || isDesktopExpanded) && (
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isLocacaoOpen ? 'rotate-180' : ''}`} />
                                )}
                            </button>

                            {(isLocacaoOpen && (isMobile || isDesktopExpanded)) && (
                                <div className="mt-2 ml-4 space-y-1">
                                    {locacaoItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                                        >
                                            <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                            <span className="text-sm whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-800 mt-4">
                        {canAccess('CONFIG') && (
                            <Link
                                href={settingsItem.href}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group"
                            >
                                <settingsItem.icon className="w-5 h-5 flex-shrink-0 text-gray-400" />
                                <span
                                    className={`whitespace-nowrap transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                        }`}
                                >
                                    {settingsItem.label}
                                </span>
                            </Link>
                        )}
                        
                         {user && user.perfil === 'SUPERADMIN' && (
                             <Link
                                 href="/admin/users"
                                 className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-900/30 text-red-100 transition-colors group mt-2 border border-red-900/50"
                             >
                                 <Shield className="w-5 h-5 flex-shrink-0 text-red-500" />
                                 <span
                                     className={`whitespace-nowrap transition-opacity duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100" : "opacity-0 w-0 invisible"
                                         }`}
                                 >
                                     Gestão de Usuários
                                 </span>
                             </Link>
                         )}
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg shadow-blue-900/40">
                            {user ? user.nome.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div
                            className={`flex flex-col overflow-hidden transition-all duration-300 ${(isMobile || isDesktopExpanded) ? "opacity-100 w-auto" : "opacity-0 w-0 invisible"
                                }`}
                        >
                            <span className="text-sm font-bold truncate text-white">{user ? user.nome : 'Guest'}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black leading-tight">{user ? user.perfil : ''}</span>
                        </div>
                         {(isMobile || isDesktopExpanded) && (
                            <button 
                                onClick={handleLogout}
                                className="ml-auto text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-gray-800 rounded-lg"
                                title="Sair"
                            >
                                <LogOut size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            <main className={`flex-1 p-4 md:p-8 overflow-auto transition-all duration-300 ${isMobile ? "mt-16" : ""}`}>
                {children}
            </main>
        </div>
    );
}
