//el objeto ticket tiene que tener: ID, producto, CODE, purchase_datetime (fc "created_at" al momento de realizar la compra), "amount"(cantidad), precio, precio total, "purchaser": nombre de usuario + email del usuario. SIN INFO SENSIBLE

// export default class Ticket{
//     constructor(ticket){
//         this.product = //como traigo el producto del carrito 
//         this.code = 
//         this.purchase_datetime = 
//         this.amount = 
//         this.totalPrice = 
//         this.purchaser = //""
//     }
// }
import { Schema, model } from "mongoose";

const ticketSchema = new Schema({

  cart: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "cart" },
      quantity: { ype: Schema.Types.ObjectId, ref: "cart" },
    },
  ],
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "products", required: true },
      code: { type: Schema.Types.ObjectId, ref: "products" },
      purchase_datetime: { type: String, ref: "products" }, //ver donde va la funcion created_at
    },
  ],
  totalPrice: Number, //función reduce
  purchaser:
    {
      first_name: { type: String, ref: "users" },
      last_name: { type: String, ref: "users" },
      email: { type: String, ref: "users" },
    },
  
});

const ticketModel = model("ticket", ticketSchema)

export { ticketModel }