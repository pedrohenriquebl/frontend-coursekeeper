import { BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PageLoaderProps {
    message?: string;
}

export function PageLoader({ message = "Carregando..." }: PageLoaderProps) {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                // Aumenta mais devagar após 90%
                if (prev >= 90) return prev + 0.2;
                if (prev >= 70) return prev + 0.5;
                return prev + 1.5;
            });
        }, 16);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
            <div className="text-center">

                <div className="relative mb-8">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 rounded-2xl inline-block animate-pulse">
                        <BookOpen className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl animate-ping opacity-20"></div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-4">CourseKeeper</h2>
                <p className="text-gray-400 mb-6">{message}</p>

                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-green-600 rounded-full animate-pulse w-3/4"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="flex justify-center gap-1 mt-6">
                    <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
