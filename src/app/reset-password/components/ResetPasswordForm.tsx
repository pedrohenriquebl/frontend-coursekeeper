"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { authService } from "@/services/api/user/authService";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!password) newErrors.password = "Senha é obrigatória";
        else if (password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";

        if (password !== confirmPassword) newErrors.confirmPassword = "Senhas não coincidem";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await authService.resetPassword(token, password);
            router.push("/auth?success=senha-resetada");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrors({ general: err.message });
            } else {
                setErrors({ general: "Erro ao redefinir senha" });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--authform-bg-gradient)" }}>
            <div className="w-full max-w-md backdrop-blur-sm rounded-xl p-6 shadow-lg" >
                <h1 className="text-2xl font-bold text-white mb-4 text-center">Redefinir Senha</h1>

                {errors.general && <p className="text-red-400 mb-2 text-center">{errors.general}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nova senha"
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(!showPassword)}
                        error={errors.password}
                        disabled={isLoading}
                    />
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme a nova senha"
                        showPassword={showConfirmPassword}
                        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                        error={errors.confirmPassword}
                        disabled={isLoading}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg font-medium ${isLoading
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
                            }`}
                    >
                        {isLoading ? "Carregando..." : "Redefinir senha"}
                    </button>
                </form>
            </div>
        </div>
    );
}
