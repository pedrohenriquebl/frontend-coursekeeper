import { useCallback, useEffect, useState } from "react";
import { courseService } from "@/services/api/courses/courseService";
import { CreateCourseData } from "@/types";
import { useAuthUser } from "@/context/authUserContext";
import { Course } from "../types";

export function useCourse() {
  const { user } = useAuthUser();
  const userId = Number(user?.id);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);

  const getRecentCourses = useCallback(async () => {
    if (!userId) return null;

    try {
      setIsLoadingCourse(true);
      const courses = await courseService.getRecentCourses(userId);
      setRecentCourses(courses as Course[]);
    } catch (error) {
      setError((error as Error).message || "Erro ao obter cursos recentes");
    } finally {
      setIsLoadingCourse(false);
    }
  }, [userId]);

  const createCourse = useCallback(async (course: CreateCourseData) => {
    if (!userId) return null;

    setIsLoadingCourse(true);
    setError(null);
    setSuccess(false);
    try {
      if (!userId) throw new Error("Usuário não autenticado");
      await courseService.createCourse(course, userId);
      setSuccess(true);
      await getRecentCourses();
    } catch (error: unknown) {
      setError((error as Error).message || "Erro ao criar curso");
    } finally {
      setIsLoadingCourse(false);
    }
  }, [userId, getRecentCourses]);

  useEffect(() => {
    getRecentCourses();
  }, [getRecentCourses]);

  const resetSuccess = useCallback(() => setSuccess(false), []);

  return { 
    createCourse, 
    isLoadingCourse, 
    error, 
    success, 
    resetSuccess, 
    recentCourses,
    getRecentCourses 
  };
}
