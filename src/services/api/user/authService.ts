import { apiInstance, isAxiosError } from "@/services/api/axios/instance";

export const authService = {
  requestPasswordReset: async (email: string) => {
    try {
      const response = await apiInstance.post("/auth/request-password-reset", {
        email,
      });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await apiInstance.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },
};
