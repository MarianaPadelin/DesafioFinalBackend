import { Router } from "express";
import { passportCall, authorization, authToken } from "../dirname.js";
import { getUsers, registerUser } from "../Controllers/user.views.controller.js"
import { getProducts } from "../Controllers/products.controller.js";
const router = Router();

// Vista del formulario de registro
router.get("/register", registerUser);


// Vista del perfil del usuario 
router.get("/",
    passportCall('jwt'), 
    authorization('user'),
    getUsers
);

//Vista del listado de productos con la bienvenida al usuario y la opción de ver su carrito
router.get(
  "/products",
  passportCall("jwt"),
  authorization("user"),
  getProducts
);




// router.get("/:userId", authToken, async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await userModel.findById(userId);
//     if (!user) {
//       res.status(202).json({ message: "User not found with ID: " + userId });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error("Error consultando el usuario con ID: " + userId);
//   }
// });




export default router;