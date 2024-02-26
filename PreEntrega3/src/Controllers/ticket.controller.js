import TicketDao from "../Services/DAOS/mongoDB/ticket.dao.js";

import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../dirname.js";

export const getAllTickets = async (req, res) => {
  try {
    const ticketList = await TicketDao.getAll();
    res.json({
      message: "These are the tickets",
      data: ticketList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error al traer los tickets.",
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await TicketDao.findOneTicket(id);
    if (!ticket) {
      res.status(404).json({
        message: "Ticket id not found",
      });
    }
    res.json({
      message: `this is the ticket with id ${id}`,
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error al traer el ticket.",
    });
  }
};

// configuracion de transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.emailAcount,
    pass: config.appPassword,
  },
});


// Verificamos conexion con gmail
transporter.verify(function (error, success) {
  if (error) {
    console.log("error de verificación" + error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// const mailOptions = {
//   from: "Coder Backend PreEntrega - " + config.emailAcount,
//   to: "marianapadelin@gmail.com",
//   // to: user.email,
//   subject: "Correo de prueba",
//   html: `<div><h1> Ticket generado: ${data} </h1></div>`,
//   attachments: [],
// };

export const sendEmail = async (req, res, id) => {

  try {
    console.log(id)
    const data = TicketDao.findOneTicket(id);
    console.log(data)
    
    let result = transporter.sendMail({
      from: "Coder Backend PreEntrega - " + config.emailAcount,
      to: "marianapadelin@gmail.com",
      // to: user.email,
      subject: "Correo de prueba",
      html: `<div><h1> Ticket generado: ${data} </h1></div>`,
      attachments: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error al enviar por mail el ticket.",
    });
  }
};



// const mailOptionsWithAttachments = {
//     from: "Coder Test - " + config.gmailAccount,
//     to: `${config.gmailAccount};enzozanino2000@gmail.com; leo1987@yopmail.com`,
//     subject: "Correo de prueba CoderHouse Pkrogramacion BackEnmd clase30",
//     html: `<div>
//                 <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
//                 <p>Ahora usando imagenes: </p>
//                 <img src="cid:meme"/>
//             </div>`,
//     attachments: [
//         {
//             filename: 'Meme de programacion',
//             path: __dirname + '/public/images/meme.png',
//             cid: 'meme'
//         }
//     ]
// }


// export const sendEmailWithAttachments = (req, res) => {
//     try {
//         let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 res.status(400).send({ message: "Error", payload: error });
//             }
//             console.log('Message sent: %s', info.messageId);
//             res.send({ message: "Success", payload: info })
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
//     }
// }
