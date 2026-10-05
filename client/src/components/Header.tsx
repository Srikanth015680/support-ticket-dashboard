import { Link, useLocation } from "react-router-dom";

import { PlusIcon, TicketIcon } from "./Icons";

function Brand() {
  return (
    <Link
      to="/tickets"
      className="flex items-center gap-3"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-[0_6px_14px_-4px_rgb(91_75_219/0.6)]">
        <TicketIcon />
      </span>

      <span className="text-sm font-bold leading-tight text-ink">
        Support Ticket
        <br />
        Dashboard
      </span>
    </Link>
  );
}

function navClass(active: boolean) {
  return `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
    active
      ? "bg-brand-50 text-brand-700"
      : "text-muted hover:bg-canvas hover:text-ink"
  }`;
}

export default function Header() {
  const { pathname } = useLocation();
  const onNewTicket = pathname === "/tickets/new";

  return (
    <>
      <header className="border-b border-line bg-white px-4 py-3 lg:hidden">
        <Brand />
      </header>

      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r border-line bg-white p-4 lg:flex">
        <div className="px-1 pt-2">
          <Brand />
        </div>

        <nav
          aria-label="Main"
          className="flex flex-col gap-1"
        >
          <Link
            to="/tickets"
            className={navClass(!onNewTicket)}
            aria-current={!onNewTicket ? "page" : undefined}
          >
            <TicketIcon />
            Tickets
          </Link>

          <Link
            to="/tickets/new"
            className={navClass(onNewTicket)}
            aria-current={onNewTicket ? "page" : undefined}
          >
            <PlusIcon />
            New ticket
          </Link>
        </nav>
      </aside>
    </>
  );
}