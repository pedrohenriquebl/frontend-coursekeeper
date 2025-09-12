"use client";

import { useRef, useState } from "react";
import { Camera, X, Save } from "lucide-react";

export default function AvatarUpload({
    currentImage,
    onSave,
}: {
    currentImage?: string;
    onSave: (file: File) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            await onSave(file);
            setPreview(null);
        }
    };

    return (
        <div className="relative flex flex-col flex-wrap align-center items-center gap-2">
            <div className="w-32 h-32 rounded-full bg-[color:var(--avatar-bg,#23272f)] overflow-hidden border-4 border-[color:var(--avatar-border,#52525b)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={preview || currentImage || "/avatars/placeholder.png"}
                    alt="Avatar"
                    className="object-cover w-full h-full rounded-full"
                    onError={(e) => { e.currentTarget.src = "/avatars/placeholder.png"; }}
                />
            </div>

            {!preview && (<button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[color:var(--avatar-action-bg,#059669)] hover:bg-[color:var(--avatar-action-hover-bg,#059669)] text-[color:var(--avatar-action,#fff)] p-2 rounded-full transition-colors duration-200"
            >
                <Camera className="h-4 w-4" />
            </button>)}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {preview && (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[color:var(--avatar-save-bg,#059669)] hover:bg-[color:var(--avatar-save-hover-bg,#059669)] text-[color:var(--avatar-save,#fff)] px-4 py-2 rounded-lg"
                    >
                        <Save className="h-4 w-4" />
                        Salvar
                    </button>
                    <button
                        onClick={() => setPreview(null)}
                        className="flex items-center gap-2 bg-[color:var(--avatar-cancel-bg,#52525b)] hover:bg-[color:var(--avatar-cancel-hover-bg,#a3a3a3)] text-[color:var(--avatar-cancel,#fff)] px-4 py-2 rounded-lg"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}
