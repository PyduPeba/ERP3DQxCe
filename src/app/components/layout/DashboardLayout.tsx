"use client";
import Link from "next/link";
import { useState } from "react";
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Printer,
    Settings,
    Flame
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const menuItems = [
        { href: "/", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/pedidos", icon: ShoppingCart, label: "Pedidos" },
        { href: "/clientes", icon: Users, label: "Clientes" },
        { href: "/producao", icon: Printer, label: "Produção" },
        { href: "/config", icon: Settings, label: "Configurações" },
    ];

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
                <nav className="flex-1 p-3 space-y-2">
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
