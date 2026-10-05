import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";

const app = createApp();

const validTicket = {
  title: "Payment failed",
  description: "Customer cannot complete payment",
  customerEmail: "customer@example.com",
  priority: "HIGH",
};

type Priority = "LOW" | "MEDIUM" | "HIGH";
type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

async function insertTicket(
  title: string,
  {
    customerEmail = "user@example.com",
    priority = "MEDIUM",
    status = "OPEN",
    daysAgo = 0,
  }: {
    customerEmail?: string;
    priority?: Priority;
    status?: Status;
    daysAgo?: number;
  } = {},
) {
  return prisma.ticket.create({
    data: {
      title,
      description: `Description for ${title}`,
      customerEmail,
      priority,
      status,
      createdAt: new Date(Date.now() - daysAgo * 86_400_000),
    },
  });
}

beforeEach(async () => {
  await prisma.ticket.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/tickets", () => {
  it("creates a ticket with OPEN status by default", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send(validTicket);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("OPEN");
    expect(await prisma.ticket.count()).toBe(1);
  });

  it("rejects an invalid email", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        ...validTicket,
        customerEmail: "invalid-email",
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        details: {
          customerEmail: "Invalid email address",
        },
      },
    });

    expect(await prisma.ticket.count()).toBe(0);
  });

  it("rejects a title longer than 120 characters", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        ...validTicket,
        title: "a".repeat(121),
      });

    expect(response.status).toBe(400);
    expect(response.body.error.details.title).toBeDefined();
  });

  it("rejects a missing title", async () => {
    const { title: _title, ...ticket } = validTicket;

    const response = await request(app)
      .post("/api/tickets")
      .send(ticket);

    expect(response.status).toBe(400);
    expect(response.body.error.details.title).toBe("Title is required");
  });

  it("rejects a missing description", async () => {
    const { description: _description, ...ticket } = validTicket;

    const response = await request(app)
      .post("/api/tickets")
      .send(ticket);

    expect(response.status).toBe(400);
    expect(response.body.error.details.description).toBe(
      "Description is required",
    );
  });
});

describe("GET /api/tickets", () => {
  beforeEach(async () => {
    await insertTicket("Payment failed", {
      customerEmail: "alice@example.com",
      priority: "HIGH",
      status: "OPEN",
      daysAgo: 1,
    });

    await insertTicket("Payment refund", {
      customerEmail: "bob@example.com",
      priority: "LOW",
      status: "RESOLVED",
      daysAgo: 2,
    });

    await insertTicket("Login issue", {
      customerEmail: "carol@example.com",
      priority: "HIGH",
      status: "OPEN",
      daysAgo: 3,
    });

    await insertTicket("Account locked", {
      customerEmail: "account@example.com",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      daysAgo: 4,
    });
  });

  it("searches by title case-insensitively", async () => {
    const response = await request(app)
      .get("/api/tickets")
      .query({ search: "PAYMENT" });

    const titles = response.body.data
      .map((ticket: { title: string }) => ticket.title)
      .sort();

    expect(response.status).toBe(200);
    expect(titles).toEqual(["Payment failed", "Payment refund"]);
  });

  it("searches by customer email case-insensitively", async () => {
    await insertTicket("Email search ticket", {
      customerEmail: "payments@corp.com",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
    });

    const response = await request(app)
      .get("/api/tickets")
      .query({ search: "PAYMENTS@CORP.COM" });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe("Email search ticket");
  });

  it("combines search, status, and priority filters", async () => {
    const response = await request(app)
      .get("/api/tickets")
      .query({
        search: "payment",
        status: "OPEN",
        priority: "HIGH",
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe("Payment failed");
    expect(response.body.pagination.total).toBe(1);
  });

  it("sorts by creation date", async () => {
    const newest = await request(app).get("/api/tickets");

    const oldest = await request(app)
      .get("/api/tickets")
      .query({ order: "asc" });

    expect(newest.status).toBe(200);
    expect(oldest.status).toBe(200);
    expect(newest.body.data[0].title).toBe("Payment failed");
    expect(oldest.body.data[0].title).toBe("Account locked");
  });

  it("paginates results on the backend", async () => {
    const page1 = await request(app)
      .get("/api/tickets")
      .query({ page: 1, limit: 3 });

    const page2 = await request(app)
      .get("/api/tickets")
      .query({ page: 2, limit: 3 });

    expect(page1.status).toBe(200);
    expect(page2.status).toBe(200);
    expect(page1.body.data).toHaveLength(3);
    expect(page2.body.data).toHaveLength(1);

    expect(page1.body.pagination).toEqual({
      page: 1,
      limit: 3,
      total: 4,
      totalPages: 2,
    });
  });

  it("returns 10 tickets per page by default", async () => {
    await prisma.ticket.deleteMany();

    for (let index = 0; index < 12; index++) {
      await insertTicket(`Ticket ${index}`, {
        daysAgo: index,
      });
    }

    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(10);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      limit: 10,
      total: 12,
      totalPages: 2,
    });
  });

  it("rejects an invalid status filter", async () => {
    const response = await request(app)
      .get("/api/tickets")
      .query({ status: "DONE" });

    expect(response.status).toBe(400);
  });

  it("rejects an invalid priority filter", async () => {
    const response = await request(app)
      .get("/api/tickets")
      .query({ priority: "URGENT" });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/tickets/:id", () => {
  it("returns 404 for an unknown ticket", async () => {
    const response = await request(app).get(
      "/api/tickets/00000000-0000-4000-8000-000000000000",
    );

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("returns 400 for a malformed ticket id", async () => {
    const response = await request(app).get(
      "/api/tickets/not-a-valid-id",
    );

    expect(response.status).toBe(400);
  });
});

describe("PATCH /api/tickets/:id", () => {
  it("updates status and priority", async () => {
    const ticket = await insertTicket("Refund request", {
      priority: "LOW",
      status: "OPEN",
    });

    const response = await request(app)
      .patch(`/api/tickets/${ticket.id}`)
      .send({
        status: "IN_PROGRESS",
        priority: "HIGH",
      });

    const stored = await prisma.ticket.findUniqueOrThrow({
      where: { id: ticket.id },
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "IN_PROGRESS",
      priority: "HIGH",
    });

    expect(stored).toMatchObject({
      status: "IN_PROGRESS",
      priority: "HIGH",
    });
  });

  it("rejects an invalid status", async () => {
    const ticket = await insertTicket("Refund request");

    const response = await request(app)
      .patch(`/api/tickets/${ticket.id}`)
      .send({
        status: "DONE",
      });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/tickets/summary", () => {
  it("returns counts for the complete dataset", async () => {
    await insertTicket("A", { status: "OPEN" });
    await insertTicket("B", { status: "OPEN" });
    await insertTicket("C", { status: "IN_PROGRESS" });
    await insertTicket("D", { status: "RESOLVED" });
    await insertTicket("E", { status: "RESOLVED" });
    await insertTicket("F", { status: "RESOLVED" });

    const response = await request(app).get("/api/tickets/summary");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 6,
      open: 2,
      inProgress: 1,
      resolved: 3,
    });
  });

  it("returns zero counts when there are no tickets", async () => {
    const response = await request(app).get("/api/tickets/summary");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
    });
  });
});