import ProductDao from "../Services/DAOS/mongoDB/product.dao.js";

import {
  addNewProduct,
  eraseProduct,
  filterProducts,
  findOneProduct,
  putProduct,
} from "../Services/product.service.js";

//sengo que pasar la lógica a service
export const getProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;
  try {
    const products = await filterProducts(limit, page, category, stock);

    res.status(200).render("products", {
      user: req.user.name,
      role: req.user.role,
      cart: req.user.cart,
      products,
      fileCss: "index.css",
    });
  } catch (error) {
    ProductDao.errorMessage(error);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await findOneProduct(id);
    //hacer render con vista del producto individual
    res.status(200).json({
      product,
    });
  } catch (error) {
    ProductDao.errorMessage(error);
  }
};

export const postProduct = async (req, res) => {
  const datosProducto = req.body;
  try {
    const product = await addNewProduct(datosProducto);

    res.json({
      product,
    });
  } catch (error) {
    ProductDao.errorMessage(error);
  }
};

export const changeProduct = async (req, res) => {
  const { id } = req.params;
  const datosProducto = req.body;
  try {
    //este no anda
    const product = await findOneProduct(id).then(
      putProduct(id, datosProducto)
    );

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log("hay un error de put");
    ProductDao.errorMessage(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findOneProduct(id).then(eraseProduct(id));

    res.status(200).json({
      message: "Product deleted",
      product,
    });
  } catch (error) {
    console.log(error);
    ProductDao.errorMessage(error);
  }
};
