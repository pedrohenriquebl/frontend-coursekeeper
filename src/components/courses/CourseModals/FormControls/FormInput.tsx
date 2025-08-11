'use client'

import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export const FormInput = forwardRef(
  ({ label, error, className, ...props }: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
          error ? "border-red-500" : "border-gray-600"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

FormInput.displayName = "FormInput";