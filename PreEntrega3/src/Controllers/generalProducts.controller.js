import { filterProducts } from "../Services/product.service.js";

export const getProducts = async(req,res) => {
    const { limit, page, category, stock } = req.query;
    try {
      const products = await filterProducts(limit, page, category, stock);

      res.status(200).render("productsLibre", {
        products,
        fileCss: "index.css",
      });
    } catch (error) {
      ProductDao.errorMessage(error);
    }
}