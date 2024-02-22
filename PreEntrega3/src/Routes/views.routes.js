import { Router } from "express";
import { getChat, home } from "../Controllers/general.views.controller.js";


const router = Router();

router.get("/", home);

router.get("/chat", getChat);


export default router;
