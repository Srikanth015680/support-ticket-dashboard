import type { SelectHTMLAttributes } from "react";

import { controlClass } from "../lib/ui";
import { ChevronDownIcon } from "./Icons";

export default function SelectField({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${controlClass} appearance-none pr-9 ${className}`}
      >
        {children}
      </select>

      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}