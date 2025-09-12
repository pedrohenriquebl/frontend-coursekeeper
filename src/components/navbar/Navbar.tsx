'use client';

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    BookOpen,
    Menu,
    X,
    User,
    Target,
    BarChart3,
    Home,
    LogOut,
    DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthUser } from "@/context/authUserContext";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { logoutUser } = useAuthUser();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Cursos", href: "/courses", icon: BookOpen },
        { name: "Metas", href: "/goals", icon: Target },
        { name: "Relatórios", href: "/report", icon: BarChart3 },
        { name: "Perfil", href: "/profile", icon: User },
        { name: "Meu plano", href: "/subscriptions", icon: DollarSign },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
    <div className="bg-gradient-to-br from-[color:var(--navbar-bg-from,#111827)] via-[color:var(--navbar-bg-via,#1f2937)] to-[color:var(--navbar-bg-to,#111827)]">
            {/* Navigation Header */}
            <nav className="bg-[color:var(--navbar-header-bg,rgba(31,41,55,0.9))] backdrop-blur-md border-b border-[color:var(--navbar-header-border,rgba(75,85,99,0.3))] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-r from-[color:var(--navbar-logo-from,#059669)] to-[color:var(--navbar-logo-to,#22c55e)] p-2 rounded-lg group-hover:from-[color:var(--navbar-logo-hover-from,#047857)] group-hover:to-[color:var(--navbar-logo-hover-to,#16a34a)] transition-all duration-200">
                                <BookOpen className="h-6 w-6 text-[color:var(--navbar-logo-icon,#fff)]" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-[color:var(--navbar-logo-text-from,#34d399)] to-[color:var(--navbar-logo-text-to,#4ade80)] bg-clip-text text-transparent">
                                CourseKeeper
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent group",
                                            active
                                                ? "bg-[color:var(--navbar-link-active-bg,#022c22)] text-[color:var(--navbar-link-active-text,#34d399)] shadow-sm border-[color:var(--navbar-link-active-border,#022c22)]"
                                                : "text-[color:var(--navbar-link-text,#d1d5db)] hover:text-[color:var(--navbar-link-hover-text,#34d399)] hover:bg-[color:var(--navbar-link-hover-bg,#1f2937)]"
                                        )}
                                    >
                                        <Icon className={cn("h-4 w-4", !active && "group-hover:text-[color:var(--navbar-link-hover-text,#34d399)] group-hover:opacity-100")}/>
                                        <span className={!active ? "group-hover:text-[color:var(--navbar-link-hover-text,#34d399)] group-hover:opacity-100" : undefined}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* User Menu / Login */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    logoutUser();
                                }}
                                className="cursor-pointer flex items-center space-x-2 text-[color:var(--navbar-link-text,#d1d5db)] hover:text-[color:var(--navbar-link-logout-hover,#ef4444)] transition-colors duration-200"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm font-medium">Sair</span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-[color:var(--navbar-link-text,#d1d5db)] hover:bg-[color:var(--navbar-link-hover-bg,#1f2937)] transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[color:var(--navbar-header-bg-mobile,#1f2937)]/95 backdrop-blur-md border-t border-[color:var(--navbar-header-border-mobile,#374151)]/60">
                        <div className="px-4 py-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                                            active
                                                ? "bg-[color:var(--navbar-link-active-bg,#022c22)] text-[color:var(--navbar-link-active-text,#34d399)]"
                                                : "text-[color:var(--navbar-link-text,#d1d5db)] hover:text-[color:var(--navbar-link-hover-text,#34d399)] hover:bg-[color:var(--navbar-link-hover-bg,#1f2937)]",
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5", !active && "group-hover:text-[color:var(--navbar-link-hover-text,#34d399)] group-hover:opacity-100")}/>
                                        <span className={!active ? "group-hover:text-[color:var(--navbar-link-hover-text,#34d399)] group-hover:opacity-100" : undefined}>{item.name}</span>
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    logoutUser();
                                }}
                                className="cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-[color:var(--navbar-link-text,#d1d5db)] hover:text-[color:var(--navbar-link-logout-hover,#ef4444)] transition-colors duration-200"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Sair</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
