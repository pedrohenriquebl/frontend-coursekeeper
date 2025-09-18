import { useState, useEffect } from "react";
import { userService } from "@/services/api/user/userService";
import { useAuthUser } from "@/context/authUserContext";

type AuthMode = "login" | "register";

interface FormData {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

interface Errors {
  [key: string]: string;
}

export function useAuthForm(initialMode: AuthMode = "login") {
  const { loginUser, authError, setAuthError } = useAuthUser();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const BLOCK_DURATION = 1 * 60 * 1000;

  const getBlockData = () => {
    const stored = sessionStorage.getItem("login_block");
    if (!stored) return { attemptCount: 0, lastAttempt: 0 };
    try {
      return JSON.parse(stored) as {
        attemptCount: number;
        lastAttempt: number;
      };
    } catch {
      return { attemptCount: 0, lastAttempt: 0 };
    }
  };

  const setBlockData = (attemptCount: number, lastAttempt: number) => {
    sessionStorage.setItem(
      "login_block",
      JSON.stringify({ attemptCount, lastAttempt })
    );
  };

  const isBlocked = (() => {
    const { attemptCount, lastAttempt } = getBlockData();
    if (attemptCount < 5) return false;
    const now = Date.now();
    if (now - lastAttempt >= BLOCK_DURATION) {
      setBlockData(0, 0);
      return false;
    }
    return true;
  })();

  const setAttemptCount = (count: number) => {
    sessionStorage.setItem("login_attempt_count", String(count));
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email é obrigatório";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email deve ter um formato válido";
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password) return "Senha é obrigatória";
    if (password.length < 6) return "Senha deve ter pelo menos 6 caracteres";
    return null;
  };

  const validateName = (name: string) => {
    if (!name) return "Nome é obrigatório";
    if (name.length < 2) return "Nome deve ter pelo menos 2 caracteres";
    return null;
  };

  const validateTerms = (accepted: boolean) => {
    if (!accepted)
      return "Você deve aceitar os termos e a política de privacidade";
    return null;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (!confirmPassword) return "Confirmação de senha é obrigatória";
    if (password !== confirmPassword) return "Senhas não coincidem";
    return null;
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (mode === "register") {
      const firstNameError = validateName(formData.firstName);
      if (firstNameError) newErrors.firstName = firstNameError;

      const lastNameError = validateName(formData.lastName);
      if (lastNameError) newErrors.lastName = lastNameError;

      const acceptedTermsError = validateTerms(formData.acceptedTerms);
      if (acceptedTermsError) newErrors.acceptedTerms = acceptedTermsError;

      const confirmPasswordError = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      );
      if (confirmPasswordError)
        newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptedTerms: checked }));
    setErrors((prev) => {
      const { acceptedTerms: _, ...rest } = prev; /*eslint-disable-line*/
      return rest;
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const { [field]: removed, ...rest } = prev; /*eslint-disable-line*/
        return { ...rest };
      }
      return prev;
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    });
    setErrors({});
    setIsLoading(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAuthError(null);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    resetForm();
  };

  const handleSubmit = async (onSuccess: () => void) => {
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const result = await loginUser(formData.email, formData.password);
        if (!result.success) {
          const { attemptCount: current } = getBlockData();
          const newAttemptCount = current + 1;
          setBlockData(newAttemptCount, Date.now());

          if (newAttemptCount >= 5) {
            const blockMsg =
              "Muitas tentativas de login falharam. Tente novamente mais tarde ou redefina sua senha.";
            setErrors({ general: blockMsg });
            setAuthError(blockMsg);
          }
          return;
        } else {
          setAuthError(null);
          setAttemptCount(0);
          sessionStorage.removeItem("login_attempt_count");
        }
      } else {
        const onlyNumbersCpf = formData.cpf.replace(/\D/g, "").slice(0, 11);

        const newUser = await userService.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          cpf: onlyNumbersCpf,
          password: formData.password,
          profileImage: "/api/placeholder/120/120",
          acceptedTerms: formData.acceptedTerms,
          acceptedPrivacy: formData.acceptedTerms,
        });

        if (!newUser)
          throw new Error("Erro ao criar conta. Email pode já estar em uso.");

        const result = await loginUser(formData.email, formData.password);
        if (!result.success)
          throw new Error(
            result.message || "Erro ao autenticar após registro."
          );
      }

      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar conta. Tente novamente.";
      setErrors({ general: errorMessage });
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleCheckboxChange,
  };
}
