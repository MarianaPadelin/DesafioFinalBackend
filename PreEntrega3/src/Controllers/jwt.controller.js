import { validatePass, generateJWToken } from "../dirname.js";
import { userModel } from "../Services/Models/user.model.js";
import config from "../config/config.js";
// import { loginUser } from "../Services/jwt.service.js";

export const register = async(req, res) => {
      console.log("Registrando usuario:");
    res
      .status(201)
      .send({ status: "success", message: "Usuario creado con éxito." });
  
}

export const logUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email: email });
    // const userExists = await loginUser(email, password);
    if (!userExists) {
      console.warn(`User doesn't exist: ${email}`);
      return res.status(204).send({
        error: "User not found",
        message: "Usuario no encontrado: " + email,
      });
    }
    if (!validatePass(userExists, password)) {
      console.warn(`Invalid credentials for user: ${email}`);
      return res.status(401).send({
        status: "error",
        error: "Credenciales incorrectas",
      });
    }
    //esta validación la tendría que hacer en el register, no en el login
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

      //el primer parámetro es el nombre de la cookie, el segundo es la info que contiene, el tercero su configuración
      res.cookie("jwtCookieToken", userExists, {
        maxAge: 120000,
        httpOnly: true, //No se expone la cookie
      });
    } else if (userExists.email !== config.adminMail) {
      const tokenUser = {
        name: `${userExists.first_name} ${userExists.last_name}`,
        email: userExists.email,
        age: userExists.age,
        role: "user",
      };
      const access_token = generateJWToken(tokenUser);
      console.log("el token es:" + access_token);

      //el primer parámetro es el nombre de la cookie, el segundo es la info que contiene, el tercero su configuración
      res.cookie("jwtCookieToken", access_token, {
        maxAge: 120000,
        httpOnly: true, //No se expone la cookie
      });
    }

    res.send({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      error: "Error interno de la applicacion.",
    });
  }
};

export const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Error de logout", msg: "Error al cerrar la session" });
    }
    res.status(200).send("Se ha cerrado la sesión");
  });
};

export const githubcallback = async (req, res) => {
  const userExists = req.user;

  if (userExists.email === config.adminMail) {
    const tokenUser = {
      first_name: userExists.first_name,
      last_name: userExists.last_name,
      age: userExists.age,
      email: userExists.email,
      rol: "admin",
    };
    const access_token = generateJWToken(tokenUser);
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 120000,
      httpOnly: true,
    });
    return res.redirect("/api/products");
  }

  const tokenUser = {
    first_name: userExists.first_name,
    last_name: userExists.last_name,
    age: userExists.age,
    email: userExists.email,
    rol: "user",
  };
  const access_token = generateJWToken(tokenUser);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 120000,
    httpOnly: true,
  });
  return res.redirect("/api/products");
};


export const failRegister = (req, res) => {
    res.status(401).send({ error: "Falla al registrarse" });
}