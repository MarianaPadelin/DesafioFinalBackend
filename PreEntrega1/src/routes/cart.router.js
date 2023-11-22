import { Router } from "express";
import { CartManager, Item } from "../cartManager.js";

const cartRouter = Router();

const myCart = new CartManager("./src/carrito.json");

cartRouter.get("/", async (req, res) => {
  const carrito = await myCart.getCart();

  try {
    res.json({
      carrito,
    });
  } catch (e) {
    res.json({
      message: "Carrito vacío",
    });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const carrito = await myCart.getCart();
  const { cid } = req.params;

  const carritoEncontrado = carrito.find(
    (cartBuscado) => cartBuscado.id === +cid
  );

  if (!carritoEncontrado) {
    return res.json({
      message: `no existe el carrito con id ${cid}`,
    });
  }
  res.json({
    carritoEncontrado,
  });
});

cartRouter.post("/", async (req, res) => {
  const { products } = req.body;

  const item = new Item(products);

  try {
    await myCart.addItem(item);
    res.json({
      message: "Items added to cart",
      item,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;

  try {
    await myCart.addProduct(+cid, +pid);

    res.json({
      message: `Product ${pid} added to cart ${cid}`,
    });
  } catch (e) {
    res.json({
        error: e
    })
  }
});

export default cartRouter;
