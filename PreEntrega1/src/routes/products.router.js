import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";
import { productValidation } from "../utils/productValidation.js";

//faltan los status

//falta array de imagenes en thumbnail


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
  const { title, description, price, thumbnail, code, category, stock } =
    req.body;
  //   const producto = new Product(
  //     title,
  //     description,
  //     price,
  //     thumbnail,
  //     code,
  //     category,
  //     stock
  //   );

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  try {
    //acá tengo el problema, se manda el res correctamente, pero el updateProduct no hace nada, no actualiza el archivo json.
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
