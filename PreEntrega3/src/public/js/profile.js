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

//const data = new URLSearchParams();
// data.append('name', 'John');
// data.append('email', 'john@example.com');
// fetch('/api/users', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	},
// 	body: data

const botonAñadirItem = document.getElementById("agregarItem");

botonAñadirItem.addEventListener("click", (e) => {
  e.preventDefault();
  //cómo le paso el id y el pid??
  fetch(`/api/carts/${id}/product/${pid}`, {
    method: "POST",
    // params: "65da1366c9405ec885f25fc6",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        return alert("Se añadió el producto al carrito");
      }
      return alert("Error al agregar el producto");
    })
    .then(() => {
      window.location.replace(`/api/carts/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});