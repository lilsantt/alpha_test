import { cn } from "@/lib/cn";
import { Check, Shield, Truck } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const ProductFeatures: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-8 py-4",
        className
      )}
    >
      <div className="flex items-center gap-3 text-sm text-text p-2 bg-success/10 rounded-md ">
        <Truck className="w-5 h-5 text-success" />
        <span className="text-success">Доставка</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-text p-2 bg-primary/10 rounded-md">
        <Shield className="w-5 h-5 text-primary" />
        <span className="text-primary ">Гарантия</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-text p-2 bg-success/10 rounded-md">
        <Check className="w-5 h-5 text-success" />
        <span className="text-success ">Возврат</span>
      </div>
    </div>
  );
};
