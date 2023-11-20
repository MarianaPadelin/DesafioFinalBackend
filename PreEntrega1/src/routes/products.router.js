import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";

const productsRouter = Router();

const prueboProducto = new ProductManager();

productsRouter.get("/", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();
  const { limit } = req.query;

  if (limit && limit <= datosImportados.length) {
    datosImportados.length = limit;
    return res.send(datosImportados);
  } else {
    return res.send(datosImportados);
  }
});

productsRouter.get("/:id", async (req, res) => {
  let datosImportados = await prueboProducto.getProducts();
  const { id } = req.params;

  const productoEncontrado = datosImportados.find((user) => user.id === +id);

  if (productoEncontrado) {
    return res.send(productoEncontrado);
  } else {
    return res.json(
     {
        message: "no existe el producto con ese id"
     }
    );
  }
});

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  const producto = new Product(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );

  try {
    await prueboProducto.addProduct(producto);
    res.json({
      message: "Post created",
      producto,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

//   const datosImportados = await prueboProducto.getProducts();

//pusheo lo que agrego al array en memoria
//   datosImportados.push({
//     title,
//     description,
//     price,
//     thumbnail,
//     code,
//     stock
//   });

//me muestra lo que agregué recién

//   res.json({
//     datosImportados: {
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//     },
//   });
// });

productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, thumbnail, code, stock } = req.body;
  const producto = new Product(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  try {
    await prueboProducto.updateProduct(+id, title);
    res.json({
      message: "Post updated",
        producto
    });
  } catch (e) {
    res.json({
      error: e,
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
