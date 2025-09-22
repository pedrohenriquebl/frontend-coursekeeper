'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const links = [
        { href: "/terms", label: "Termos de Uso" },
        { href: "/privacy", label: "Política de Privacidade" },
        { href: "mailto:suporte@coursekeeper.com", label: "Suporte", isExternal: true },
    ];
    return (
        <footer         
            className="w-full m-auto py-2 px-6 border-t shadow-inner backdrop-blur-xl flex flex-col flex-wrap md:flex-row items-center justify-between gap-2 text-sm"
            style={{
                background: "var(--profile-header-bg)",
                borderColor: "var(--profile-header-border)",
                color: "var(--profile-header-meta)"
            }}
        >
            <div className="max-w-7xl w-full flex align-center items-center justify-between flex-1 m-auto flex-col sm:flex-row">
                <div className="flex items-center gap-2 flex-col sm:flex-row">
                    <span className="font-bold text-[color:var(--authform-primary)]">CourseKeeper</span>
                    <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-4 flex-col sm:flex-row">
                    {links.map((link) => {
                        const active = pathname === link.href;
                        return (

                            link.isExternal ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-[color:var(--authform-primary)] transition-colors underline-offset-2 underline"
                                    style={{ textDecorationColor: "var(--authform-primary)" }}
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent group",
                                        active
                                            ? "bg-[color:var(--navbar-link-active-bg,#022c22)] text-[color:var(--navbar-link-active-text,#34d399)] shadow-sm border-[color:var(--navbar-link-active-border,#022c22)]"
                                            : "text-[color:var(--plan-card-title,#d1d5db)] hover:text-[color:var(--navbar-link-hover-text,#34d399)] hover:bg-[color:var(--navbar-link-hover-bg,#1f2937)]"
                                    )}
                                    style={pathname !== link.href ? { textDecorationColor: "var(--authform-primary)" } : {}}
                                >
                                    {link.label}
                                </Link>
                            )
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}