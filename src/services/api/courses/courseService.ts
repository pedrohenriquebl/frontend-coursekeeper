import {
  CreateCourseData,
  GetCoursesParams,
  UpdateCoursePayload,
} from "@/types";
import { apiInstance, isAxiosError } from "../axios/instance";

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
        if (error.response?.status === 404) {
          return [];
        }

        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  getCourses: async (userId: number, params?: GetCoursesParams) => {
    const {
      page = 1,
      limit = 10,
      query = "",
      topic = "all",
      platform = "all",
      status = "all",
    } = params || {};

    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.get(`/courses/${userId}`, {
        params: { page, limit, query, topic, platform, status },
      });
      return response.data || [];
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },

  updateCourse: async (course: UpdateCoursePayload, userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.put(`/courses/${userId}`, course);
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
      const response = await apiInstance.delete(
        `/courses/${userId}/${courseId}`
      );
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
  },

  getAllCourses: async (userId: number) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const response = await apiInstance.get(`/courses/${userId}/all`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Erro desconhecido";
        throw new Error(message);
      }
    }
  },
};
