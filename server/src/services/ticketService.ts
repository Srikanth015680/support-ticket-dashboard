import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../lib/AppError.js";
import { prisma } from "../lib/prisma.js";
import type {
  CreateTicketInput,
  ListTicketsQuery,
  UpdateTicketInput,
} from "../schemas/ticketSchema.js";

export function createTicket(input: CreateTicketInput) {
  return prisma.ticket.create({
    data: input,
  });
}

export async function listTickets(query: ListTicketsQuery) {
  const {
    search,
    status,
    priority,
    sort,
    order,
    page,
    limit,
  } = query;

  const where: Prisma.TicketWhereInput = {
    ...(status && { status }),
    ...(priority && { priority }),
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          customerEmail: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy: [
        { [sort]: order },
        { id: "asc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTicketById(id: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  });

  if (!ticket) {
    throw new AppError(404, "NOT_FOUND", "Ticket not found");
  }

  return ticket;
}

export async function updateTicket(
  id: string,
  input: UpdateTicketInput,
) {
  try {
    return await prisma.ticket.update({
      where: { id },
      data: input,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new AppError(404, "NOT_FOUND", "Ticket not found");
    }

    throw error;
  }
}

export async function getSummary() {
  const groups = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });

  const counts = new Map(
    groups.map(({ status, _count }) => [status, _count._all]),
  );

  const open = counts.get("OPEN") ?? 0;
  const inProgress = counts.get("IN_PROGRESS") ?? 0;
  const resolved = counts.get("RESOLVED") ?? 0;

  return {
    total: open + inProgress + resolved,
    open,
    inProgress,
    resolved,
  };
}