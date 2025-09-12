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
import Image from "next/image";
import { ReactNode } from "react";

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
        case "database":
            return <Database className="h-5 w-5 text-yellow-400" />;
        default:
            return <Globe className="h-5 w-5 text-gray-400" />;
    }
};

export const getLanguageSymbol = (topic: string, name: string): ReactNode => {
  const courseName = name.toLowerCase();
  const topicLower = topic.toLowerCase();

  const deviconPaths: Record<string, string> = {
    react: "react/react-original.svg",
    vue: "vuejs/vuejs-original.svg",
    angular: "angularjs/angularjs-original.svg",
    node: "nodejs/nodejs-original.svg",
    express: "nodejs/nodejs-original.svg",
    python: "python/python-original.svg",
    java: "java/java-original.svg",
    javascript: "javascript/javascript-original.svg",
    php: "php/php-original.svg",
    docker: "docker/docker-original.svg",
    kubernetes: "kubernetes/kubernetes-plain.svg",
    k8s: "kubernetes/kubernetes-plain.svg",
    figma: "figma/figma-original.svg",
    "data science": "jupyter/jupyter-original.svg",
    typescript: "typescript/typescript-original.svg",
    go: "go/go-original.svg",
    golang: "go/go-original.svg",
    rust: "rust/rust-plain.svg",
    mongo: "mongodb/mongodb-original.svg",
    db: "mysql/mysql-original.svg",
    banco: "mysql/mysql-original.svg",
    mysql: "mysql/mysql-original.svg",
    postgres: "postgresql/postgresql-original.svg",
    css: "css3/css3-original.svg",
    html: "html5/html5-original.svg",
    default: "kubeflow/kubeflow-original.svg",
  };
  
  const key =
    Object.keys(deviconPaths).find(k => courseName.includes(k) || topicLower === k) || "default";

  const iconPath = deviconPaths[key];

  return (
    <Image
      width={25}
      height={25}
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}`}
      alt={key}
      className="h-5 w-5"
    />
  );
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
