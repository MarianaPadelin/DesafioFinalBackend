import config from "../config/config.js";
import { userModel } from "./Models/user.model.js";
import { validatePass, generateJWToken } from "../dirname.js";


//todavía no estoy usando este service, hasta que entienda cómo pasar al res los errores

export const loginUser = async (email, password) => {
  const userExists = await userModel.findOne({ email: email });

  if (!userExists) {
    return error
    // return { error: "user not found", message: `User doesn't exist: ${email}` };
  } else if (!validatePass(userExists, password)) {
   return error
    // return { status: 401, error: "credenciales incorrectas" };
  }
  if (userExists.email === config.adminMail) {
      const tokenUser = {
        name: `${userExists.first_name} ${userExists.last_name}`,
        email: userExists.email,
        age: userExists.age,
        role: "admin",
      };
      //hacer una única función en service para no repetir esto con cada validación
      const access_token = generateJWToken(tokenUser);
      console.log("el token es:" + access_token);
      return access_token
    } else if (userExists.email !== config.adminMail) {
      const tokenUser = {
        name: `${userExists.first_name} ${userExists.last_name}`,
        email: userExists.email,
        age: userExists.age,
        role: "user",
      };
      const access_token = generateJWToken(tokenUser);
      console.log("el token es:" + access_token);
    return access_token
}
};
