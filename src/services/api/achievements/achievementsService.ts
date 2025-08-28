import { isAxiosError } from "axios";
import { apiInstance } from "../axios/instance";

export const achievementsService = {
  getAchievements: async (userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.get(`/achievements/user/${userId}`);
      return response.data || [];
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        }

        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },
};
