import type { ReactNode } from "react";

import { secondaryButtonClass } from "../lib/ui";
import { AlertIcon } from "./Icons";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  children?: ReactNode;
}

export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  children,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center px-6 py-16 text-center"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600">
        <AlertIcon width={26} height={26} />
      </span>

      <h3 className="mt-4 text-base font-semibold">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-muted">
        {message}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={secondaryButtonClass}
          >
            Try again
          </button>
        )}

        {children}
      </div>
    </div>
  );
}