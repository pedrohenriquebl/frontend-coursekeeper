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
      <label className="block text-sm font-medium text-[color:var(--modal-preview-label,#a3a3a3)] mb-2">
        {label}
      </label>
      <select
        ref={ref}
        className={cn(
          "lowercase w-full px-4 py-3 bg-[color:var(--modal-input-bg,rgba(55,65,81,0.5))] border rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]",
          error ? "border-[color:var(--modal-input-error,#ef4444)]" : "border-[color:var(--modal-input-border,#52525b)]"
        )}
        {...props}
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          return (
            <option key={value} value={value} className="bg-[color:var(--modal-bg,#23272f)]">
              {label}
            </option>
          );
        })}
      </select>
  {error && <p className="mt-1 text-sm text-[color:var(--modal-input-error,#ef4444)]">{error}</p>}
    </div>
  )
);

FormSelect.displayName = "FormSelect";