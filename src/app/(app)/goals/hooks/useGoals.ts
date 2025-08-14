"use client";

import { useAuthUser } from "@/context/authUserContext";
import { goalService } from "@/services/api/goals/goalsService";
import { CreateGoalData, OverviewGoals } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useGoals() {
  const { user } = useAuthUser();
  const userId = Number(user?.id);
  const [overviewGoals, setOverviewGoals] = useState<OverviewGoals | null>(null);

  const recentGoals = useCallback(async () => {
    if (!userId) return null;

    try {
      const goals = await goalService.getOverviewGoals(userId);
      setOverviewGoals(goals);
    } catch (error) {
      console.error("Erro ao obter metas recentes:", error);
      throw new Error((error as Error).message || "Erro ao obter metas recentes");
    }
  }, [userId]);

  const createGoal = useCallback(async (goalData: CreateGoalData) => {
    if (!userId) return null;

    try {
        await goalService.createGoal(goalData, userId);
        await recentGoals();
    } catch (error) {
        console.error("Erro ao criar nova meta:", error);
        throw new Error((error as Error).message || "Erro ao criar nova meta");
    }
  }, [userId, recentGoals]);

  useEffect(() => {
    recentGoals();
  }, [recentGoals]);

  return {
    recentGoals,
    overviewGoals,
    createGoal
  };
}
