//acá tendría que establecer la conexión con la db, en vez de en server.js

import config from "../config/config.js";

let productService;
let cartService;
let userService;

//para inicializar la db de mongo (acá usa singleton)
async function initializeMongoService() {
  console.log("Iniciando Servicio para Mongo!!");
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error("Error al iniciar MongoDB:", error);
    process.exit(1); // Salir con código de error
  }
}

switch (config.persistence) {
  case mongoDB:
    initializeMongoService();
    const { default: ProductServiceMongo } = await import(
      "./DAOS/mongoDB/product.dao.js"
    );
    productService = new productDao();
    console.log("Servicio de productos cargado:");
    console.log(productService);

    //usuarios no tiene dao

    break;

  case FileSystem:
    //todavia no existen estos archivos de fs
    const { default: ProductServiceFileSystem } = await import(
      "./DAOS/fileSystem/products.js"
    );
    //instancio la clase que tengo en el dao filesystem (clase 28)
    productService = new StudentServiceFileSystem();

    //hacer lo mismo con cart y users
    break;
  default:
    console.error(
      "Persistencia no válida en la configuración:",
      config.persistence
    );
    process.exit(1); // Salir con código de error
    break;
}

export { productService, cartService, userService };
