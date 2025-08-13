'use client'

import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: readonly string[] | { value: string; label: string }[];
  className?: string;
}

export const FormSelect = forwardRef(
  ({ label, error, options, className, ...props }: FormSelectProps, ref: ForwardedRef<HTMLSelectElement>) => (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <select
        ref={ref}
        className={cn(
          "lowercase w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
          error ? "border-red-500" : "border-gray-600"
        )}
        {...props}
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          return (
            <option key={value} value={value} className="bg-gray-800">
              {label}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

FormSelect.displayName = "FormSelect";