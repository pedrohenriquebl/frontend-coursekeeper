'use client'

import { UseFormRegisterReturn } from "react-hook-form";

interface CustomFieldWrapperProps {
    show: boolean;
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    placeholder?: string;
}

export const CustomFieldWrapper = ({ 
    show, 
    label,
    register,
    error,
    placeholder
}: CustomFieldWrapperProps) => {
    if (!show) return null;

    return (
        <div className="mt-2">
            <input
                {...register}
                placeholder={placeholder || label}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                    error ? "border-red-500" : "border-gray-600"
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};