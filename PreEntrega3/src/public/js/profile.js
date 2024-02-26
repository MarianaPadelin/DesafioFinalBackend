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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  cid = req.user.cart;

  console.log(cid);
  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST",
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
    .catch((error) => {
      console.log(error);
    });
});

// const botonAñadirItem = document.getElementById("agregarItem");
// const pid = document.getElementById("productId").innerHTML;
// const cid = document.getElementById("cartId").innerHTML;

// botonAñadirItem.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(pid)

//   fetch(`/api/carts/${cid}/product/${pid}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((result) => {
//       if (result.status === 200) {
//         return alert("Se añadió el producto al carrito");
//       }
//       return alert("Error al agregar el producto");
//     })
//     // .then(() => {
//     //   window.location.replace(`/api/carts/${id}`);
//     // })
//     .catch((error) => {
//       console.log(error);
//     });
// });
