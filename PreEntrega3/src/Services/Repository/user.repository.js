import userDao from "../DAOS/mongoDB/user.dao.js";

class UserRepository {
  logUser = (email, password) => {
    return userDao.logUser(email, password);
  };
 
}

export default new UserRepository();
