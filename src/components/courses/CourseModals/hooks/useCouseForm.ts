import { useState } from "react";
import { CreateCourseData } from "../types";

export const useCourseForm = (initialState?: Partial<CreateCourseData>) => {
  const [course, setCourse] = useState<CreateCourseData>({
    name: "",
    platform: "Udemy",
    platformCustom: "",
    duration: "",
    topic: "Frontend",
    topicCustom: "",
    startDate: new Date().toISOString().split("T")[0],
    description: "",
    instructor: "",
    language: "Português",
    languageCustom: "",
    progress: 0,
    rating: 0,
    comment: "",
    status: "Não Iniciado",
    ...initialState
  });

  const updateField = <K extends keyof CreateCourseData>(
    field: K,
    value: CreateCourseData[K]
  ) => {
    setCourse(prev => ({ ...prev, [field]: value }));
  };

  return {
    course,
    updateField,
    setCourse
  };
};