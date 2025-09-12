import { UpdateSubscriptionPayload } from "@/types";
import { apiInstance, isAxiosError } from "../axios/instance";

export const subscriptionService = {

  updateSubscription: async (userId: number, payload: UpdateSubscriptionPayload) => {
    if (!userId) return;

    try {
      const response = await apiInstance.put(`/users/${userId}/subscription`, payload);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }

      throw new Error("Erro ao atualizar assinatura");
    }
  },
};
