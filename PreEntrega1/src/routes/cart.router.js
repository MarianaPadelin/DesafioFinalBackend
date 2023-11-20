import { Router } from "express";
import { CartManager, Item } from "../cartManager.js";

const cartRouter = Router();


const myCart = new CartManager();

// const cart = [];

cartRouter.get("/", async(req, res) => {
    const carrito = await myCart.getCart()
  res.json({
    carrito,
  });
});


cartRouter.get("/:cid", async(req,res) => {
    const carrito = await myCart.getCart()
    const { cid } = req.params
    
    const carritoEncontrado = carrito.find((cartBuscado) => cartBuscado.id === +cid)

    if(!carritoEncontrado){
        return res.json({
            //poner id con ${}
            message: `no existe el carrito con ese id`
        })
    } 
    res.json({
        carritoEncontrado
    })
})

cartRouter.post("/", async (req, res) => {
  const { products } = req.body;

  //pusheo lo que agrego al array en memoria
//   cart.push({
//     products
//   });

const item = new Item(
    products
)

  //me muestra lo que agregué recién
try{
    await myCart.addItem(item)
     res.json({
    message:"Items added to cart",
    item
  });
} catch(e){
    res.json({
        error: e.message
    })

}
 
});


// cartRouter.post("/:cid/product/:pid", async(req, res) => {

// })

export default cartRouter
