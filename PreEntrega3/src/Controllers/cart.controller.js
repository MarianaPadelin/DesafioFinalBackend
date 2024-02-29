//en vez de esto tengo que importar el repository

import { sendEmail } from "../dirname.js";
// import {
//   addProduct,
//   createCart,
//   putOneProduct,
//   validateCart,
//   eraseCart,
//   deleteOneProduct,
//   getTotal,
// } from "../Services/cart.service.js";
import CartRepository from "../Services/Repository/cart.repository.js";
import CartDao from "../Services/DAOS/mongoDB/cart.dao.js";
import TicketRepository from "../Services/Repository/ticket.repository.js"


//aca importaria la factory de cart

export const getCarts = async (req, res) => {
  try {
    const carts = await CartRepository.getAll();

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
    const { id } = req.params;

    const cart = await CartRepository.getById(id);

    let totalPrice = await CartRepository.getTotal(cart)

    let products = cart.products

    res.render("cartView", {
      cart: id,
      message: `This is the cart with id ${id}:`,
      products,
      amount: totalPrice,

    });
  } catch (error) {
    console.log(error)
    res.send({
      message: "Cart not found",
      error: error,
    });
    //    CartDao.errorMessage(error);
  }
};

export const postCart = async (req, res) => {
  try {
    const cart = await CartRepository.save();
    res.send({
      data: cart,
    });
    // return cart;
  } catch (error) {
    console.log(error)
    res.send({
      message: "Couldn't create cart",
      error: error,
    })
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { pid } = req.params;
    console.log(id + pid);

    const cart = await CartRepository.getById(id).then(CartRepository.addProduct(id, pid));

    res.status(200).json({
      message: `Product ${pid} added to cart ${id}`,
      cart,
    });
  } catch (error) {
       console.log(error);
       res.send({
         message: "Couldn't create cart",
         error: error,
       });
  }
};

export const changeProductQuantity = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartRepository.getById(cid).then(
      CartRepository.updateProduct(cid, pid, quantity)
    );

    res.json({
      cart,
    });
  } catch (e) {
      console.log(error);
      res.send({
        message: "Couldn't update cart",
        error: error,
      });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartRepository.getById(cid).then(CartRepository.delete(cid));

    res.json({
      cart,
    });
  } catch (error) {
      console.log(error);
      res.send({
        message: `Couldn't delete cart ${cid}`,
        error: error,
      });
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;

  try {
    const cart = await CartRepository.getById(cid).then(CartRepository.deleteProduct(cid, pid));

    res.json({
      data: cart,
    });
  } catch (e) {
    console.log(error);
    res.send({
      message: `Couldn't delete product ${pid} from cart ${cid}`,
      error: error,
    });
  }
};


export const finalizarCompra = async (req, res) => {
  const { cid } = req.params

    try{ 
      const cart = await CartRepository.getById(cid)

      const amount = await CartRepository.getTotal(cart)

      const purchase_datetime = new Date();
      const ticket = {
        amount,
        cart,
        purchaser: req.user.email,
        purchase_datetime,
      };
      
      const result = await TicketRepository.save(ticket);
      // console.log(result)
      sendEmail(result.id, req.user.email)

      
      //para aplicar el populate del carrito uso la función getById
    //  const ticketGenerado = await TicketRepository.getById(result._id)
      // console.log("Ticket generado: " + ticketGenerado);

      // await eraseCart(cid)
      res.status(200).send({ result })
      // res.status(200).json({ ticketGenerado })
    } catch (error) {
    console.log(error);
    return res.status(500).send({
      messsage: "Error creating ticket",
      error: error,
    });
  }
}
