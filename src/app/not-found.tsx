"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        background: "var(--authform-bg-gradient)",
        color: "var(--profile-header-title)",
      }}
    >
      {/* Aura de fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-[color:var(--authform-primary)]/20 blur-3xl animate-pulse"></div>
      </div>

      <div
        className="relative p-10 shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: "var(--profile-header-bg)",
          border: "1.5px solid var(--profile-header-border)",
          borderRadius: "28px 16px 28px 16px",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles
            size={36}
            className="text-[color:var(--authform-primary)] animate-pulse drop-shadow-md"
          />
          <span className="text-5xl font-extrabold tracking-tight">404</span>
        </div>

        <h1
          className="text-2xl font-semibold mb-3 text-center"
          style={{ color: "var(--profile-header-title)" }}
        >
          Página não encontrada
        </h1>

        <p className="text-[color:var(--profile-header-meta)] mb-8 max-w-md text-center leading-relaxed">
          Opa! Parece que você tentou acessar uma página que não existe ou foi
          removida. <br />
          Volte para a página inicial e continue explorando.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-block px-7 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            style={{
              background: "var(--authform-primary)",
              color: "var(--primary-foreground)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--authform-primary-hover, var(--authform-primary-light))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--authform-primary)";
            }}
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
