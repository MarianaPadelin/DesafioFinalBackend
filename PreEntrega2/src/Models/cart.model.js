import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      id: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

//esto no anda
// cartSchema.pre("find", function(){
//   console.log(this)
//   this.populate("products");
// })
//  this.populate([products], { path: "/api/carts" });

const cartModel = model("cart", cartSchema);

export { cartModel };
