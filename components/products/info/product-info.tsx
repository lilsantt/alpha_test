import { Product } from "@/lib/types";
import React, { useState } from "react";
import { ProdutctRating } from "./produtct-rating";
import { ProductFeatures } from "./product-features";
import { ProductDetails } from "./product-details";
import { Star } from "lucide-react";
import { ProductImages } from "./product-images";
import { cn } from "@/lib/cn";
import { ProductNotFound } from "../product-not-found";

interface Props {
  className?: string;
  product: Product;
}

export const ProductInfo: React.FC<Props> = ({ className, product }) => {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail || "");

  if (!product) return <ProductNotFound />;
  console.log(product);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12",
        className
      )}
    >
      <ProductImages
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        productImages={product.images}
        productTitle={product.title}
      />

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </span>
            {product.rating > 4 && (
              <span className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Качество
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-text leading-tight">
            {product.title}
          </h1>

          <p className="text-lg text-muted leading-relaxed">
            {product.description}
          </p>
        </div>

        <ProdutctRating productRating={product.rating} />

        <div className="space-y-4">
          <span className="text-4xl font-bold text-text">${product.price}</span>

          <ProductFeatures className="mt-2" />

          <ProductDetails
            productBrand={product.brand || "Без бренда"}
            productCategory={product.category}
            productStock={product.stock}
          />
        </div>
      </div>
    </div>
  );
};
