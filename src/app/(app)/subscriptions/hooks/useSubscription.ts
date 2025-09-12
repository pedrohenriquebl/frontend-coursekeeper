"use client";

import { useState } from "react";
import { SubscriptionPlan, Duration } from "@/types";
import toast from "react-hot-toast";
import { useAuthUser } from "@/context/authUserContext";
import { subscriptionService } from "@/services/api/subscription/subscription";

export function useSubscription() {
  const { user, setUser } = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    throw new Error("useSubscription must be used within an AuthUserProvider");
  }

  const currentPlan = user.subscriptionPlan;

  const showSuccessToast = (newPlan: SubscriptionPlan) => {
    const planNames = {
      FREE: "Free",
      GOLD: "Gold",
      PLATINUM: "Platinum"
    };

    toast.success(`Plano alterado para ${planNames[newPlan]} com sucesso!`, {
      style: {
        background: "#2d3748",
        color: "#fff",
        border: "1px solid #10b981",
        padding: "16px 24px",
        borderRadius: "12px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#ffffff",
      },
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        background: "#2d3748",
        color: "#fff",
        border: "1px solid #e53e3e",
        padding: "16px 24px",
        borderRadius: "12px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#e53e3e",
        secondary: "#ffffff",
      },
    });
  };

  const changeSubscription = async (
    newPlan: SubscriptionPlan,
    duration?: Duration
  ) => {
    setIsLoading(true);
    try {      
      const payload = {
        subscriptionPlan: newPlan,
        duration: duration ? duration.toLowerCase() as "monthly" | "annual" : undefined
      };

      const response = await subscriptionService.updateSubscription(user.id, payload);
      
      await setUser({
        ...user,
        subscriptionPlan: newPlan
      });

      showSuccessToast(newPlan);
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao alterar assinatura";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isDowngrade = (target: SubscriptionPlan): boolean => {
    const planHierarchy = ["FREE", "GOLD", "PLATINUM"];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const targetIndex = planHierarchy.indexOf(target);
    return targetIndex < currentIndex;
  };

  return {
    currentPlan,
    isLoading,
    changeSubscription,
    isDowngrade,
    showSuccessToast,
    showErrorToast,
  };
}