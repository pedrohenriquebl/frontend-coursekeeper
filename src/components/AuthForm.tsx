"use client";

import React from "react";
import { maskCPF } from "@/lib/mask";
import { User, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Input } from "./Input";
import { PasswordInput } from "./PasswordInput";
import { ErrorMessage } from "./ErrorMessage";
import { DemoCredentials } from "./DemoCredentials";
import { Spinner } from "./Spinner";

type AuthMode = "login" | "register";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
}

interface Errors {
    [key: string]: string;
}

interface AuthFormProps {
    mode: AuthMode;
    formData: FormData;
    showPassword: boolean;
    showConfirmPassword: boolean;
    isLoading: boolean;
    errors: Errors;
    isBlocked: boolean;
    handleInputChange: (field: keyof FormData, value: string) => void;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (e: React.FormEvent) => void;
    toggleMode: () => void;
}

export function AuthForm({
    mode,
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    errors,
    isBlocked,
    handleInputChange,
    setShowPassword,
    setShowConfirmPassword,
    onSubmit,
    toggleMode,
}: AuthFormProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-3 rounded-xl inline-block mb-4">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                        CourseKeeper
                    </h1>
                    <p className="text-gray-400">
                        {mode === "login"
                            ? "Entre na sua conta para continuar"
                            : "Crie sua conta para começar"}
                    </p>
                </div>

                <div className="flex bg-gray-700/50 rounded-lg p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => mode !== "login" && toggleMode()}
                        className={cn(
                            "cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                            mode === "login"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-gray-400 hover:text-gray-200"
                        )}
                    >
                        Entrar
                    </button>
                    <button
                        type="button"
                        onClick={() => mode !== "register" && toggleMode()}
                        className={cn(
                            "cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                            mode === "register"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-gray-400 hover:text-gray-200"
                        )}
                    >
                        Cadastrar
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {mode === "register" && (
                        <>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="Seu primeiro nome"
                                icon={<User />}
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                error={errors.firstName}
                                disabled={isLoading}
                            />
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Seu sobrenome"
                                icon={<User />}
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                error={errors.lastName}
                                disabled={isLoading}
                            />
                            <Input
                                id="cpf"
                                type="text"
                                placeholder="Seu CPF"
                                icon={<User />}
                                value={formData.cpf}
                                onChange={(e) => {
                                    const masked = maskCPF(e.target.value);
                                    handleInputChange("cpf", masked);
                                }}
                                error={errors.cpf}
                                disabled={isLoading}
                            />
                        </>
                    )}

                    <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        icon={<Mail />}
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                        disabled={isLoading || isBlocked}
                    />

                    <PasswordInput
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Sua senha"
                        error={errors.password}
                        disabled={isLoading || isBlocked}
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(!showPassword)}
                    />

                    {mode === "register" && (
                        <PasswordInput
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            placeholder="Confirme sua senha"
                            error={errors.confirmPassword}
                            disabled={isLoading}
                            showPassword={showConfirmPassword}
                            toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}

                    {errors.general && (
                        <ErrorMessage message={errors.general} isBlocked={isBlocked} />
                    )}

                    {mode === "login" && <DemoCredentials />}

                    <button
                        type="submit"
                        disabled={isLoading || isBlocked}
                        className={cn(
                            "cursor-pointer w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
                            isLoading || isBlocked
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 focus:ring-4 focus:ring-emerald-500/20"
                        )}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner size="sm" className="text-gray-400" />
                                {mode === "login" ? "Entrando..." : "Criando conta..."}
                            </div>
                        ) : isBlocked ? (
                            "Conta temporariamente bloqueada"
                        ) : mode === "login" ? (
                            "Entrar"
                        ) : (
                            "Criar conta"
                        )}
                    </button>
                </form>

                {mode === "login" && (
                    <div className="mt-6 text-center">
                        <Link
                            href="/esqueci-senha"
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                        >
                            Esqueci a senha
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
