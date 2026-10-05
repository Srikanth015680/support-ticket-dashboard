import { Link } from "react-router-dom";

import { formatDate, formatRelative } from "../lib/format";
import type { Ticket } from "../types/ticket";
import Avatar from "./Avatar";
import { PriorityBadge, StatusBadge } from "./Badges";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({
  ticket,
}: TicketCardProps) {
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="block space-y-3 px-4 py-4 active:bg-canvas"
    >
      <div className="flex items-start gap-3">
        <Avatar email={ticket.customerEmail} />

        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug">
            {ticket.title}
          </p>

          <p className="truncate text-sm text-muted">
            {ticket.customerEmail}
          </p>

          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {ticket.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pl-11">
        <div className="flex items-center gap-3">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>

        <time
          className="text-xs text-muted"
          dateTime={ticket.createdAt}
          title={formatDate(ticket.createdAt)}
        >
          {formatRelative(ticket.createdAt)}
        </time>
      </div>
    </Link>
  );
}