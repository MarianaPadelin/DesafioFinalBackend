import { Router } from "express";
import { getChat, home } from "../Controllers/general.views.controller.js";
import { getProducts } from "../Controllers/generalProducts.controller.js";


const router = Router();

router.get("/", home);

router.get("/chat", getChat);

router.get("/products", getProducts)


export default router;
