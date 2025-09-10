"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import { authService } from "@/services/api/user/authService";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Digite seu e-mail");
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.requestPasswordReset(email);

      if (res?.message) {
        setSuccess(res.message);
      } else {
        setError("Não foi possível enviar o e-mail.");
      }
    } catch (err) {
      setError("Erro ao solicitar redefinição de senha.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md lg:min-h-[400px]">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-3 rounded-xl inline-block mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
            Esqueci minha senha
          </h1>
          <p className="text-gray-400 text-sm">
            Digite seu e-mail para receber instruções de redefinição de senha
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            icon={<Mail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error || undefined}
            disabled={isLoading}
          />

          {error && <ErrorMessage message={error} />}
          {success && (
            <p className="text-sm text-emerald-400 text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "cursor-pointer w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              isLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 focus:ring-4 focus:ring-emerald-500/20"
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="text-gray-400" />
                Enviando...
              </div>
            ) : (
              "Enviar instruções"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
