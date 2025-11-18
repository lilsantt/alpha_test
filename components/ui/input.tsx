import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface Props {
  className?: string;
  label?: string;
  error?: string;
  type?: string;
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type = "text",
      label,
      placeholder,
      id,
      disabled,
      value,
      onChange,
      error,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col mb-4">
        {label && (
          <label
            htmlFor={id}
            className="mb-1 font-medium text-sm text-text-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={cn(
            "px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors disabled:bg-card/10",
            error && "border-danger",
            className
          )}
        />
        {error && <span className="text-danger text-xs mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
