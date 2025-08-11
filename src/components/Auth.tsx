"use client";

import { useRouter } from "next/navigation";
import { useAuthForm } from "@/hooks/useAuthForm";
import { AuthForm } from "./AuthForm";

export function Auth() {
  const router = useRouter();

  const {
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
    toggleMode,
    handleSubmit,
  } = useAuthForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      router.push("/");
    });
  };

  return (
    <AuthForm
      mode={mode}
      formData={formData}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      isLoading={isLoading}
      errors={errors}
      isBlocked={isBlocked}
      handleInputChange={handleInputChange}
      setShowPassword={setShowPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      onSubmit={onSubmit}
      toggleMode={toggleMode}
    />
  );
}
