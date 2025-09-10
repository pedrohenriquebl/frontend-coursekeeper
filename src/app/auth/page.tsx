"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const params = useSearchParams();
  const success = params.get("success");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {success === "senha-resetada" && (
        <p className="mb-4 text-green-400 font-semibold">
          Sua senha foi redefinida com sucesso!
        </p>
      )}
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Link
        href="/login"
        className="bg-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-700"
      >
        Ir para login
      </Link>
    </div>
  );
}
