import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ApiRequestError } from "../api/ticketsApi";
import Avatar from "../components/Avatar";
import { PriorityBadge, StatusBadge } from "../components/Badges";
import ErrorState from "../components/ErrorState";
import { ArrowLeftIcon, MailIcon } from "../components/Icons";
import LoadingState from "../components/LoadingState";
import Notice from "../components/Notice";
import SelectField from "../components/SelectField";
import { useTicket, useUpdateTicket } from "../hooks/useTickets";
import {
  formatDate,
  formatRelative,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "../lib/format";
import { primaryButtonClass, secondaryButtonClass } from "../lib/ui";
import { PRIORITIES, STATUSES } from "../types/ticket";
import type { Priority, Status, Ticket } from "../types/ticket";

function TicketEditor({ ticket }: { ticket: Ticket }) {
  const updateTicket = useUpdateTicket(ticket.id);

  const [status, setStatus] = useState<Status>(ticket.status);
  const [priority, setPriority] = useState<Priority>(ticket.priority);
  const [saved, setSaved] = useState(false);

  const isDirty =
    status !== ticket.status || priority !== ticket.priority;

  function handleSave() {
    setSaved(false);

    updateTicket.mutate(
      { status, priority },
      {
        onSuccess: () => setSaved(true),
      },
    );
  }

  return (
    <section className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="text-base font-semibold">Manage ticket</h2>

      {saved && (
        <Notice tone="success">
          Ticket updated successfully.
        </Notice>
      )}

      {updateTicket.isError && (
        <Notice tone="error">
          {updateTicket.error.message}
        </Notice>
      )}

      <div>
        <label
          htmlFor="ticket-status"
          className="text-sm font-medium text-muted"
        >
          Status
        </label>

        <div className="mt-1.5">
          <SelectField
            id="ticket-status"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as Status);
              setSaved(false);
            }}
          >
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <div>
        <label
          htmlFor="ticket-priority"
          className="text-sm font-medium text-muted"
        >
          Priority
        </label>

        <div className="mt-1.5">
          <SelectField
            id="ticket-priority"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value as Priority);
              setSaved(false);
            }}
          >
            {PRIORITIES.map((value) => (
              <option key={value} value={value}>
                {PRIORITY_LABELS[value]}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={!isDirty || updateTicket.isPending}
        className={`${primaryButtonClass} w-full`}
      >
        {updateTicket.isPending ? "Saving…" : "Save"}
      </button>
    </section>
  );
}

export default function TicketDetailsPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: ticket,
    isPending,
    isError,
    error,
    refetch,
  } = useTicket(id);

  const flash = (
    location.state as { flash?: string } | null
  )?.flash;

  useEffect(() => {
    if (!flash) {
      return;
    }

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [flash, location.pathname, navigate]);

  const backLink = (
    <Link
      to="/tickets"
      className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
    >
      <ArrowLeftIcon />
      Back to tickets
    </Link>
  );

  if (isPending) {
    return (
      <div className="space-y-5">
        {backLink}

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <LoadingState label="Loading ticket…" />
        </div>
      </div>
    );
  }

  if (isError) {
    const notFound =
      error instanceof ApiRequestError &&
      (error.status === 404 || error.status === 400);

    return (
      <div className="rounded-2xl border border-line bg-white shadow-card">
        {notFound ? (
          <ErrorState
            title="Ticket not found"
            message="This ticket does not exist or the link is invalid."
          >
            <Link
              to="/tickets"
              className={primaryButtonClass}
            >
              Back to tickets
            </Link>
          </ErrorState>
        ) : (
          <ErrorState
            message={error.message}
            onRetry={() => void refetch()}
          >
            <Link
              to="/tickets"
              className={secondaryButtonClass}
            >
              Back to tickets
            </Link>
          </ErrorState>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {backLink}

      {flash && <Notice tone="success">{flash}</Notice>}

      <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
        <article className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
          <h1 className="text-2xl font-bold leading-tight">
            {ticket.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>

          <h2 className="mt-7 text-sm font-semibold text-muted">
            Description
          </h2>

          <p className="mt-2 max-w-prose whitespace-pre-wrap leading-relaxed">
            {ticket.description}
          </p>

          <h2 className="mt-8 text-sm font-semibold text-muted">
            Activity
          </h2>

          <ol className="mt-3 space-y-5 border-l-2 border-line pl-5 text-sm">
            <li className="relative">
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-500 ring-2 ring-brand-100" />

              <p className="font-semibold">Created at</p>

              <p className="text-muted">
                {formatDate(ticket.createdAt)} (
                {formatRelative(ticket.createdAt)})
              </p>
            </li>

            <li className="relative">
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-slate-300 ring-2 ring-line" />

              <p className="font-semibold">Updated at</p>

              <p className="text-muted">
                {formatDate(ticket.updatedAt)}
              </p>
            </li>
          </ol>
        </article>

        <div className="space-y-5">
          <TicketEditor ticket={ticket} />

          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="text-base font-semibold">Customer</h2>

            <div className="mt-4 flex items-center gap-3">
              <Avatar email={ticket.customerEmail} size="lg" />

              <div className="min-w-0">
                <p className="text-sm text-muted">
                  Customer email
                </p>

                <p className="break-all text-sm font-medium">
                  {ticket.customerEmail}
                </p>
              </div>
            </div>

            <a
              href={`mailto:${ticket.customerEmail}`}
              className={`${secondaryButtonClass} mt-4 w-full`}
            >
              <MailIcon />
              Email customer
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}