export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = () => {
    return this.dao.getAllProducts();
  };
  getById = (id) => {
    return this.dao.getProductById(id)
  };
  save = (product) => {
    return this.dao.addProduct(student);
  };
  update = (id, product) => {
    return this.dao.modifyProduct(id, product);
  };
  delete = (id, product) => {
    return this.dao.deleteProduct(id, product)
  };

}
