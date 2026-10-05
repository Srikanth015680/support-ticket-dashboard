import { secondaryButtonClass } from "../lib/ui";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function getPageItems(
  page: number,
  totalPages: number,
): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  const pages = new Set(
    [1, totalPages, page - 1, page, page + 1].filter(
      (value) => value >= 1 && value <= totalPages,
    ),
  );

  const sortedPages = [...pages].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];

  for (let index = 0; index < sortedPages.length; index += 1) {
    const current = sortedPages[index];
    const previous = sortedPages[index - 1];

    if (
      previous !== undefined &&
      current - previous > 1
    ) {
      items.push("gap");
    }

    items.push(current);
  }

  return items;
}

export default function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col items-center gap-3 border-t border-line px-5 py-4 sm:flex-row sm:justify-between">
      <p className="text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-ink">
          {from}–{to}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-ink">
          {total}
        </span>
      </p>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex flex-wrap items-center justify-center gap-1.5"
        >
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={secondaryButtonClass}
          >
            Previous
          </button>

          {getPageItems(page, totalPages).map((item, index) =>
            item === "gap" ? (
              <span
                key={`gap-${index}`}
                className="px-1 text-muted"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={`min-h-11 min-w-11 rounded-xl px-3 text-sm font-semibold transition-colors ${
                  item === page
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={secondaryButtonClass}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}