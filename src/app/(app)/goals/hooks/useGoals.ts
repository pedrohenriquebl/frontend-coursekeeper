"use client";

import { useAuthUser } from "@/context/authUserContext";
import { goalService } from "@/services/api/goals/goalsService";
import { userService } from "@/services/api/user/userService";
import { CreateGoalData, Goal, OverviewGoals } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useGoals() {
  const { user, setUser } = useAuthUser();
  const userId = Number(user?.id);
  const [overviewGoals, setOverviewGoals] = useState<OverviewGoals | null>(
    null
  );
  const [allGoals, setAllGoals] = useState<Goal[]>([]);

  const recentGoals = useCallback(async () => {
    if (!userId) return null;

    try {
      const goals = await goalService.getOverviewGoals(userId);
      setOverviewGoals(goals);
    } catch (error) {
      console.error("Erro ao obter metas recentes:", error);
      throw new Error(
        (error as Error).message || "Erro ao obter metas recentes"
      );
    }
  }, [userId]);

  const createGoal = useCallback(
    async (goalData: CreateGoalData) => {
      if (!userId) return null;

      try {
        await goalService.createGoal(goalData, userId);
        await recentGoals();
        const updatedUser = await userService.getMe();
        setUser(updatedUser);
      } catch (error) {
        console.error("Erro ao criar nova meta:", error);
        throw new Error((error as Error).message || "Erro ao criar nova meta");
      }
    },
    [userId, recentGoals, setUser]
  );

  const getAllGoals = useCallback(async () => {
    if (!userId) return null;

    try {
      const goals = await goalService.getAllGoals(userId);
      setAllGoals(goals ?? []);
    } catch (error) {
      console.error("Erro ao obter todas as metas:", error);
      throw new Error(
        (error as Error).message || "Erro ao obter todas as metas"
      );
    }
  }, [userId]);

  const activeGoalsSize = useMemo(
    () => allGoals.filter((goal) => goal.status === "ATIVA").length,
    [allGoals]
  );

  const completedGoalsSize = useMemo(
    () => allGoals.filter((goal) => goal.status === "CONCLUIDA").length,
    [allGoals]
  );

  const allGoalsSize = allGoals.length;

  useEffect(() => {
    recentGoals();
    getAllGoals();
  }, [recentGoals, getAllGoals]);

  return {
    recentGoals,
    overviewGoals,
    createGoal,
    getAllGoals,
    allGoals,
    activeGoalsSize,
    completedGoalsSize,
    allGoalsSize,
  };
}
