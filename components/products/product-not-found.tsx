import { cn } from "@/lib/cn";
import { Frown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const ProductNotFound: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-[30vh] flex items-center justify-center gap-4 flex-col text-center",
        className
      )}
    >
      <Frown className="w-12 h-12" />
      <h2 className="text-2xl font-semibold">Товар не найден</h2>
    </div>
  );
};
