import { useCallback, useState } from "react";
import { courseService } from "@/services/api/courses/courseService";
import { CreateCourseData } from "@/types";
import { useAuthUser } from "@/context/authUserContext";

export function useCourse() {
  const { user } = useAuthUser();
  const userId = Number(user?.id);
  const [isLoadingCreateCourse, setIsLoadingCreateCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const createCourse = useCallback(async (course: CreateCourseData) => {
    if (!userId) return null;

    setIsLoadingCreateCourse(true);
    setError(null);
    setSuccess(false);
    try {
      if (!userId) throw new Error("Usuário não autenticado");
      await courseService.createCourse(course, userId);
      setSuccess(true);
    } catch (error: unknown) {
      setError((error as Error).message || "Erro ao criar curso");
    } finally {
      setIsLoadingCreateCourse(false);
    }
  }, [userId]);

  const resetSuccess = useCallback(() => setSuccess(false), []);

  return { createCourse, isLoadingCreateCourse, error, success, resetSuccess };
}
