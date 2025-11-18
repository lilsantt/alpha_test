import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Container } from "./container";
import { cn } from "@/lib/cn";
import { Nav } from "./nav";
import { METADATA } from "@/constants/meta";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        "bg-card shadow py-2 sm:py-4 fixed top-0 left-0 w-full z-50",
        className
      )}
    >
      <Container className="flex items-center justify-between py-2">
        <Link href="/products" className="flex gap-2 items-center">
          <ShoppingBag className="w-7 h-7 " />
          <h3 className="text-2xl font-semibold hidden sm:block">
            {METADATA.title}
          </h3>
        </Link>
        <Nav />
      </Container>
    </header>
  );
};
