import { Router } from "express"
import { getTickets, getTicketById, generateTicket } from "../Controllers/ticket.controller.js"

const router = Router()


router.get("/", getTickets)
router.get("/:id", getTicketById)
router.post("/", generateTicket)

export default router; 