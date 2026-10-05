import { Link } from "react-router-dom";

import {
  formatDate,
  formatRelative,
  formatShortDate,
} from "../lib/format";
import type { Ticket } from "../types/ticket";
import Avatar from "./Avatar";
import { PriorityBadge, StatusBadge } from "./Badges";
import { ChevronRightIcon } from "./Icons";

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({
  tickets,
}: TicketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-canvas/70 text-xs font-semibold text-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">
              Title
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Customer
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Priority
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Created
            </th>
            <th scope="col" className="w-10 px-3 py-3">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-line">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="group transition-colors hover:bg-brand-50/50"
            >
              <td className="max-w-xs px-5 py-4">
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="block truncate font-semibold hover:text-brand-700 focus-visible:text-brand-700"
                >
                  {ticket.title}
                </Link>

                <p className="mt-0.5 truncate text-xs text-muted">
                  {ticket.description}
                </p>
              </td>

              <td className="px-5 py-4">
                <span className="flex items-center gap-2.5 text-muted">
                  <Avatar email={ticket.customerEmail} />
                  <span className="truncate">
                    {ticket.customerEmail}
                  </span>
                </span>
              </td>

              <td className="px-5 py-4">
                <PriorityBadge priority={ticket.priority} />
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={ticket.status} />
              </td>

              <td className="whitespace-nowrap px-5 py-4">
                <time
                  dateTime={ticket.createdAt}
                  title={formatDate(ticket.createdAt)}
                >
                  <span className="block font-medium">
                    {formatRelative(ticket.createdAt)}
                  </span>

                  <span className="block text-xs text-muted">
                    {formatShortDate(ticket.createdAt)}
                  </span>
                </time>
              </td>

              <td className="px-3 py-4 text-muted/60 transition-colors group-hover:text-brand-600">
                <Link
                  to={`/tickets/${ticket.id}`}
                  aria-label={`Open ${ticket.title}`}
                  className="grid h-9 w-9 place-items-center rounded-lg hover:bg-brand-50 focus-visible:bg-brand-50"
                >
                  <ChevronRightIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}