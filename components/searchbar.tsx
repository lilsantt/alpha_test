import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/cn";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface Props {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Searchbar: React.FC<Props> = ({
  className,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={cn("relative", className)}>
      <Input
        id="search"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(v) => onChange(v)}
        className="w-full p-2 border border-border rounded-md bg-card"
      />
      {value && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => onChange("")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
