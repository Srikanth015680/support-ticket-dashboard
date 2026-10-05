import type { Request, Response } from "express";

import * as ticketService from "../services/ticketService.js";
import {
  createTicketSchema,
  listTicketsQuerySchema,
  ticketIdSchema,
  updateTicketSchema,
} from "../schemas/ticketSchema.js";

export async function createTicket(req: Request, res: Response) {
  const input = createTicketSchema.parse(req.body);

  const ticket = await ticketService.createTicket(input);

  res.status(201).json(ticket);
}

export async function listTickets(req: Request, res: Response) {
  const query = listTicketsQuerySchema.parse(req.query);

  const result = await ticketService.listTickets(query);

  res.status(200).json(result);
}

export async function getTicket(req: Request, res: Response) {
  const id = ticketIdSchema.parse(req.params.id);

  const ticket = await ticketService.getTicketById(id);

  res.status(200).json(ticket);
}

export async function updateTicket(req: Request, res: Response) {
  const id = ticketIdSchema.parse(req.params.id);
  const input = updateTicketSchema.parse(req.body);

  const ticket = await ticketService.updateTicket(id, input);

  res.status(200).json(ticket);
}

export async function getSummary(_req: Request, res: Response) {
  const summary = await ticketService.getSummary();

  res.status(200).json(summary);
}