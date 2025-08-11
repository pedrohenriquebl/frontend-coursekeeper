import { apiInstance, isAxiosError } from "@/services/api/axios/instance";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  profileImage?: string;
  description?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

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
};
