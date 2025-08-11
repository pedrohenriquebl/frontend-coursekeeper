import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={cn(
        "border-gray-300 border-t-transparent rounded-full animate-spin",
        sizeClasses[size],
        className,
      )}
    />
  );
}

interface SpinnerOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SpinnerOverlay({
  isLoading,
  children,
  className,
}: SpinnerOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <Spinner className="border-emerald-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
