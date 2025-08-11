import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export function PasswordInput({
  error,
  value,
  onChange,
  disabled,
  showPassword,
  toggleShowPassword,
  ...props
}: PasswordInputProps) {
  return (
    <div>
      <label className="sr-only">{props.placeholder || "Senha"}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200",
            error ? "border-red-500 bg-red-500/10" : "border-gray-600 hover:border-gray-500"
          )}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          disabled={disabled}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
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
