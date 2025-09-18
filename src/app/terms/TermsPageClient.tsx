"use client";

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/Navbar";
import { useAuthUser } from "@/context/authUserContext";
import Link from "next/link";

export default function TermsPageClient() {
  const { user } = useAuthUser();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {user && <NavBar />}
      <div
        className="flex flex-col items-center mt-auto justify-center px-4"
        style={{
          background: user ? undefined : "var(--authform-bg-gradient)",
          color: user ? undefined : "var(--profile-page-text)",
        }}
      >
        <div
          className="flex-1 p-6 md:p-8 shadow-lg overflow-hidden transition-transform duration-200 ease-out backdrop-blur-xl rounded-[24px_12px_24px_12px] border"
          style={{ background: "var(--profile-header-bg)", borderColor: "var(--profile-header-border)" }}
        >
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--profile-header-title)" }}>Termos de Aceite</h1>
          <div className="mb-6 max-w-xl text-sm" style={{ color: "var(--profile-header-meta)" }}>
            <p>Bem-vindo ao CourseKeeper! Ao utilizar nossos serviços, você concorda com os seguintes termos de uso:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Você deve fornecer informações verdadeiras e manter sua conta segura.</li>
              <li>Não é permitido utilizar a plataforma para fins ilícitos ou prejudiciais.</li>
              <li>O conteúdo disponibilizado é protegido por direitos autorais e não pode ser reproduzido sem autorização.</li>
              <li>Reservamo-nos o direito de modificar estes termos a qualquer momento.</li>
            </ul>
            <p className="mt-4">Para mais detalhes, consulte também nossa <Link href="/privacy" className="underline text-[color:var(--authform-primary)] hover:text-[color:var(--authform-primary-hover,var(--authform-primary-light))]">Política de Privacidade</Link>.</p>
          </div>
          <Link
            href="/"
            className="inline-block px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{ background: "var(--authform-primary)", color: "var(--primary-foreground)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--authform-primary-hover, var(--authform-primary-light))";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--authform-primary)";
            }}
          >
            Voltar para o início
          </Link>
        </div>
      </div>
      {user && <Footer />}
    </div>
  );
}
