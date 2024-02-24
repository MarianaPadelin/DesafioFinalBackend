
const botonLogout = document.getElementById("botonLogout");


botonLogout.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("/api/jwt/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        alert("Se ha cerrado la sesión");
      }
    })
    .then(() => {
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
});




const botonAñadirItem = document.getElementById("agregarItem");

botonAñadirItem.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("/api/carts/:id", {
    method: "GET",
    params: "65a1894e14d271f1c15ebdf4",
    //body: id del carrito y del producto,
      headers: {
        "Content-Type": "application/json",
      },
  })
    .then((result) => {
      if (result.status === 200) {
        return alert("Se añadió el producto al carrito");
      }
      return alert ("Error al agregar el producto")
    })
    .catch((error) => {
      console.log(error);
    });
});