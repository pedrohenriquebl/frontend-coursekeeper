import { Course } from "@/types";
import { useState } from "react";

export const useCourseProgress = (initialCourse: Course) => {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [studyHours, setStudyHours] = useState<number>(0);

  const updateStudiedHours = (newStudiedHours: number) => {
    const totalDuration = course.duration || 1;
    const clampedStudied = Math.min(newStudiedHours, totalDuration);
    const newProgress = Math.round((clampedStudied / totalDuration) * 100);

    const status =
      newProgress === 100
        ? "CONCLUIDO"
        : newProgress > 0
        ? "EM_PROGRESSO"
        : "NAO_INICIADO";

    const endDate =
      newProgress === 100 ? new Date().toISOString().split("T")[0] : course.endDate;

    setCourse((prev: Course) => ({
      ...prev,
      studiedHours: clampedStudied,
      progress: newProgress,
      status,
      endDate,
    }));
  };

  const addStudyHours = (hours: number) => {
    if (hours <= 0) return;
    updateStudiedHours(course.studiedHours + hours);
    setStudyHours(0);
  };

  const updateProgress = (newProgress: number) => {
    const totalDuration = course.duration || 1;
    const newStudiedHours = (newProgress / 100) * totalDuration;
    updateStudiedHours(newStudiedHours);
  };

  return {
    course,
    studyHours,
    setStudyHours,
    updateStudiedHours,
    updateProgress,
    addStudyHours,
  };
};
