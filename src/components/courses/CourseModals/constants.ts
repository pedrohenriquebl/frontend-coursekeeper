import { Topic, Platform, Language } from "./types";

export const TOPICS: Topic[] = [
  "FRONTEND",
  "BACKEND",
  "DESIGN",
  "DATA SCIENCE",
  "DEVOPS",
  "MOBILE",
  "FULL STACK",
  "OUTROS"
];

export const PLATFORMS: Platform[] = [
  "UDEMY",
  "COURSERA",
  "YOUTUBE",
  "EDX",
  "ALURA",
  "VUE MASTERY",
  "ROCKETSEAT",
  "OUTROS"
];

export const LANGUAGES: Language[] = [
  "PORTUGUES",
  "INGLES",
  "ESPANHOL",
  "FRANCES",
  "OUTROS"
];

export const STATUS_OPTIONS = [
  { value: "NAO_INICIADO", label: "Não Iniciado" },
  { value: "EM_PROGRESSO", label: "Em Progresso" },
  { value: "CONCLUIDO", label: "Concluído" }
];