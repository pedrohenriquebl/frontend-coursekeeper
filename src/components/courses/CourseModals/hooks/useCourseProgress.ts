import { useState } from "react";
import { Course } from "../types";

export const useCourseProgress = (initialCourse: Course) => {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [studyHours, setStudyHours] = useState<number>(0);

  const updateProgress = (newProgress: number) => {
    const status =
      newProgress === 100
        ? "Concluído"
        : newProgress > 0
        ? "Em Progresso"
        : "Não Iniciado";
    const endDate =
      newProgress === 100
        ? new Date().toISOString().split("T")[0]
        : course.endDate;

    setCourse((prev) => ({
      ...prev,
      progress: newProgress,
      status,
      endDate,
    }));
  };

  const addStudyHours = (hours: number) => {
    if (hours <= 0) return;

    const totalDuration = parseInt(course.duration.replace(/\D/g, "")) || 1;
    const currentStudied = (course.progress / 100) * totalDuration;
    const newStudied = currentStudied + hours;
    const newProgress = Math.min(
      Math.round((newStudied / totalDuration) * 100),
      100
    );

    updateProgress(newProgress);
    setStudyHours(0);
  };

  return {
    course,
    studyHours,
    setStudyHours,
    updateProgress,
    addStudyHours,
  };
};
