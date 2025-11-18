"use client";
import { cn } from "@/lib/cn";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ArrowUpCircleIcon, Heart } from "lucide-react";
import { Filters, PriceRange } from "@/lib/types";
import { ProductPriceFilter } from "./product-price-filter";
import { ProductFavoriteFilter } from "./product-favorite-filter";

interface Props {
  className?: string;
  filters: Filters;
  onChange: (filters: Partial<Filters>) => void;
}

export const ProductFilters: React.FC<Props> = ({
  className,
  filters,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handlePriceChange = (field: keyof PriceRange, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      onChange({
        priceRange: {
          ...filters.priceRange,
          [field]: value,
        },
      });
    }
  };

  const clearPriceFilter = () => {
    onChange({
      priceRange: { min: "", max: "" },
    });
  };

  const hasActiveFilters =
    filters.favorites || filters.priceRange.min || filters.priceRange.max;

  return (
    <div className={cn(className)}>
      <Button onClick={() => setOpen(!open)}>
        <span>Фильтры</span>
        <ArrowUpCircleIcon
          className={cn("ml-2 w-4 h-4", open && "rotate-180")}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 mt-3 shadow-md rounded-lg bg-card",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 space-y-4">
          <ProductFavoriteFilter filters={filters} onChange={onChange} />
          <ProductPriceFilter
            filters={filters}
            handlePriceChange={handlePriceChange}
            clearPriceFilter={clearPriceFilter}
          />

          {hasActiveFilters && (
            <div className="pt-2">
              <Button
                variant="ghost"
                onClick={() =>
                  onChange({
                    favorites: false,
                    priceRange: { min: "", max: "" },
                  })
                }
                className="text-md w-full"
              >
                Сбросить все фильтры
              </Button>
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.favorites && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-danger/10 text-danger rounded-full">
              <Heart className="w-3 h-3" />
              Избранные
            </span>
          )}
          {(filters.priceRange.min || filters.priceRange.max) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-success/10 text-success rounded-full">
              ${filters.priceRange.min || "0"} - $
              {filters.priceRange.max || "∞"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
