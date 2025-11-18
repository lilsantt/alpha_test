import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { Filters } from "@/lib/types";
import { DollarSign, X } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  filters: Filters;
  handlePriceChange: (
    field: keyof Filters["priceRange"],
    value: string
  ) => void;
  clearPriceFilter: () => void;
}

export const ProductPriceFilter: React.FC<Props> = ({
  className,
  filters,
  handlePriceChange,
  clearPriceFilter,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center ">
        <div className="flex items-center gap-2 text-sm font-medium">
          <DollarSign className="w-4 h-4 text-success" />
          <span>Диапазон цены</span>
        </div>
        {(filters.priceRange.min || filters.priceRange.max) && (
          <Button
            variant="ghost"
            onClick={clearPriceFilter}
            className="px-0 py-0 text-xs"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex items-start flex-col gap-1 relative sm:flex-row sm:items-center sm:gap-4">
        <Input
          type="number"
          id="min"
          placeholder="Мин. цена"
          value={filters.priceRange.min}
          onChange={(v) => handlePriceChange("min", v)}
          className="h-9"
        />
        <Input
          type="number"
          placeholder="Макс. цена"
          id="max"
          value={filters.priceRange.max}
          onChange={(v) => handlePriceChange("max", v)}
          className="h-9"
        />
      </div>
    </div>
  );
};
