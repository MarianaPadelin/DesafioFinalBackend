export const registerUser = async(req, res) => {
     res.render("register", {
       fileCss: "register.css",
     });
}


export const getUsers = async(req, res) => {
      res.render("profile", {
        role: req.user.role,
        user: req.user.name,
        age: req.user.age,
        email: req.user.email,
        //acá me devuelve error cuando quiero poner cart: req.user.cart._id
        cart: req.user.cart
      });
      
      // console.log("props de usuario" + JSON.stringify(req.user.cart))

}


