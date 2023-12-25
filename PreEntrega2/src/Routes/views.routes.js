import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";
import MessagesDao from "../daos/dbManager/messages.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductDao.getAllProducts();
  const carts = await CartDao.findCart();

  res.render("index", {
    products,
    carts,
    fileCss: "index.css",
  });
});

// router.get("/api/products", async(req, res)=>{
//     const products = await ProductDao.getAllProducts();

//     res.render("index", {
//       products
//     })
// })

// router.get("/api/carts", async(req, res)=> {
//     const carts = await CartDao.findCart();

//     res.render("cart", {
//       carts
//     })
// })

router.get("/chat", async (req,res) => {

  const message = req.body
  const user = req.body
  // console.log(user, message)
  const messages = await MessagesDao.addMessage(message)

  res.render("chat", {
    messages
  })
})

export default router;
