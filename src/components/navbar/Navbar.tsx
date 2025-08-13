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
        { name: "Relatórios", href: "/reports", icon: BarChart3 },
        { name: "Perfil", href: "/profile", icon: User },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Navigation Header */}
            <nav className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-2 rounded-lg group-hover:from-emerald-700 group-hover:to-green-700 transition-all duration-200">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                CourseKeeper
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent",
                                            isActive(item.href)
                                                ? "bg-emerald-900/50 text-emerald-400 shadow-sm border-emerald-900/50"
                                                : "text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.name}</span>
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
                                className="cursor-pointer flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm font-medium">Sair</span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
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
                    <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700/60">
                        <div className="px-4 py-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                            isActive(item.href)
                                                ? "bg-emerald-900/50 text-emerald-400"
                                                : "text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50",
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    logoutUser();
                                }}
                                className="cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-200"
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
