//código que debe autogenerarse y ser único no es lo mismo que el id?

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
//sacar el array de cart y dejarlo como objeto (es un solo carrito)
  cart: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "cart" },
      quantity: { type: Schema.Types.ObjectId, ref: "cart" },
    },
  ],
  amount: Number,
  purchaser: String,
  purchase_datetime: String,
});

const ticketModel = model("ticket", ticketSchema)

export { ticketModel }