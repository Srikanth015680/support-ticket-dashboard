export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
export const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;

export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];
export type SortOrder = "asc" | "desc";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TicketListResponse {
  data: Ticket[];
  pagination: Pagination;
}

export interface TicketSummary {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}

export interface TicketFilters {
  search: string;
  status: Status | "";
  priority: Priority | "";
  order: SortOrder;
  page: number;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
  status?: Status;
}

export interface UpdateTicketInput {
  status?: Status;
  priority?: Priority;
}