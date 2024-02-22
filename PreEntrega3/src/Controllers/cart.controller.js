import {
  addProduct,
  createCart,
  putOneProduct,
  validateCart,
  eraseCart,
  deleteOneProduct,
} from "../Services/cart.service.js";
import CartDao from "../Services/DAOS/mongoDB/cart.dao.js";

//aca importaria la factory de cart

export const getCarts = async (req, res) => {
  try {
    //const carts = await cartService();.
    const carts = await CartDao.findCart();

    res.json({
      message: "These are the carts:",
      data: carts,
    });
  } catch (error) {
    CartDao.errorMessage(error);
  }
};

export const getOneCart = async (req, res) => {
  try {
    console.log("llego a la fc getOneCart" + id)
    const { id } = req.params;
    const cart = await validateCart(id);
    res.json({
      message: `This is the cart with id ${id}:`,
      //en data devuelve la información de service
      data: cart,
    });
  } catch (error) {
    res.json({
      message: "Cart not found",
      error,
    });
    //    CartDao.errorMessage(error);
  }
};

export const postCart = async (req, res) => {
  //tengo que agarrar el id del usuario
  try {
    //del req.body saco la cantidad
    const cart = await createCart(req.body);
    res.json({
      data: cart,
    });
  } catch (error) {
    CartDao.errorMessage(error);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { pid } = req.params;

    const cart = await validateCart(id).then(addProduct(id, pid));

    res.json({
      message: `Product ${pid} added to cart ${id}`,
      cart,
    });
  } catch (error) {
    CartDao.errorMessage(error);
  }
};

export const changeProductQuantity = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await validateCart(cid).then(
      putOneProduct(cid, pid, quantity)
    );

    res.json({
      cart,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await validateCart(cid).then(eraseCart(cid));
    //no me manda el mensaje de service, lo manda del dao
    res.json({
      cart,
    });
  } catch (error) {
    CartDao.errorMessage(error);
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;

  try {
    const cart = await validateCart(cid).then(deleteOneProduct(cid, pid));

    res.json({
      data: cart,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
};
