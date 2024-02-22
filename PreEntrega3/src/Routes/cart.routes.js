import { Router } from "express";
import { addProductToCart, changeProductQuantity, deleteCart, deleteProductFromCart, getCarts, getOneCart, postCart } from "../Controllers/cart.controller.js";

const router = Router();

router.get("/", getCarts);

router.get("/:id", getOneCart);

router.post("/", postCart);

router.post("/:id/product/:pid", addProductToCart);

// router.put("/:id", changeCart);

router.put("/:cid/product/:pid", changeProductQuantity);

router.delete("/:cid", deleteCart);

router.delete("/:cid/product/:pid", deleteProductFromCart);

export default router;
