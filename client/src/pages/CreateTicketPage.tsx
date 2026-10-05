import { Link, useNavigate } from "react-router-dom";

import { ApiRequestError } from "../api/ticketsApi";
import { ArrowLeftIcon } from "../components/Icons";
import Notice from "../components/Notice";
import TicketForm from "../components/TicketForm";
import { useCreateTicket } from "../hooks/useTickets";
import type { CreateTicketInput } from "../types/ticket";

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const createTicket = useCreateTicket();

  function handleSubmit(values: CreateTicketInput) {
    createTicket.mutate(values, {
      onSuccess: (ticket) => {
        navigate(`/tickets/${ticket.id}`, {
          state: {
            flash: "Ticket created successfully.",
          },
        });
      },
    });
  }

  const error = createTicket.error;

  const serverErrors =
    error instanceof ApiRequestError
      ? error.details
      : undefined;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeftIcon />
        Back to tickets
      </Link>

      <div>
        <h1 className="text-3xl font-bold">New ticket</h1>

        <p className="mt-1 text-sm text-muted">
          Describe the customer's problem so the team can pick it up.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
        {error && (
          <div className="mb-5">
            <Notice tone="error">
              {error.message}
            </Notice>
          </div>
        )}

        <TicketForm
          onSubmit={handleSubmit}
          isSubmitting={createTicket.isPending}
          serverErrors={serverErrors}
        />
      </div>
    </div>
  );
}