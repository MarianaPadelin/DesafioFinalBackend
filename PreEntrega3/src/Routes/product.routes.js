import { Router } from "express";
import {
  getAdminProducts,
  getOneProduct,
  postProduct,
  changeProduct,
  deleteProduct,
  getProductForm,
} from "../Controllers/products.controller.js";

import { passportCall, authorization } from "../dirname.js";

//falta agregar passportcall y authorization a post, update y delete
//Falta logout de admin


const router = Router();

router.get(
  "/",

  passportCall("jwt"),
  authorization("admin"),
  getAdminProducts
);

router.get(
  "/addProduct",
  passportCall("jwt"),
  authorization("admin"),
  getProductForm
);

router.get("/:id", getOneProduct);

router.post("/", passportCall("jwt"), authorization("admin"), postProduct);

router.put("/:id", passportCall("jwt"), authorization("admin"), changeProduct);

router.delete(
  "/:id",
  passportCall("jwt"),
  authorization("admin"),
  deleteProduct
);

export default router;
