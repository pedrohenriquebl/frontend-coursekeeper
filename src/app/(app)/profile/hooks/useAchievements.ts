import { useAuthUser } from "@/context/authUserContext";
import { achievementsService } from "@/services/api/achievements/achievementsService";
import { useCallback, useEffect, useState } from "react";

export function useAchievements() {
    const { user } = useAuthUser();
    const [achievements, setAchievements] = useState([]);

    const getAchievements = useCallback(async () => {
        if (!user) return [];
        const userId = user.id;
        
        try {
            const achievements = await achievementsService.getAchievements(userId);
            setAchievements(achievements);
        } catch (error) {
            console.error("Error fetching achievements:", error);
            throw error;
        }
    }, [user]);

    useEffect(() => {
        getAchievements();
    }, [getAchievements]);

    return { getAchievements, achievements };
}