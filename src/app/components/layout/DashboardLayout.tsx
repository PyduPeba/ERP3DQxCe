"use client";
import Link from "next/link";
import { useState } from "react";
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
    ChevronDown
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isStudioOpen, setIsStudioOpen] = useState(false);

    const menuItems = [
        { href: "/", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/pedidos", icon: ShoppingCart, label: "Pedidos" },
        { href: "/clientes", icon: Users, label: "Clientes" },
        { href: "/producao", icon: Printer, label: "Produção" },
    ];

    const studioItems = [
        { href: "/estudio/letra-caixa", icon: Box, label: "Letra Caixa" },
        { href: "/estudio/frase-decorativa", icon: Type, label: "Frase Decorativa" },
        { href: "/estudio/nome-decorativo", icon: Type, label: "Nome Decorativo" },
        { href: "/estudio/chaveiro-articulado", icon: Link2, label: "Articulado" },
        { href: "/estudio/chaveiros", icon: Key, label: "Chaveiros" },
        { href: "/estudio/tags-pet", icon: Dog, label: "Tags PET" },
    ];

    const settingsItem = { href: "/config", icon: Settings, label: "Configurações" };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <aside
                className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"
                    }`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* HEADER */}
                <div className="h-16 flex items-center justify-center border-b border-gray-700 px-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Flame className="w-6 h-6 text-orange-500 flex-shrink-0" />
                        <span
                            className={`text-xl font-bold whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                                }`}
                        >
                            ERP 3D
                        </span>
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group"
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span
                                className={`whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    {/* STUDIO SECTION */}
                    <div className="pt-4 border-t border-gray-700 mt-4">
                        <button
                            onClick={() => isExpanded && setIsStudioOpen(!isStudioOpen)}
                            className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group text-left"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-400" />
                                <span
                                    className={`whitespace-nowrap font-semibold transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                                        }`}
                                >
                                    Estúdio 3D
                                </span>
                            </div>
                            {isExpanded && (
                                <ChevronDown className={`w-4 h-4 transition-transform ${isStudioOpen ? 'rotate-180' : ''}`} />
                            )}
                        </button>

                        {(isExpanded && isStudioOpen) && (
                            <div className="mt-2 ml-4 space-y-1">
                                {studioItems.map((item) => (
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
                        {!isExpanded && (
                             <div className="flex flex-col items-center pt-2 space-y-4">
                                 {studioItems.map((item) => (
                                     <Link key={item.href} href={item.href} className="hover:text-amber-400 transition-colors">
                                         <item.icon className="w-4 h-4" />
                                     </Link>
                                 ))}
                             </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-700 mt-4">
                        <Link
                            href={settingsItem.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group"
                        >
                            <settingsItem.icon className="w-5 h-5 flex-shrink-0 text-gray-400" />
                            <span
                                className={`whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                                    }`}
                            >
                                {settingsItem.label}
                            </span>
                        </Link>
                    </div>
                </nav>

                {/* FOOTER */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="flex-shrink-0">🔥</span>
                        <span
                            className={`whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                                }`}
                        >
                            Powered by Kayk
                        </span>
                    </div>
                </div>
            </aside>

            {/* CONTEÚDO */}
            <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
    );
}
