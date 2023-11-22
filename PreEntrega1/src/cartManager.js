import fs from "fs";

class CartManager {
  constructor() {
    this.path = "./src/carrito.json";
    try {
      let cart = fs.readFileSync(this.path, "utf-8");
      this.cart = JSON.parse(cart);
    } catch {
      this.cart = [];
    }
  }

  async addItem(item) {
    try {
      if (this.cart.length === 0) {
        item.id = 1;
      } else {
        item.id = this.cart[this.cart.length - 1].id + 1;
      }
      this.cart.push(item);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.cart, null, "\t")
      );
    } catch (e) {
      console.log(`Hay un error ${e}`);
    }
  }

  async getCart() {
    let cart = fs.readFileSync(this.path, "utf-8");
    this.cart = JSON.parse(cart);
    return this.cart;
  }

  getCartById(idCart) {
    const carritoSolicitado = this.cart.find(
      (elemento) => elemento.id === idCart
    );

    if (!carritoSolicitado) {
      console.log(`No existe el carrito con id ${idCart}`);
    }

    return carritoSolicitado;
  }

  async addProduct(cid, pid) {
    const carrito = await this.getCartById(cid);

    try {
      let productoRepetido = carrito.products.find(
        (elemento) => elemento.pid === pid
      );
      if (!productoRepetido) {
        let quantity = 1;
        carrito.products.push({ pid, quantity });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.cart, null, "\t")
        );
      }

      let nuevaCantidad = productoRepetido.quantity + 1;

      productoRepetido.quantity = nuevaCantidad;
      console.log(productoRepetido.quantity);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.cart, null, "\t")
      );
    } catch (e) {
      return e;
    }
  }
}

class Item {
  constructor() {
    this.products = [];
  }
}

export { CartManager, Item };
