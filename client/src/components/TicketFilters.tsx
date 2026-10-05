import type { ReactNode } from "react";

import { useTicketSummary } from "../hooks/useTickets";
import { PRIORITY_LABELS, STATUS_LABELS } from "../lib/format";
import { controlClass } from "../lib/ui";
import { PRIORITIES } from "../types/ticket";
import type {
  Priority,
  SortOrder,
  Status,
} from "../types/ticket";
import { ChevronDownIcon, SearchIcon } from "./Icons";

interface TicketFiltersProps {
  search: string;
  status: Status | "";
  priority: Priority | "";
  order: SortOrder;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: Status | "") => void;
  onPriorityChange: (value: Priority | "") => void;
  onOrderChange: (value: SortOrder) => void;
}

const STATUS_TABS: {
  value: Status | "";
  label: string;
}[] = [
  { value: "", label: "All" },
  { value: "OPEN", label: STATUS_LABELS.OPEN },
  { value: "IN_PROGRESS", label: STATUS_LABELS.IN_PROGRESS },
  { value: "RESOLVED", label: STATUS_LABELS.RESOLVED },
];

function InlineSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="relative flex min-h-11 min-w-0 flex-1 items-center rounded-xl border border-line bg-white focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15 sm:flex-none">
      <span className="pl-3 text-sm text-muted">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 min-w-0 flex-1 appearance-none bg-transparent pl-2 pr-8 text-sm font-semibold focus:outline-none"
      >
        {children}
      </select>

      <ChevronDownIcon className="pointer-events-none absolute right-3 text-muted" />
    </label>
  );
}

export default function TicketFilters({
  search,
  status,
  priority,
  order,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onOrderChange,
}: TicketFiltersProps) {
  const { data: summary } = useTicketSummary();

  const counts: Record<Status | "", number | undefined> = {
    "": summary?.total,
    OPEN: summary?.open,
    IN_PROGRESS: summary?.inProgress,
    RESOLVED: summary?.resolved,
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or customer email"
          aria-label="Search tickets"
          className={`${controlClass} pl-10`}
        />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Status"
          className="-mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {STATUS_TABS.map((tab) => {
            const active = status === tab.value;
            const count = counts[tab.value];

            return (
              <button
                key={tab.label}
                type="button"
                aria-pressed={active}
                onClick={() => onStatusChange(tab.value)}
                className={`flex min-h-11 items-center gap-2 whitespace-nowrap rounded-xl px-4 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                {tab.label}

                {count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 text-xs tabular-nums ${
                      active ? "bg-white/20" : "bg-canvas"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex min-w-0 gap-2">
          <InlineSelect
            label="Priority"
            value={priority}
            onChange={(value) =>
              onPriorityChange(value as Priority | "")
            }
          >
            <option value="">All</option>

            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {PRIORITY_LABELS[item]}
              </option>
            ))}
          </InlineSelect>

          <InlineSelect
            label="Sort"
            value={order}
            onChange={(value) =>
              onOrderChange(value as SortOrder)
            }
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </InlineSelect>
        </div>
      </div>
    </div>
  );
}