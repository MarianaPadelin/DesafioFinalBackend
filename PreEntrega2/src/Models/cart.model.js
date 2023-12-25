import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      //esto me debería devolver solo el id del producto y su cantidad
      product: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

cartSchema.pre("find", function(){
  console.log(this)
  this.populate("products")
})

const cartModel = model("cart", cartSchema);

export { cartModel };
