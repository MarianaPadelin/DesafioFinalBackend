import ProductsRepository from "../Services/Repository/products.repository.js";


//PARA PÚBLICO EN GENERAL (sin mostrar datos de cuenta)
export const getProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;
  try {
    const products = await ProductsRepository.filter(limit, page, category, stock);

    res.status(200).render("productsLibre", {
      products,
      fileCss: "index.css",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      messsage: "Error getting products",
      error: error,
    });  }
};

//PARA ADMIN (sin carrito):
export const getAdminProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;
  try {
    const products = await ProductsRepository.filter(
      limit,
      page,
      category,
      stock
    );

    res.status(200).render("productsAdmin", {
      user: req.user.name,
      role: req.user.role,
      products,
      fileCss: "index.css",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      messsage: "Error getting products",
      error: error,
    });
  }
};

//PARA USERS: 
export const getUserProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;
  try {
    const products = await ProductsRepository.filter(limit, page, category, stock);

    res.status(200).render("products", {
      user: req.user.name,
      role: req.user.role,
      cart: req.user.cart,
      products,
      fileCss: "index.css",
    });
  } catch (error) {
       console.log(error);
       return res.status(500).send({
         messsage: "Error getting products",
         error: error,
       });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductsRepository.getById(id);
    //hacer render con vista del producto individual
    res.status(201).json({
      product,
    });
  } catch (error) {
       console.log(error);
       return res.status(500).send({
         messsage: `Error getting product ${id}`,
         error: error,
       });
  }
};

export const postProduct = async (req, res) => {
  const datosProducto = req.body;
  try {

    const product = await ProductsRepository.save(datosProducto);

    res.status(201).json({
      product,
    });
  } catch (error) {
       console.log(error);
       return res.status(500).send({
         messsage: "Error posting product",
         error: error,
       });
  }
};

export const changeProduct = async (req, res) => {
  const { id } = req.params;
  const datosProducto = req.body;
  
  try {
    console.log(id, datosProducto)
    const product = await ProductsRepository.getById(id).then(
      ProductsRepository.update(id, datosProducto)
    );

    res.status(201).json({
      product,
    });
  } catch (error) {
           console.log(error);
           return res.status(500).send({
             messsage: `Error updating product ${id}`,
             error: error,
           });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductsRepository.getById(id).then(ProductsRepository.delete(id));
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).send({
      message: "Product deleted",
      product,
    });
  } catch (error) {
           console.log(error);
           return res.status(500).send({
             messsage: "Error deleting products",
             error: error,
           });
  }
};
