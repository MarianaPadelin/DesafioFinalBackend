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
    const carritoSolicitado = this.cart.find((elemento) => elemento.id === idCart);

    if (!carritoSolicitado) {
      console.log(`No existe el carrito con id ${idCart}`);
    }

    console.log(carritoSolicitado);
    return carritoSolicitado;
  }

  async addProduct(cid, pid) {
    const carrito = await this.getCartById(cid);

    try{
        let productoRepetido = carrito.products.find((elemento) => elemento.pid === pid)
        if(!productoRepetido){
            let quantity = 1
             carrito.products.push({ pid, quantity });
             await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.cart, null, "\t")
      );
        }
        // product.id = this.products[this.products.length - 1].id + 1;
        carrito.products.quantity = this.carrito.products.quantity +1
        console.log(carrito.products)
        // let newQuantity = carrito.products.quantity + 1
        // carrito.products.push({ newQuantity });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.cart, null, "\t")
        );
    }catch(e){
        return e
    }
        
    



    // try {
    //   if (this.products.length === 0) {
    //     prod.id = 1;
    //   } else {
    //     prod.id = this.cart[this.products.length - 1].id + 1;
    //   }
    //   this.products.push(prod);
    //   await fs.promises.writeFile(
    //     this.path,
    //     JSON.stringify(this.cart, null, "\t")
    //   );
    // } catch (e) {
    //   console.log(`Hay un error ${e}`);
    // }
  }                             
}



class Item {
    //como hago para crear un array aca?
  constructor() {
     (this.products = []);
  }
}


export { CartManager, Item };
//--------
// const myCart = new CartManager();

// myCart.addItem(
//     new Item(
//         "item3"
//     )
// )

// console.log(myCart.getCart());
