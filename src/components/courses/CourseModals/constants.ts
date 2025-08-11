import { Topic, Platform, Language } from "./types";

export const TOPICS: Topic[] = [
  "Frontend",
  "Backend",
  "Design",
  "Data Science",
  "DevOps",
  "Mobile",
  "Full Stack",
  "Outro"
];

export const PLATFORMS: Platform[] = [
  "Udemy",
  "Coursera",
  "YouTube",
  "edX",
  "Pluralsight",
  "LinkedIn Learning",
  "Vue Mastery",
  "Rocketseat",
  "Outro"
];

export const LANGUAGES: Language[] = [
  "Português",
  "English",
  "Español",
  "Français",
  "Outro"
];

export const STATUS_OPTIONS = [
  { value: "Não Iniciado", label: "Não Iniciado" },
  { value: "Em Progresso", label: "Em Progresso" },
  { value: "Concluído", label: "Concluído" }
];