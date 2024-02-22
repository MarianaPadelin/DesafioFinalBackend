import ProductDao from "./DAOS/mongoDB/product.dao.js";
import { productModel } from "./Models/product.model.js";

export const filterProducts = async (limit, page, category, stock) => {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (stock) {
    filter.stock = stock;
  }
  // ProductDao.getAllProducts().then(paginate())
  const products = await productModel.paginate(filter, {
    page: page || 1,
    limit: limit || 10,
    sort: { price: 1 },
  });

  return products;
};

export const findOneProduct = async (id) => {
  const product = await ProductDao.getProductById(id);
  return product;
};

export const addNewProduct = async (datosProducto) => {
  const product = await ProductDao.addProduct(datosProducto);

  if (product === false) {
    return {
      status: 400,
      message: "Couldn't add product to list. Fields incomplete.",
    };
  }
  return {
    status: 200,
    message: "New product added to commerce list",
    product,
  };
};

export const putProduct = async (id, datosProducto) => {
  const product = await ProductDao.modifyProduct(id, datosProducto);

  return { message: "Product updated", product };
};

export const eraseProduct = async (id) => {
  await ProductDao.deleteProduct(id);
};
