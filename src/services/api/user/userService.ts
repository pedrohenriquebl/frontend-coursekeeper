import { apiInstance, isAxiosError } from "@/services/api/axios/instance";
import { LoginResponse, User } from "@/types";

export const userService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiInstance.post("/users/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    password: string;
    profileImage?: string;
    description?: string;
  }): Promise<User | undefined> => {
    try {
      const response = await apiInstance.post("/users/register", data);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getMe: async (): Promise<User> => {
    return apiInstance.get("/users/me").then((response) => response.data);
  },

  updateProfile: async (userId: number, data: Partial<User>): Promise<User> => {
    console.log("Updating user profile: inside updateProfile", userId, data);
    const response = await apiInstance.put(`/users/${userId}`, data);
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<{ path: string; user?: User }> => {
    const form = new FormData();
    form.append("file", file);

    const response = await apiInstance.post("/users/me/avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
