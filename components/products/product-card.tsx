"use client";
import { cn } from "@/lib/cn";
import { Product } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Heart, Trash } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite?: (id: number) => void;
  onDeleteProduct?: (id: number) => void;
}

export const ProductCard: React.FC<Props> = ({
  className,
  product,
  isFavorite,
  onToggleFavorite,
  onDeleteProduct,
}) => {
  return (
    <article
      className={cn(
        "border border-border p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card h-full overflow-hidden",
        className
      )}
    >
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
        <div className="block relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span className="text-sm text-text-muted mb-1">{product.brand}</span>
          <h2 className="font-semibold text-lg line-clamp-1">
            {product.title}
          </h2>
        </div>

        <p className="text-sm text-text-muted line-clamp-3 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-base text-text">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-yellow-500 font-medium">
            ⭐ {product.rating}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2 border-t border-border ">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(product.id);
            }}
            className="active:scale-75"
          >
            <Heart
              className={cn(
                "w-5 h-5 text-danger transition-all duration-900 ease-in-out",
                isFavorite && "text-danger fill-danger"
              )}
            />
          </Button>

          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              onDeleteProduct?.(product.id);
            }}
          >
            <Trash className="w-5 h-5 mr-2" /> <span>Удалить</span>
          </Button>
        </div>
      </Link>
    </article>
  );
};
