import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import Pagination from "../components/Pagination";
import SummaryCards from "../components/SummaryCards";
import TicketCard from "../components/TicketCard";
import TicketFilters from "../components/TicketFilters";
import TicketTable from "../components/TicketTable";
import { PlusIcon } from "../components/Icons";
import { useDebounce } from "../hooks/useDebounce";
import { useTickets } from "../hooks/useTickets";
import { PAGE_SIZE } from "../api/ticketsApi";
import { cardClass, primaryButtonClass } from "../lib/ui";
import { PRIORITIES, STATUSES } from "../types/ticket";
import type {
  Priority,
  Status,
  TicketFilters as Filters,
} from "../types/ticket";

function readFilters(params: URLSearchParams): Filters {
  const status = params.get("status");
  const priority = params.get("priority");
  const page = Number(params.get("page"));

  return {
    search: params.get("search") ?? "",
    status: STATUSES.includes(status as Status) ? (status as Status) : "",
    priority: PRIORITIES.includes(priority as Priority)
      ? (priority as Priority)
      : "",
    order: params.get("order") === "asc" ? "asc" : "desc",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export default function TicketsPage() {
  const [params, setParams] = useSearchParams();
  const filters = readFilters(params);

  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  function updateFilters(patch: Partial<Filters>) {
    const next = { ...filters, ...patch };

    if (!("page" in patch)) {
      next.page = 1;
    }

    const nextParams = new URLSearchParams();

    if (next.search) {
      nextParams.set("search", next.search);
    }

    if (next.status) {
      nextParams.set("status", next.status);
    }

    if (next.priority) {
      nextParams.set("priority", next.priority);
    }

    if (next.order === "asc") {
      nextParams.set("order", "asc");
    }

    if (next.page > 1) {
      nextParams.set("page", String(next.page));
    }

    setParams(nextParams);
  }

  useEffect(() => {
    const search = debouncedSearch.trim();

    if (search !== filters.search) {
      updateFilters({ search });
    }
  }, [debouncedSearch]);

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isPlaceholderData,
  } = useTickets(filters);

  const hasActiveFilters = Boolean(
    filters.search || filters.status || filters.priority,
  );

  function clearFilters() {
    setSearchInput("");
    setParams(new URLSearchParams());
  }

  function renderResults() {
    if (isPending) {
      return <LoadingState label="Loading tickets…" />;
    }

    if (isError) {
      return (
        <ErrorState
          message={error.message}
          onRetry={() => void refetch()}
        />
      );
    }

    if (data.data.length === 0) {
      return (
        <EmptyState
          onClear={hasActiveFilters ? clearFilters : undefined}
        />
      );
    }

    return (
      <>
        <div className="hidden md:block">
          <TicketTable tickets={data.data} />
        </div>

        <div className="divide-y divide-line md:hidden">
          {data.data.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        <Pagination
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          total={data.pagination.total}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => updateFilters({ page })}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="mt-1 text-sm text-muted">
            Find, review and update customer support requests.
          </p>
        </div>

        <Link
          to="/tickets/new"
          className={`${primaryButtonClass} shrink-0`}
        >
          <PlusIcon />
          New Ticket
        </Link>
      </div>

      <SummaryCards />

      <section
        aria-label="Tickets"
        aria-busy={isPlaceholderData}
        className={`${cardClass} overflow-hidden`}
      >
        <div className="border-b border-line p-4 sm:p-5">
          <TicketFilters
            search={searchInput}
            status={filters.status}
            priority={filters.priority}
            order={filters.order}
            onSearchChange={setSearchInput}
            onStatusChange={(status) => updateFilters({ status })}
            onPriorityChange={(priority) => updateFilters({ priority })}
            onOrderChange={(order) => updateFilters({ order })}
          />
        </div>

        <div
          className={`transition-opacity ${
            isPlaceholderData ? "opacity-60" : ""
          }`}
        >
          {renderResults()}
        </div>
      </section>
    </div>
  );
}