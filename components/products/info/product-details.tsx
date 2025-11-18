import { cn } from "@/lib/cn";
import React from "react";

interface Props {
  className?: string;
  productBrand: string;
  productCategory: string;
  productStock: number;
}

export const ProductDetails: React.FC<Props> = ({
  className,
  productBrand,
  productCategory,
  productStock,
}) => {
  return (
    <div className={cn("bg-card rounded-xl p-6 space-y-4", className)}>
      <h3 className="font-semibold text-text">Детали товара</h3>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
        <ProductDetail productValue={productBrand} label="Бренд" />
        <ProductDetail productValue={productCategory} label="Категория" />
        <ProductDetail
          productValue={productStock.toString()}
          label="В наличии"
        />
      </ul>
    </div>
  );
};

const ProductDetail = ({
  productValue,
  label,
}: {
  productValue: string;
  label: string;
}) => {
  return (
    <li>
      <span className="text-muted font-semibold">{label}:</span>
      <span className="ml-2 font-medium text-text first-letter:uppercase">
        {productValue.charAt(0).toUpperCase() + productValue.slice(1) || "-"}
      </span>
    </li>
  );
};
