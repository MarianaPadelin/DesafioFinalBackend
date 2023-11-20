import fs from "fs";

class ProductManager {
  constructor() {
    //esto tiene que ser productos.json
    this.path = "./src/datos.json";
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

      let datosCompletos = Object.values(product);

      if (existeCodigo === true) {
        console.log("El código ya existe");
        throw Error(`This code already exists`);
        // throw Error(`Product with code ${product.code} already exists`);
        
      }
      if (
        //hay que poner cada dato incompleto por separado
        (datosCompletos.length !==8 && datosCompletos.includes(undefined)) ||
        datosCompletos.includes("")
      ) {
        console.log("Hay campos incompletos");
        throw Error("All fields must be complete");

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
      throw Error(`Hay un error: ${error}`);
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
      console.log("Not found");
    } else {
      console.log("El producto encontrado es", producto);
    }
  }

  async updateProduct(idProducto, key, newValue) {
    let productoAmodificar = this.products.find(
      (producto) => producto.id === idProducto
    );
    if (!productoAmodificar) {
      console.log("Error. El producto no existe.");
      return;
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
  constructor(title, description, price, thumbnail, code, status, category, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.status = status),
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
//     "44"
//   )
// );

// prueboProducto.addProduct(
//   new Product(
//     "Producto prueba2",
//     "a este le falta el stock",
//     243,
//     "SinImagen",
//     "woeiefjwijw"
//   )
// );

// prueboProducto.addProduct(
//   new Product(
//     "Producto prueba3",
//     "Acá repito el código",
//     232230,
//     "SinImagen",
//     "abc143",
//     "4999"
//   )
// );

// prueboProducto.addProduct(
//   new Product(
//     "Producto prueba4",
//     "Acá tiene todo bien",
//     12345,
//     "SinImagen",
//     "otrocodigo",
//     "4999"
//   )
// );

// prueboProducto.addProduct(
//   new Product(
//     "",
//     "A este le falta el titulo",
//     12345,
//     "SinImagen",
//     "32rhiof2oi",
//     "4999"
//   )
// // );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 2",
//     "descripción",
//     12345,
//     "SinImagen",
//     "aaaa111",
//     "344"
//   )
// );prueboProducto.addProduct(
//   new Product(
//     "producto numero 3",
//     "descripción",
//     12345,
//     "SinImagen",
//     "fthoigbeo",
//     "400"
//   )
// );prueboProducto.addProduct(
//   new Product(
//     "producto numero 4",
//     "descripción",
//     12345,
//     "SinImagen",
//     "egevrw",
//     "60"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 5",
//     "descripción",
//     12345,
//     "SinImagen",
//     "fgertrty",
//     "500"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 6",
//     "descripción",
//     12345,
//     "SinImagen",
//     "pouykjnr",
//     "9004"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 7",
//     "descripción",
//     12345,
//     "SinImagen",
//     "ertgerge",
//     "1020"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 8",
//     "descripción",
//     12345,
//     "SinImagen",
//     "23423",
//     "400"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 9",
//     "descripción",
//     12345,
//     "SinImagen",
//     "hgrnbgdv",
//     "344"
//   )
// );
// prueboProducto.addProduct(
//   new Product(
//     "producto numero 10",
//     "descripción",
//     12345,
//     "SinImagen",
//     "gfgvfre",
//     "5"
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
