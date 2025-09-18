"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "var(--authform-bg-gradient)",
        color: "var(--profile-page-text)",
      }}
    >
      <div
        className="relative p-6 md:p-8 shadow-lg overflow-hidden transition-transform duration-200 ease-out backdrop-blur-xl rounded-[24px_12px_24px_12px] border"
        style={{
          background: "var(--profile-header-bg)",
          borderColor: "var(--profile-header-border)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles
            size={32}
            className="text-[color:var(--authform-primary)] animate-pulse"
          />
          <span
            className="text-4xl font-bold tracking-tight"
            style={{ color: "var(--profile-header-title)" }}
          >
            404
          </span>
        </div>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--profile-header-title)" }}
        >
          Página não encontrada
        </h1>
        <p
          className="mb-6 max-w-md"
          style={{ color: "var(--profile-header-meta)" }}
        >
          Opa! Parece que você tentou acessar uma página que não existe ou foi
          removida.
          <br />
          Volte para a página inicial para continuar navegando.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-lg font-semibold transition-colors"
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
  );
}
