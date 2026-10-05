import { Router } from "express";

import * as ticketController from "../controllers/ticketController.js";

const router = Router();

router.get("/summary", ticketController.getSummary);
router.get("/", ticketController.listTickets);
router.post("/", ticketController.createTicket);
router.get("/:id", ticketController.getTicket);
router.patch("/:id", ticketController.updateTicket);

export default router;