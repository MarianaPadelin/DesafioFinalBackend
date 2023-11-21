import fs from "fs";

class ProductManager {
  constructor() {
    //esto tiene que ser productos.json
    this.path = "./src/productos.json";
    try {
      let products = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
    } catch {
      this.products = [];
    }
  }

  async addProduct(product) {
    try {
      let existeCodigo = false;
      this.products.forEach((prod) => {
        prod.code.includes(product.code)
          ? (existeCodigo = true)
          : (existeCodigo = false);
      });


      if (existeCodigo === true) {
        console.log("El código ya existe");
        throw Error(`Product with code ${product.code} already exists`);
        
      }


      //si todo salió bien
      console.log("Éxito");

      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hay un error: ${error}`);
      throw (`Hay un error: ${error}`);
    }
  }

  getProducts() {
    let products = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(products);
    return this.products;
  }

  getProductById(idProducto) {
    const producto = this.products.find(
      (producto) => producto.id === idProducto
    );

    if (!producto) {
      console.log(`no existe el id ${idProducto}`)
    } else {
      return ("El producto encontrado es", producto);
    }
  }

  async updateProduct(idProducto, key, newValue) {
    let productoAmodificar = this.products.find(
      (producto) => producto.id === idProducto
    );
    if (!productoAmodificar) {
      console.log("Error. El producto no existe.");
      throw Error("el producto no existe")

    }

    productoAmodificar[key] = newValue;

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
    console.log("Producto actualizado");
  }

  async deleteProduct(idProducto) {
    const productoEncontrado = this.products.find(
      (prod) => prod.id === idProducto
    );

    if (!productoEncontrado) {
      return console.log("No se puede borrar. El producto no existe");
    }

    try {
      this.products.splice(idProducto - 1, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      console.log("Producto borrado");
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, category, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.status = true),
      (this.category = category),
      (this.stock = stock);
  }
}

export { ProductManager, Product };

//-------- Pruebas --------

// 1) Instancio la clase
// const prueboProducto = new ProductManager();

// 2) Agrego productos y pruebo las validaciones. Si hay campos vacios o si se repite el código, no se agregan
// prueboProducto.addProduct(
//   new Product(
//     "Producto prueba1",
//     "Este es un producto prueba",
//     2030,
//     "SinImagen",
//     "abc143",
//     true,
//     "cat1",
//     "44"
//   )
// );


// 3) Busco productos por id
// prueboProducto.getProductById(2);

// // 4) Borro productos por id
// prueboProducto.deleteProduct(2);

// // 5) Actualizo productos por parámetros (id, llave, valor a modificar)
// prueboProducto.updateProduct(2, "title", "producto2");

// 6) Por último obtengo el array de productos final
// console.log(prueboProducto.getProducts())
