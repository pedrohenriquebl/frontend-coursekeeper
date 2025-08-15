import { useCallback, useEffect, useState } from "react";
import { courseService } from "@/services/api/courses/courseService";
import { Course, CreateCourseData, UpdateCoursePayload } from "@/types";
import { useAuthUser } from "@/context/authUserContext";
import { userService } from "@/services/api/user/userService";


export function useCourse() {
  const { user } = useAuthUser();
  const userId = Number(user?.id);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isUpdatingCourse, setIsUpdatingCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

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
      await userService.getMe();
    } catch (error: unknown) {
      setError((error as Error).message || "Erro ao criar curso");
    } finally {
      setIsLoadingCourse(false);
    }
  }, [userId, getRecentCourses]);

  const getAllCourses = useCallback(async () => {
    if (!userId) return null;

    try {
      setIsLoadingCourse(true);
      const courses = await courseService.getCourses(userId);
      setAllCourses(courses as Course[]);
    } catch (error) {
      setError((error as Error).message || "Erro ao obter cursos");
    } finally {
      setIsLoadingCourse(false);
    }
  }, [userId]);

  const deleteCourse = useCallback( async (courseId: number) => {
    if (!userId) return null;

    try {
      setIsLoadingCourse(true);
      await courseService.deleteCourse(courseId, userId);
      await getAllCourses();
    } catch (error) {
      setError((error as Error).message || "Erro ao deletar curso");
    } finally {
      setIsLoadingCourse(false);
    }
  }, [userId, getAllCourses]);

  const updateCourse = useCallback(async (course: UpdateCoursePayload) => {
    if (!userId) return null;

    setIsUpdatingCourse(true);
    setError(null);
    try {
      if (!userId) throw new Error("Usuário não autenticado");
      
      await courseService.updateCourse(course as UpdateCoursePayload, userId);
      await getAllCourses();
    } catch (error: unknown) {
      setError((error as Error).message || "Erro ao atualizar curso");
    } finally {
      setIsLoadingCourse(false);
      setIsUpdatingCourse(false);
    }
  }, [userId, getAllCourses]);

  useEffect(() => {
    getRecentCourses();
    getAllCourses();
  }, [getRecentCourses, getAllCourses]);

  const resetSuccess = useCallback(() => setSuccess(false), []);

  return { 
    createCourse, 
    isLoadingCourse, 
    error, 
    success, 
    resetSuccess, 
    recentCourses,
    getRecentCourses,
    allCourses,
    getAllCourses,
    deleteCourse,
    updateCourse,
    isUpdatingCourse
  };
}
