import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ icon, error, className, ...props }: InputProps) {
  return (
    <div>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={cn(
            "w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200",
            error ? "border-red-500 bg-red-500/10" : "border-gray-600 hover:border-gray-500",
            className
          )}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          {/* Pode passar o ícone de erro aqui */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
