import passport from "passport";
import passportLocal from "passport-local";
import { createHash, validatePass, PRIVATE_KEY } from "../dirname.js";
import { userModel } from "../Services/Models/user.model.js";
import jwtStrategy from "passport-jwt";
import GitHubStrategy from "passport-github2"
import config from "./config.js";


//Declaramos la estrategia (qué tipo de passport voy a usar)

const localStrategy = passportLocal.Strategy;

//Declaramos estrategias de jwt

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

//inicializamos passport

const inicializePassport = () => {
  //Estrategia de obtener Token JWT por Cookie:
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        console.log("Entrando a passport Strategy con JWT.");
        try {
          console.log("JWT obtenido del Payload");
          console.log(jwt_payload);
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  //estrategia con github:

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackUrl: config.callbackURL,
      },
      //estos parámetros son propios de passport
      async (accesstoken, refreshtoken, profile, done) => {
        console.log("perfil de usuario obtenido:");
        console.log(profile);
        try {
          const userExists = await userModel.findOne({
            email: profile._json.email,
          });
          if (!userExists) {
            console.log(
              "este usuario no se registrado con github" + profile._json.email
            );
            //el usuario no existe, entonces lo registro

            let newUser = {
              first_name: profile._json.name,
              // last_name: profile._json.name,
              // age: profile._json.name,
              email: profile._json.email,
              password: "",
              loggedBy: "github",
            
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          } else {
            //el usuario ya existe en la db, entonces lo logueo
            return done(null, userExists);
          }
        } catch (error) {
          return done("Error de github strategy" + error);
        }
      }
    )
  );

  //para register:

  passport.use(
    "register",
    new localStrategy(
      //como es un callback, hago que cuando termine vuelva a la parte de register en la ruta de sesión.
      //Y cambio el parámetro usernameField a email.
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        //le paso lo que tenía en la ruta register
        const { first_name, last_name, age, email } = req.body;
        try {
          const userExists = await userModel.findOne({ email });
          if (userExists) {
            console.log("El usuario ya existe");
            //null es porque no hay un error, false es porque el usuario ya existe
            done(null, false);
          }

          const user = {
            first_name,
            last_name,
            age,
            email,
            //uso la función create hash para encriptar la contraseña que agarro del body
            password: createHash(password),
          };

          const result = await userModel.create(user);
          return done(null, result);
        } catch (error) {
          return done("Error de register" + error);
        }
      }
    )
  );


  //funciones de serialización propias de passport:

  passport.serializeUser((userExists, done) => {
    done(null, userExists._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.log("error al deserializar" + error);
    }
  });
};


const cookieExtractor = (req) => {
  let token = null;
  console.log("Entrando a Cookie Extractor");
  console.log(req.cookies)
  //no lee esto
  if (req && req.cookies) {
    //Validamos que exista el request y las cookies.
    console.log("Cookies presentes: ");
    console.log(req.cookies);
    token = req.cookies["jwtCookieToken"];
    console.log("Token obtenido desde Cookie:");
    console.log(token);
  }
  console.log("no se encontraron cookies")
  return token;
};

export default inicializePassport;