'use client'

import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    className?: string;
}

export const FormTextarea = forwardRef(
    ({ label, error, className, ...props }: FormTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => (
        <div className={className}>
            <label className="block text-sm font-medium text-[color:var(--modal-preview-label,#a3a3a3)] mb-2">
                {label}
            </label>
            <textarea
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 bg-[color:var(--modal-input-bg,rgba(55,65,81,0.5))] border rounded-lg text-[color:var(--modal-input-text,#fff)] placeholder-[color:var(--modal-input-placeholder,#a3a3a3)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)] resize-none",
                    error ? "border-[color:var(--modal-input-error,#ef4444)]" : "border-[color:var(--modal-input-border,#52525b)]"
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-[color:var(--modal-input-error,#ef4444)]">{error}</p>}
        </div>
    )
);

FormTextarea.displayName = "FormTextarea";