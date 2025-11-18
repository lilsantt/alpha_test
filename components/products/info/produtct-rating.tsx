import { cn } from "@/lib/cn";
import { Star } from "lucide-react";

interface Props {
  className?: string;
  productRating: number;
}

export const ProdutctRating: React.FC<Props> = ({
  className,
  productRating,
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(productRating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-lg font-bold text-text">{productRating}</span>
    </div>
  );
};
