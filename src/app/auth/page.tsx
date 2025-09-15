"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthContent() {
    const params = useSearchParams();
    const success = params.get("success");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700/50 flex flex-col items-center">
                {success === "senha-resetada" && (
                    <div className="mb-6">
                        <p className="text-emerald-400 font-semibold text-center text-base">
                            Sua senha foi redefinida com sucesso!
                        </p>
                    </div>
                )}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-3 rounded-xl inline-block mb-4">
                    <Lock className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2 text-center">
                    Login
                </h1>
                <p className="text-gray-400 text-sm mb-8 text-center">
                    Acesse sua conta para continuar
                </p>
                <Link
                    href="/login"
                    className="w-full cursor-pointer py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 focus:ring-4 focus:ring-emerald-500/20 text-center"
                >
                    Ir para login
                </Link>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
                <div className="text-white">Carregando...</div>
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}