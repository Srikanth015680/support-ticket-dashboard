import { QueryClient } from "@tanstack/react-query";

import { ApiRequestError } from "../api/ticketsApi";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) =>
        failureCount < 1 &&
        !(
          error instanceof ApiRequestError &&
          error.status >= 400 &&
          error.status < 500
        ),
    },
  },
});