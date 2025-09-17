import { useAuthUser } from "@/context/authUserContext";
import { chatService } from "@/services/api/chat/chatService";
import { useEffect, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  side: "left" | "right";
};

const STORAGE_KEY = "chat-messages";

export default function useChat() {
  const { user } = useAuthUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  async function addMessage(message: string) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
      side: "right",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setIsLoadingChat(true);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "...", side: "left" },
      ]);

      const response = await chatService.chatWithIA(message, user.id);

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.pop();
        return newMessages;
      });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response?.response || "🤖 IA indisponível no momento. Por favor, tente novamente mais tarde.",
        side: "left",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error adding message:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== "..."),
        {
          role: "assistant",
          content:
            "🤖 IA indisponível no momento. Por favor, tente novamente mais tarde.",
          side: "left",
        },
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  }

  return {
    addMessage,
    messages,
    setMessages,
    isLoadingChat,
  };
}
