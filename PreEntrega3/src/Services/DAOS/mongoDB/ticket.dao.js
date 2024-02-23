import { ticketModel } from "../../DTOS/ticket.dto.js";
import mongoose from "mongoose";

class TicketDao {
  async getAll() {
    return await ticketModel.find();
  }

  async findOneTicket(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        return await ticketModel.findById(_id).populate("cart._id");
      }
      return { error: "Id format not valid" };
    } catch (error) {
      console.log(error);
    }
  }
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


export default new TicketDao();