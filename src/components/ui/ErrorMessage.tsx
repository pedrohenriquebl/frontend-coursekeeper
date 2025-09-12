import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  isBlocked?: boolean;
}

export function ErrorMessage({ message, isBlocked = false }: ErrorMessageProps) {
  return (
    <div
      className={cn("p-4 rounded-lg flex items-start gap-3 border")}
      style={{
        background: isBlocked ? "rgba(239,68,68,0.1)" : "rgba(251,146,60,0.1)",
        borderColor: isBlocked ? "rgba(239,68,68,0.2)" : "rgba(251,146,60,0.2)"
      }}
    >
      <AlertCircle
        className="h-5 w-5 mt-0.5"
        style={{ color: isBlocked ? "#ef4444" : "#fb923c" }}
      />
      <p className="text-sm" style={{ color: isBlocked ? "#ef4444" : "#fb923c" }}>{message}</p>
    </div>
  );
}
