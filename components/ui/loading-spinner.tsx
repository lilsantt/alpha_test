import { cn } from "@/lib/cn";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const LoadingSpinner: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
    </div>
  );
};
