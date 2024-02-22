import CartDao from "./DAOS/mongoDB/cart.dao.js";

export const validateCart = async (id) => {
  const cart = await CartDao.findCartById(id);
  if (!cart) {
    return error;
  } else {
    return cart;
  }
};

export const createCart = async (cart) => {
  const carrito = await CartDao.createCart(cart);
  if (carrito === false) {
    console.log("Couldn't create cart");
    return { status: 404, message: "Couldn't create cart" };
  } else {
    return { status: 200, message: "New cart created", payload: carrito };
  }
};

export const addProduct = async (id, pid) => {
  const prodAdded = await CartDao.addProductToCart(id, pid);
  return prodAdded;
};

export const putOneProduct = async (cid, pid, quantity) => {
  const cartUpdated = await CartDao.updateOneProduct(cid, pid, quantity);
  //faltaría mandar mensaje al front de product doesnt exist (me lo manda por consola desde la función del dao)
  return {
    status: 200,
    message: `Product ${pid} quantity updated in cart ${cid}`,
    payload: cartUpdated,
  };
};

export const eraseCart = async (cid) => {
  const carritoBorrado = await CartDao.deleteCart(cid);
  return {
    status: 200,
    message: `Cart ${cid} deleted`,
    payload: carritoBorrado,
  };
};

export const deleteOneProduct = async (cid, pid) => {
  await CartDao.deleteOneProduct(cid, pid);

  return { status: 200, message: `Product ${pid} deleted from cart ${cid}` };
};
