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
            return <Code className="h-5 w-5 text-[color:var(--topic-frontend,#60a5fa)]" />;
        case "backend":
            return <Database className="h-5 w-5 text-[color:var(--topic-backend,#22c55e)]" />;
        case "design":
            return <Palette className="h-5 w-5 text-[color:var(--topic-design,#a78bfa)]" />;
        case "data science":
            return <BarChart className="h-5 w-5 text-[color:var(--topic-datascience,#fb923c)]" />;
        case "devops":
            return <Monitor className="h-5 w-5 text-[color:var(--topic-devops,#f87171)]" />;
        case "mobile":
            return <Smartphone className="h-5 w-5 text-[color:var(--topic-mobile,#f472b6)]" />;
        case "database":
            return <Database className="h-5 w-5 text-[color:var(--topic-database,#fde047)]" />;
        default:
            return <Globe className="h-5 w-5 text-[color:var(--topic-default,#a3a3a3)]" />;
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
            return "bg-[color:var(--modal-completed-bg,rgba(22,163,74,0.2))] text-[color:var(--modal-completed-icon,#22c55e)]";
        case "Em Progresso":
            return "bg-[color:var(--modal-progress-bg,rgba(16,185,129,0.2))] text-[color:var(--modal-progress-bar,#10b981)]";
        case "Não Iniciado":
            return "bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.2))] text-[color:var(--modal-preview-meta,#a3a3a3)]";
        case "Não Concluído":
            return "bg-[color:var(--modal-delete-bg,rgba(220,38,38,0.2))] text-[color:var(--modal-delete-bg,#dc2626)]";
        default:
            return "bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.2))] text-[color:var(--modal-preview-meta,#a3a3a3)]";
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
