import axios from "axios";

import type {
  CreateTicketInput,
  Ticket,
  TicketFilters,
  TicketListResponse,
  TicketSummary,
  UpdateTicketInput,
} from "../types/ticket";

export const PAGE_SIZE = 10;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "https://support-ticket-dashboard-1-y8z9.onrender.com/api",
  timeout: 10_000,
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(
        new ApiRequestError("Unexpected error. Please try again."),
      );
    }

    if (!error.response) {
      return Promise.reject(
        new ApiRequestError(
          "Cannot reach the server. Check your connection and try again.",
        ),
      );
    }

    const status = error.response.status;
    const apiError = error.response.data?.error;

    if (status >= 500) {
      return Promise.reject(
        new ApiRequestError(
          "Something went wrong on our side. Please try again.",
          status,
        ),
      );
    }

    return Promise.reject(
      new ApiRequestError(
        apiError?.message ?? "The request could not be completed.",
        status,
        apiError?.details,
      ),
    );
  },
);

export async function fetchTickets(
  filters: TicketFilters,
): Promise<TicketListResponse> {
  const { data } = await http.get<TicketListResponse>("/tickets", {
    params: {
      search: filters.search || undefined,
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      sort: "createdAt",
      order: filters.order,
      page: filters.page,
      limit: PAGE_SIZE,
    },
  });

  return data;
}

export async function fetchTicket(id: string): Promise<Ticket> {
  const { data } = await http.get<Ticket>(`/tickets/${id}`);

  return data;
}

export async function createTicket(
  input: CreateTicketInput,
): Promise<Ticket> {
  const { data } = await http.post<Ticket>("/tickets", input);

  return data;
}

export async function updateTicket(
  id: string,
  input: UpdateTicketInput,
): Promise<Ticket> {
  const { data } = await http.patch<Ticket>(
    `/tickets/${id}`,
    input,
  );

  return data;
}

export async function fetchSummary(): Promise<TicketSummary> {
  const { data } = await http.get<TicketSummary>("/tickets/summary");

  return data;
}
