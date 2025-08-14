import { CreateGoalData } from "@/types";
import { apiInstance, isAxiosError } from "../axios/instance";

export const goalService = {
  createGoal: async (goalData: CreateGoalData, userId: number) => {
    if (!userId) return;

    try {
        const response = await apiInstance.post(`/goals/${userId}`, goalData);
        return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getAllGoals: async (userId: number) => {
    if (!userId) return;

    try {
      const response = await apiInstance.get(`/goals/${userId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getOverviewGoals: async (userId: number) => {
    if (!userId) return;

    try {
      const response = await apiInstance.get(`/goals/${userId}/overview`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  }
};
