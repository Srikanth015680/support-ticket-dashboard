import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTicket,
  fetchSummary,
  fetchTicket,
  fetchTickets,
  updateTicket,
} from "../api/ticketsApi";
import type {
  TicketFilters,
  UpdateTicketInput,
} from "../types/ticket";

const TICKETS_KEY = ["tickets"] as const;
const SUMMARY_KEY = ["ticket-summary"] as const;

export function useTickets(filters: TicketFilters) {
  const { search, status, priority, order, page } = filters;

  return useQuery({
    queryKey: [
      ...TICKETS_KEY,
      search,
      status,
      priority,
      "createdAt",
      order,
      page,
    ],
    queryFn: () => fetchTickets(filters),
    placeholderData: keepPreviousData,
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => fetchTicket(id),
    enabled: Boolean(id),
  });
}

export function useTicketSummary() {
  return useQuery({
    queryKey: SUMMARY_KEY,
    queryFn: fetchSummary,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: TICKETS_KEY,
      });

      void queryClient.invalidateQueries({
        queryKey: SUMMARY_KEY,
      });
    },
  });
}

export function useUpdateTicket(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTicketInput) =>
      updateTicket(id, input),

    onSuccess: (ticket) => {
      queryClient.setQueryData(["ticket", id], ticket);

      void queryClient.invalidateQueries({
        queryKey: TICKETS_KEY,
      });

      void queryClient.invalidateQueries({
        queryKey: SUMMARY_KEY,
      });
    },
  });
}