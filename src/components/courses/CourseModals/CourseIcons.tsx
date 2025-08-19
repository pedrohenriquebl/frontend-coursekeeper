'use client'

import { Goal } from "@/types";
import {
    Monitor,
    Code,
    Database,
    Palette,
    BarChart,
    Globe,
    Smartphone,
    CheckCircle,
    Clock,
    AlertCircle,
    Target,
} from "lucide-react";

export const getTopicIcon = (topic: string) => {
    switch (topic.toLowerCase()) {
        case "frontend":
            return <Code className="h-5 w-5 text-blue-400" />;
        case "backend":
            return <Database className="h-5 w-5 text-green-400" />;
        case "design":
            return <Palette className="h-5 w-5 text-purple-400" />;
        case "data science":
            return <BarChart className="h-5 w-5 text-orange-400" />;
        case "devops":
            return <Monitor className="h-5 w-5 text-red-400" />;
        case "mobile":
            return <Smartphone className="h-5 w-5 text-pink-400" />;
        default:
            return <Globe className="h-5 w-5 text-gray-400" />;
    }
};

export const getLanguageSymbol = (topic: string, name: string): string => {
    const courseName = name.toLowerCase();
    const topicLower = topic.toLowerCase();

    if (courseName.includes("react") || courseName.includes("javascript"))
        return "⚛️";
    if (courseName.includes("vue")) return "💚";
    if (courseName.includes("angular")) return "🅰️";
    if (courseName.includes("node") || courseName.includes("express"))
        return "🟢";
    if (courseName.includes("python")) return "🐍";
    if (courseName.includes("java") && !courseName.includes("javascript"))
        return "☕";
    if (courseName.includes("php")) return "🐘";
    if (courseName.includes("docker")) return "🐳";
    if (courseName.includes("kubernetes")) return "☸️";
    if (courseName.includes("figma") || topicLower === "design") return "🎨";
    if (topicLower === "data science") return "📊";
    if (courseName.includes("typescript")) return "🔷";
    if (courseName.includes("go") || courseName.includes("golang")) return "🐹";
    if (courseName.includes("rust")) return "🦀";

    return "📚";
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Concluído":
            return "bg-green-600/20 text-green-400";
        case "Em Progresso":
            return "bg-emerald-600/20 text-emerald-400";
        case "Não Iniciado":
            return "bg-gray-600/20 text-gray-400";
        case "Não Concluído":
            return "bg-red-600/20 text-red-400";
        default:
            return "bg-gray-600/20 text-gray-400";
    }
};

export const getStatusIcon = (status: string) => {
    switch (status) {
        case "CONCLUIDA":
            return <CheckCircle className="h-4 w-4" />;
        case "ATIVA":
            return <Clock className="h-4 w-4" />;
        case "VENCIDA":
            return <AlertCircle className="h-4 w-4" />;
        default:
            return <Target className="h-4 w-4" />;
    }
};

export const getGoalProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
};
