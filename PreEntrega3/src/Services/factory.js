//acá tendría que establecer la conexión con la db, en vez de en server.js
import MongoSingleton from "../config/mongodb.singleton.js";

import config from "../config/config.js";

let productService;
let cartService;
let ticketService;

async function initializeMongoService() {
  console.log("Iniciando Servicio para MongoDB");
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

     const { default: CartServiceMongo } = await import(
       "./DAOS/mongoDB/cart.dao.js"
     );
    cartService = new cartDao();
    console.log(cartService)

    const { default: TicketServiceMongo } = await import(
      "./DAOS/mongoDB/ticket.dao.js"
    );
    ticketService = new ticketDao();
    console.log(ticketService);

  
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

}

export { productService, cartService, ticketService };
