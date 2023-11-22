import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";
import { productValidation } from "../utils/productValidation.js";


const productsRouter = Router();

const prueboProducto = new ProductManager("./src/productos.json");

productsRouter.get("/", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();
  const { limit } = req.query;

  if (!datosImportados) {
    return [];
  }

  if (limit && limit <= datosImportados.length) {
    datosImportados.length = limit;
    return res.send(datosImportados);
  } else {
    return res.send(datosImportados);
  }
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  let datosImportados = await prueboProducto.getProductById(+id);

  if (!datosImportados) {
    return res.json({
      message: `No existe el producto con id ${id}`,
    });
  }
  return res.json({
    datosImportados,
  });
});

productsRouter.post("/", productValidation, async (req, res) => {
  const { title, description, price, code, category, stock, thumbnail } =
    req.body;

  const producto = new Product(
    title,
    description,
    price,
    code,
    category,
    stock,
    thumbnail
  );

  try {
    await prueboProducto.addProduct(producto);
    res.json({
      message: "Post created",
      producto,
    });
  } catch (e) {
    console.log(producto)
    res.json({
      error: e.message,
    });
  }
});


productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, thumbnail, code, category, stock } =
    req.body;

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  try {

    await prueboProducto.updateProduct(+id, "title", title);
    await prueboProducto.updateProduct(+id, "description", description);
    await prueboProducto.updateProduct(+id, "price", price);
    await prueboProducto.updateProduct(+id, "thumbnail", thumbnail);
    await prueboProducto.updateProduct(+id, "code", code);
    await prueboProducto.updateProduct(+id, "category", category);
    await prueboProducto.updateProduct(+id, "stock", stock);
    let productoModificado = await prueboProducto.getProductById(+id);

    res.json({
      message: "Post updated",
      productoModificado,
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  try {
    await prueboProducto.deleteProduct(+id);
    res.json({
      message: "Post deleted",
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
});

export default productsRouter;
