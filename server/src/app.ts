import "dotenv/config";
import cors from "cors";
import express from "express";

import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL ?? "https://support-ticket-dashboard-nkp7.vercel.app",
    }),
  );

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  app.use("/api/tickets", ticketRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
