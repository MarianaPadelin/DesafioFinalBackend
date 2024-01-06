import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./dirname.js";
import viewRouter from "./Routes/views.routes.js";
import productRouter from "./Routes/product.routes.js"
import cartRouter from "./Routes/cart.routes.js"
import { Server } from "socket.io";
import messagesDao from "./daos/dbManager/messages.dao.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
//esto es para recorrer el array en las views (cuando es un array de objetos) 


//no anda: addProductToCart (aumentar la quantity), deleteOneProduct, populate, pagination. 
//salta error en la vista del home por error con query


const app = express();
const PORT = 8080;


//Websockets
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer);

//este array lo tengo que guardar en mongo?
const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    // console.log(data.message);
    messages.push(data);

    messagesDao.addMessage(data)
    io.emit("messages", messages);
  });

  socket.on("inicio", (data) => {
    io.emit("messages", messages);
    socket.broadcast.emit("connected", data);

  });

  socket.emit("messages", messages);
});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017/SegundaPreEntrega")
  .then(() => { 
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Hubo un error de conexión" + err);
  });

//Motor de handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

//views
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", viewRouter);

