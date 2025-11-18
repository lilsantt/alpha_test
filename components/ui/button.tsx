import { cn } from "@/lib/cn";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}) => {
  const buttonVariatns = {
    primary:
      "bg-primary text-background hover:bg-primary/80 disabled:bg-primary/50 disabled:text-muted-foreground",
    danger:
      "bg-danger text-background hover:bg-danger/80 disabled:bg-danger/50 disabled:text-muted-foreground",
    ghost: "text-primary hover:text-primary/80 disabled:text-muted-foreground",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-2 active:scale-95 inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        buttonVariatns[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
