import { useRef, useState } from "react";
import { Camera, X, Save } from "lucide-react";
import Image from "next/image";

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

    const handleSave = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            onSave(file);
        }
    };

    return (
        <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden border-4 border-gray-600">
                <Image
                    src={preview || currentImage || "/placeholder.png"}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                />
            </div>

            <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full transition-colors duration-200"
            >
                <Camera className="h-4 w-4" />
            </button>

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
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                    >
                        <Save className="h-4 w-4" />
                        Salvar
                    </button>
                    <button
                        onClick={() => setPreview(null)}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}
