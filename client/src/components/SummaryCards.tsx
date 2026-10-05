import type { ReactNode } from "react";

import { useTicketSummary } from "../hooks/useTickets";
import { cardClass } from "../lib/ui";
import {
  CheckIcon,
  InboxIcon,
  LoaderIcon,
  TicketIcon,
} from "./Icons";

interface Stat {
  label: string;
  value: number;
  icon: ReactNode;
  tile: string;
  bar: string;
}

export default function SummaryCards() {
  const { data, isPending, isError, refetch } = useTicketSummary();

  const total = data?.total ?? 0;

  const stats: Stat[] = [
    {
      label: "Open",
      value: data?.open ?? 0,
      icon: <InboxIcon />,
      tile: "bg-blue-50 text-blue-600",
      bar: "bg-blue-500",
    },
    {
      label: "In Progress",
      value: data?.inProgress ?? 0,
      icon: <LoaderIcon />,
      tile: "bg-amber-50 text-amber-600",
      bar: "bg-amber-500",
    },
    {
      label: "Resolved",
      value: data?.resolved ?? 0,
      icon: <CheckIcon />,
      tile: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500",
    },
  ];

  return (
    <section aria-label="Ticket summary">
      {isError && (
        <p
          role="alert"
          className="mb-3 text-sm text-red-700"
        >
          Could not load summary counts.{" "}
          <button
            type="button"
            onClick={() => void refetch()}
            className="font-semibold underline"
          >
            Retry
          </button>
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="relative col-span-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-violet-500 p-5 text-white shadow-[0_14px_30px_-12px_rgb(91_75_219/0.7)] lg:col-span-1">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20">
            <TicketIcon />
          </span>

          <p className="mt-4 text-sm font-medium text-white/85">
            Total Tickets
          </p>

          {isPending ? (
            <div
              className="mt-1 h-9 w-14 animate-pulse rounded bg-white/25"
              aria-label="Loading"
            />
          ) : (
            <p className="text-4xl font-bold tabular-nums">
              {data?.total ?? "–"}
            </p>
          )}
        </div>

        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${cardClass} p-3.5 sm:p-5`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl ${stat.tile}`}
            >
              {stat.icon}
            </span>

            <p className="mt-3 text-sm font-medium text-muted sm:mt-4">
              {stat.label}
            </p>

            {isPending ? (
              <div
                className="mt-1 h-9 w-12 animate-pulse rounded bg-line"
                aria-label="Loading"
              />
            ) : (
              <p className="text-3xl font-bold tabular-nums sm:text-4xl">
                {stat.value}
              </p>
            )}

            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
              aria-hidden="true"
            >
              <div
                className={`h-full rounded-full ${stat.bar} transition-[width] duration-500`}
                style={{
                  width:
                    total > 0
                      ? `${(stat.value / total) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}