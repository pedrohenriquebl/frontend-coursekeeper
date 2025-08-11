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
            <label className="block text-sm font-medium text-gray-400 mb-2">
                {label}
            </label>
            <textarea
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none",
                    error ? "border-red-500" : "border-gray-600"
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
);

FormTextarea.displayName = "FormTextarea";