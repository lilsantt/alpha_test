import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  productImages: string[];
  productTitle: string;
}

export const ProductImages: React.FC<Props> = ({
  className,
  selectedImage,
  setSelectedImage,
  productImages,
  productTitle,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="aspect-square rounded-2xl overflow-hidden bg-card shadow-lg border border-card/10">
        <Image
          src={selectedImage}
          alt={productTitle}
          width={600}
          height={600}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>

      {productImages.length > 1 && (
        <ul className="flex gap-3 overflow-x-auto pb-2">
          {productImages.map((image, index) => (
            <li
              key={image}
              className={cn(
                "shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer bg-card shadow-sm",
                selectedImage === image
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary"
              )}
            >
              <button onClick={() => setSelectedImage(image)}>
                <Image
                  src={image}
                  alt={`${productTitle} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
