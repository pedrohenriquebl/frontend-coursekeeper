'use client'

import { motion, AnimatePresence } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomFieldWrapperProps {
    show: boolean;
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    placeholder?: string;
    className?: string;
}

export const CustomFieldWrapper = ({ 
    show, 
    label,
    register,
    error,
    placeholder,
    className
}: CustomFieldWrapperProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={className}
                >
                    <input
                        {...register}
                        placeholder={placeholder || label}
                        className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                            error ? "border-red-500" : "border-gray-600"
                        }`}
                    />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </motion.div>
            )}
        </AnimatePresence>
    );
};