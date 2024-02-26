// falta formulario de editarItem

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

const botonEliminar = document.getElementById("borrarItem");
const pid = document.getElementById("productId").innerHTML;

botonEliminar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`/api/products/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        return alert("Se ha eliminado el producto");
      } else {
        return alert("Producto no encontrado");
      }
    })
    .then(() => {
      window.location.replace("/api/products");
    })
    .catch((error) => {
      console.log(error);
    });
});
