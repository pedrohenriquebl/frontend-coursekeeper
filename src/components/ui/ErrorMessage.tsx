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
      className={cn(
        "p-4 rounded-lg flex items-start gap-3",
        isBlocked ? "bg-red-500/10 border border-red-500/20" : "bg-orange-500/10 border border-orange-500/20"
      )}
    >
      <AlertCircle
        className={cn("h-5 w-5 mt-0.5", isBlocked ? "text-red-400" : "text-orange-400")}
      />
      <p className={cn("text-sm", isBlocked ? "text-red-400" : "text-orange-400")}>{message}</p>
    </div>
  );
}
