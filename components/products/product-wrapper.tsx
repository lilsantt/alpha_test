"use client";
import { cn } from "@/lib/cn";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/store";
import { fetchProductById } from "@/lib/api";
import { ProductInfo } from "./info/product-info";
import { ProductNotFound } from "./product-not-found";
import { LoadingSpinner } from "../ui/loading-spinner";

interface Props {
  className?: string;
  productId: string;
}

export const ProductWrapper: React.FC<Props> = ({ className, productId }) => {
  const router = useRouter();
  const { products } = useProductStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const id = Number(productId);
      let result = products.find((p) => p.id === id);

      if (!result) {
        result = (await fetchProductById(String(id)).catch(
          () => null
        )) as Product;
      }

      if (!result) {
        router.push("/products");
        return;
      }

      setProduct(result);
      setLoading(false);
    };

    load();
  }, [productId, products, router]);

  if (loading) {
    return <LoadingSpinner className="min-h-[80vh]" />;
  }

  if (!product?.id) {
    return <ProductNotFound />;
  }

  const handleBack = () => router.back();
  return (
    <div className={cn("min-h-80vh bg-gray-50/30", className)}>
      <div>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="group hover:bg-white hover:shadow-sm transition-all duration-200"
        >
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Назад к товарам</span>
        </Button>
      </div>

      <ProductInfo product={product} className="mt-4 sm:mt-8" />
    </div>
  );
};
