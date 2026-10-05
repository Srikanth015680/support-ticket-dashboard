import { secondaryButtonClass } from "../lib/ui";
import { InboxIcon } from "./Icons";

interface EmptyStateProps {
  onClear?: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <InboxIcon width={26} height={26} />
      </span>

      <h3 className="mt-4 text-base font-semibold">
        No tickets found
      </h3>

      <p className="mt-1 text-sm text-muted">
        Try changing your search or filters.
      </p>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={`${secondaryButtonClass} mt-5`}
        >
          Clear search and filters
        </button>
      )}
    </div>
  );
}