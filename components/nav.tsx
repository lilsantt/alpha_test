import { NAVIGATION } from "@/constants/paths";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const Nav: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-4">
        {NAVIGATION.map(({ path, name }) => (
          <li key={path}>
            <Link
              href={path}
              className="text-text hover:text-primary transition-colors duration-200"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
