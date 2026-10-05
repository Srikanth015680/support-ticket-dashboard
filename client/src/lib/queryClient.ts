import { QueryClient } from "@tanstack/react-query";

import { ApiRequestError } from "../api/ticketsApi";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof ApiRequestError) {
          const status = error.status;

          if (status !== undefined && status >= 400 && status < 500) {
            return false;
          }
        }

        return failureCount < 1;
      },
    },
  },
});