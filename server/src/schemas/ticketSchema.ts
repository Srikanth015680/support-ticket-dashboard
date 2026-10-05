import { z } from "zod";

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
export const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;

const prioritySchema = z.enum(PRIORITIES, {
  message: "Priority must be LOW, MEDIUM or HIGH",
});

const statusSchema = z.enum(STATUSES, {
  message: "Status must be OPEN, IN_PROGRESS or RESOLVED",
});

export const createTicketSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be 120 characters or fewer"),

  description: z
    .string({ message: "Description is required" })
    .trim()
    .min(1, "Description is required"),

  customerEmail: z
    .string({ message: "Customer email is required" })
    .trim()
    .email("Invalid email address"),

  priority: prioritySchema,

  status: statusSchema.default("OPEN"),
});

export const updateTicketSchema = z
  .object({
    status: statusSchema.optional(),
    priority: prioritySchema.optional(),
  })
  .refine(
    ({ status, priority }) =>
      status !== undefined || priority !== undefined,
    {
      message: "Provide at least one of status or priority",
    },
  );

export const listTicketsQuerySchema = z.object({
  search: z.string().trim().optional(),

  status: statusSchema.optional(),

  priority: prioritySchema.optional(),

  sort: z.enum(["createdAt"]).default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const ticketIdSchema = z.string().uuid("Invalid ticket id");

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;

export type ListTicketsQuery = z.infer<typeof listTicketsQuerySchema>;