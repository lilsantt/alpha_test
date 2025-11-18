import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Filters } from "@/lib/types";
import { Heart } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  filters: Filters;
  onChange: (filters: Partial<Filters>) => void;
}

export const ProductFavoriteFilter: React.FC<Props> = ({
  className,
  filters,
  onChange,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Heart className="w-4 h-4 text-danger" />
        <span>По избранному</span>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onChange({ favorites: true })}
          className={cn(filters.favorites && "ring-2 ring-success/50")}
        >
          Только избранные
        </Button>
        <Button
          onClick={() => onChange({ favorites: false })}
          className={cn(!filters.favorites && "ring-2 ring-success/50")}
        >
          Все товары
        </Button>
      </div>
    </div>
  );
};
