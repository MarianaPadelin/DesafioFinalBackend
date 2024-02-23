export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = () => {
    return this.dao.findCart();
  };
  getById = (id) => {
    return this.dao.findCartById(id)
  };
  save = (cart) => {
    return this.dao.createCart(cart)
  };
  addProduct = (id, pid) => {
    return this.dao.addProductToCart(id, pid)
  };
  update = (id, cart) => {
    return this.dao.updateCart(id, cart)
  };
  updateProduct = (id, pid, quantity) => {
    return this.dao.updateOneProduct(id, pid, quantity)
  };
  delete = (id, cart) => {
    return this.dao.deleteCart(id, cart)
  };
  deleteProduct = (id, pid) =>{
    return this.dao.deleteOneProduce(id, pid)
  }
}
