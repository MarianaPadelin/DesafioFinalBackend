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
}

class Item {
    //como hago para crear un array aca?
  constructor(products) {
     (this.products = products);
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
