import TicketDao from "../Services/DAOS/mongoDB/ticket.dao"

export const getAllTickets = async (req, res) => {
    try{
        const ticketList = await TicketDao.getAll()
        res.json({
            message: "These are the tickets",
            data: ticketList
        });
    }catch (error){
        console.log(error)
         return res.status(500).send({
           status: "error",
           error: "Error al traer los tickets.",
         });
    }
}

export const getOneTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await TicketDao.findOneTicket(id);
    if (!ticket){
        res.status(404).json({
            message: "Ticket id not found"
        })
    }
    res.json({
        message: `this is the ticket with id ${id}`,
        data: ticket
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error al traer el ticket.",
    });
  }
};

export const createTicket = async (req, res) => {
  try {
    //agarro la data de req.body? de la compra?
    const newTicket = await TicketDao.generateTicket();
    res.json({
        message: "New ticket created",
        data: newTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error al crear el ticket.",
    });
  }
};