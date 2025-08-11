import { useState } from "react";
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
}

interface Errors {
  [key: string]: string;
}

export function useAuthForm(initialMode: AuthMode = "login") {
  const { loginUser } = useAuthUser();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [errors, setErrors] = useState<Errors>({});

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setAttemptCount(0);
    setIsLoading(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    resetForm();
  };

  const isBlocked = attemptCount >= 5;

  const handleSubmit = async (onSuccess: () => void) => {
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const authenticated = await loginUser(formData.email, formData.password);
        if (!authenticated) throw new Error("Email ou senha incorretos");
      } else {
        const onlyNumbersCpf = formData.cpf.replace(/\D/g, "").slice(0, 11);

        const newUser = await userService.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          cpf: onlyNumbersCpf,
          password: formData.password,
          profileImage: "/api/placeholder/120/120",
        });

        if (!newUser)
          throw new Error("Erro ao criar conta. Email pode já estar em uso.");

        const authenticated = await loginUser(formData.email, formData.password);
        if (!authenticated)
          throw new Error("Erro ao autenticar após registro.");

        console.log(
          `Usuário criado: ${newUser.firstName} ${newUser.lastName} (${newUser.email})`
        );
      }

      onSuccess();
    } catch (error) {
      if (mode === "login") {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        if (newAttemptCount >= 5) {
          setErrors({
            general:
              "Muitas tentativas de login falharam. Tente novamente mais tarde ou redefina sua senha.",
          });
        } else {
          setErrors({
            general: `Credenciais inválidas. Tentativa ${newAttemptCount} de 5.`,
          });
        }
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Erro ao criar conta. Tente novamente.";
        setErrors({ general: errorMessage });
      }
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
  };
}
