"use client";

import React from "react";
import { maskCPF } from "@/lib/mask";
import { User, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Input } from "./ui/Input";
import { PasswordInput } from "./ui/PasswordInput";
import { ErrorMessage } from "./ui/ErrorMessage";
import { DemoCredentials } from "./DemoCredentials";
import { Spinner } from "./ui/Spinner";

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
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--authform-bg-gradient)" }}>
            <div className="w-full max-w-md lg:min-h-[733px]">
                <div className="text-center mb-8">
                    <div className="p-3 rounded-xl inline-block mb-4" style={{ background: "var(--authform-primary-gradient)" }}>
                        <User className="h-8 w-8" style={{ color: "#fff" }} />
                    </div>
                                        <h1
                                            className="text-2xl font-bold mb-2"
                                            style={{
                                                background: "linear-gradient(to right, var(--authform-primary-light), var(--authform-accent-light))",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                                color: "transparent"
                                            }}
                                        >
                                            CourseKeeper
                                        </h1>
                    <p style={{ color: "var(--authform-muted)" }}>
                        {mode === "login"
                            ? "Entre na sua conta para continuar"
                            : "Crie sua conta para começar"}
                    </p>
                </div>

                <div className="flex rounded-lg p-1 mb-6" style={{ background: "var(--authform-card-bg)" }}>
                    <button
                        type="button"
                        onClick={() => mode !== "login" && toggleMode()}
                        className={cn(
                            "cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                            mode === "login"
                                ? "shadow-sm"
                                : "hover:opacity-80"
                        )}
                        style={mode === "login"
                            ? { background: "var(--authform-primary)", color: "#fff" }
                            : { color: "var(--authform-muted)" }}
                    >
                        Entrar
                    </button>
                    <button
                        type="button"
                        onClick={() => mode !== "register" && toggleMode()}
                        className={cn(
                            "cursor-pointer flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                            mode === "register"
                                ? "shadow-sm"
                                : "hover:opacity-80"
                        )}
                        style={mode === "register"
                            ? { background: "var(--authform-primary)", color: "#fff" }
                            : { color: "var(--authform-muted)" }}
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
                                autoComplete="cpf"
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
                        autoComplete="email"
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
                                ? "cursor-not-allowed"
                                : "hover:opacity-90 focus:ring-4"
                        )}
                        style={isLoading || isBlocked
                            ? { background: "var(--authform-disabled-bg)", color: "var(--authform-disabled-text)" }
                            : { background: "var(--authform-primary-gradient)", color: "#fff" }}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner size="sm" className="text-[var(--authform-muted)]" />
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
                            href="/forgot-password"
                            className="text-sm transition-colors duration-200"
                            style={{ color: "var(--authform-primary-light)" }}
                        >
                            Esqueci a senha
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
