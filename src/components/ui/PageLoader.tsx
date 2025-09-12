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
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--authform-bg-gradient)" }}>
            <div className="text-center">

                <div className="relative mb-8">
                    <div className="p-4 rounded-2xl inline-block animate-pulse" style={{ background: "var(--authform-primary-gradient)" }}>
                        <BookOpen className="h-12 w-12" style={{ color: "#fff" }} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: "var(--authform-primary-gradient)" }}></div>
                </div>

                <h2 className="text-xl font-semibold mb-4" style={{ color: "#fff" }}>CourseKeeper</h2>
                <p className="mb-6" style={{ color: "var(--authform-muted)" }}>{message}</p>

                <div className="w-64 h-2 rounded-full overflow-hidden mx-auto" style={{ background: "var(--authform-card-bg)" }}>
                    <div
                        className="h-full rounded-full animate-pulse w-3/4"
                        style={{
                            width: `${progress}%`,
                            background: "var(--authform-primary-gradient)"
                        }}
                    ></div>
                </div>

                <div className="flex justify-center gap-1 mt-6">
                    <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms", background: "var(--authform-primary-light)" }}
                    ></div>
                    <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms", background: "var(--authform-primary-light)" }}
                    ></div>
                    <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms", background: "var(--authform-primary-light)" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
