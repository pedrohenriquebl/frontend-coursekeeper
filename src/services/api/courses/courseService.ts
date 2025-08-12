import { CreateCourseData } from "@/types";
import { apiInstance, isAxiosError } from "../axios/instance";
import { UpdateCourseData } from "@/components/courses/CourseModals/types";

export const courseService = {
  createCourse: async (course: CreateCourseData, userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.post(`/courses/${userId}`, course);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getCourses: async (userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.get(`/courses/${userId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  updateCourse: async (course: UpdateCourseData, userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.put(`/courses/${userId}`, {
        data: {
          userId: userId,
          courseId: course.id,
          course: course,
        },
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  deleteCourse: async (courseId: number, userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.delete(`/courses/${userId}/${courseId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getRecentCourses: async (userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.get(`/courses/${userId}/recent`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  }
};
