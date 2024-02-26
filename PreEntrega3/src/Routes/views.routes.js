import { Router } from "express";
import { getChat, home } from "../Controllers/general.views.controller.js";
import { getProducts } from "../Controllers/generalProducts.controller.js";
import { passportCall, authorization } from "../dirname.js";

const router = Router();

router.get("/", home);

router.get("/chat", passportCall("jwt"), authorization("user"), getChat);

router.get("/products", getProducts)


export default router;
