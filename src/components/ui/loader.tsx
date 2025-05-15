
import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner = ({
  className,
  size = 24,
}: LoadingSpinnerProps) => {
  return (
    <Loader
      className={cn("animate-spin text-medical-primary", className)}
      size={size}
    />
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <LoadingSpinner size={40} />
    </div>
  );
};
