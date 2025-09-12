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
                        className={`w-full px-4 py-3 bg-[color:var(--modal-input-bg,rgba(55,65,81,0.5))] border rounded-lg text-[color:var(--modal-input-text,#fff)] placeholder-[color:var(--modal-input-placeholder,#a3a3a3)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)] ${
                            error ? "border-[color:var(--modal-input-error,#ef4444)]" : "border-[color:var(--modal-input-border,#52525b)]"
                        }`}
                    />
                    {error && <p className="mt-1 text-sm text-[color:var(--modal-input-error,#ef4444)]">{error}</p>}
                </motion.div>
            )}
        </AnimatePresence>
    );
};