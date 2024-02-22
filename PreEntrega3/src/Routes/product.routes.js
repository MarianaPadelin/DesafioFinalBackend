import { Router } from "express";
import { getProducts, getOneProduct, postProduct, changeProduct, deleteProduct } from "../Controllers/products.controller.js";  
import { passportCall, authorization } from "../dirname.js";

const router = Router();

//importo el passportCall y auth para que me aparezca la info de usuario en el home de productos
router.get(
  "/",

  passportCall("jwt"),
  authorization("user"),
  getProducts
);

router.get("/:id", getOneProduct);

router.post("/", postProduct);

router.put("/:id", changeProduct);

router.delete("/:id", deleteProduct);

export default router;
