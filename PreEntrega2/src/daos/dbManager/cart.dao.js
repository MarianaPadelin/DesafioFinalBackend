import { cartModel } from "../../Models/cart.model.js";
import { productModel } from "../../Models/product.model.js";
import mongoose from "mongoose";

class CartDao {
  async findCart() {
    return await cartModel.find();
  }

  async findCartById(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          return await cartModel.findById(_id);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(cart) {
    try {
      // if (productModel.isValid) {
      //   return await cartModel.create(cart);
      // }

      // console.log("Hay campos incompletos");
      // return false;
      return await cartModel.create(cart);
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(_id, cart) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          return await cartModel.findByIdAndUpdate({ _id }, cart);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(_id) {
    //revisar si funciona

    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          await productModel.deleteMany({ product: _id });

          return await cartModel.findByIdAndDelete({ _id });
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(_id, _pid) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        //busco el carrito
        const cartFound = await cartModel.findById({ _id });

        if (cartFound) {
          //dentro del carrito, busco si ya existe el producto
          const productoRepetido = await productModel.findById(
            "65980f4c3fbacd8e8720e03e"
          );

          console.log(productoRepetido);
          //(este id lo pongo como pid en parámetro de la función)

          if (!productoRepetido) {
            //si el producto no está, lo pusheo al array
            const prodAgregado = cartFound.products.push(
              "65980f4c3fbacd8e8720e03e"
            );

            console.log("El producto es nuevo");

            //buscamos el id DEL PRODUCTO y poblamos el campo products
            const prodPoblado = await cartModel.findById(
              "6581cb7a69ccfafa5939a286"
            );

            // console.log(prodPoblado);

            // const prodPopulate = prodPoblado.populate("products");

            // console.log(prodPopulate);

            //actualizo en la base de datos.
            const result = await cartModel.findByIdAndUpdate(
              { _id: cartFound._id },
              cartFound
            );
            console.log(result.products);
            return;
          } else {
            const prodEncontrado = cartFound.products.find(
              (product) => product._id == "65980f4c3fbacd8e8720e03e"
            );

            console.log(prodEncontrado)
            // const nuevaCantidad = cartFound.products[0].quantity + 1;
            // cartFound.products[0].quantity = nuevaCantidad;
              prodEncontrado.quantity = prodEncontrado.quantity++
            console.log("Producto repetido", prodEncontrado.quantity);

            //actualizo en la base de datos.
            const result = await cartModel.findByIdAndUpdate(
              { _id: cartFound._id },
              cartFound
            );
            // console.log(result.products);
          }

          //actualizo en la base de datos.
          const result = await cartModel.findByIdAndUpdate(
            { _id: cartFound._id },
            cartFound
          );
          // console.log(result.products);
        }
        return "Cart not found";
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOneProduct(_id, _pid) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        if (!cartFound) {
          console.log("Cart not found");
          return false;
        } else {
          // const idDeProducto = cartModel.findById({ _pid })
          // const productosBorrados = await productModel.findById(
          //   "6581ca591b93ee9b747e0ba9"
          // );
          const productosBorrados = await productModel.findByIdAndDelete(
            "6581cb7a69ccfafa5939a286"
          );
          console.log(productosBorrados);

          //lo guardo en la base de datos
          // const result = await cartModel.findByIdAndUpdate(
          //   { _id: cartFound._id },
          //   cartFound
          // );
          // console.log(result);
          // return;
        }
      }
      console.log("Formato de id no válido");
    } catch (error) {
      console.log(error);
    }
  }

  errorMessage(error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
}

export default new CartDao();
