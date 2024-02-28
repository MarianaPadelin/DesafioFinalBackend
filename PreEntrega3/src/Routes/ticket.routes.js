import { Router } from "express"
import {
  getAllTickets,
  getTicketById,


} from "../Controllers/ticket.controller.js";

const router = Router()


router.get("/", getAllTickets);
router.get("/:id", getTicketById)
// router.get("/send/email", sendEmail)
// router.post("/", createTicket);

export default router; 