import { ticketModel } from "../../DTOS/ticket.dto.js";
import mongoose from "mongoose";

class TicketDao {
  async generateTicket(newTicket) {
    try {
      console.log("llego al ticket dao");
      console.log(newTicket);
      return await ticketModel.create(newTicket);
    } catch (error) {
      console.log(error);
    }
  }
}
