import { apiInstance } from "../axios/instance";

export const chatService = {
  chatWithIA: async (message: string, userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.post(`/ai-assistant/chat`, {
        userId: userId,
        message: message,
      });
      return response.data;
    } catch {
      return null;
    }
  },
};
