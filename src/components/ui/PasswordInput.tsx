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
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: "var(--authform-muted)" }} />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="current-password"
          className={cn(
            "w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-2 transition-colors duration-200",
            error ? "border-red-500" : "hover:border-gray-500"
          )}
          style={{
            background: error ? "rgba(239,68,68,0.1)" : "var(--authform-card-bg)",
            color: "#fff",
            borderColor: error ? "#ef4444" : "var(--authform-disabled-bg)",
            boxShadow: "none"
          }}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          disabled={disabled}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: "var(--authform-muted)" }}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm flex items-center gap-1" style={{ color: "#ef4444" }}>
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
