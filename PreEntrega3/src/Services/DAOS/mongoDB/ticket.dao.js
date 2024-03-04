import { ticketModel } from "../../DTOS/ticket.dto.js";
import mongoose from "mongoose";

class TicketDao {
  async getAll() {
    return await ticketModel.find();
  }
//verificar el populate del cart
  async findOneTicket(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const ticket = await ticketModel.findById(_id).populate("cart._id");
        console.log(ticket)
        return ticket
      }
      return { error: "Id format not valid" };
    } catch (error) {
      console.log(error);
    }
  }
  async generateTicket(newTicket) {
    try {
      // console.log(newTicket);
      return await ticketModel.create(newTicket);
    } catch (error) {
      console.log(error);
    }
  }
}


export default new TicketDao();