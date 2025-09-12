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
        "rounded-full animate-spin",
        sizeClasses[size],
        className,
      )}
      style={{
        borderColor: "var(--authform-muted) var(--authform-primary-light) var(--authform-muted) var(--authform-muted)",
        borderStyle: "solid",
        borderTopColor: "var(--authform-primary-light)"
      }}
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
        <div className="absolute inset-0 backdrop-blur-sm rounded-lg flex items-center justify-center z-10" style={{ background: "rgba(17,24,39,0.2)" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
