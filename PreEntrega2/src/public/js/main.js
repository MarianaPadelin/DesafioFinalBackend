

//--------------------------------Form---------------------

// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);

//   const product = {
//     title: formData.get("title"),
//     description: formData.get("description"),
//     price: Number(formData.get("price")),
//     code: formData.get("code"),
//     status: formData.get("status"),
//     category: formData.get("category"),
//     stock: Number(formData.get("stock")),
//     thumbnail: formData.get("thumbnail"),
//   };

//   socket.emit("formProducto", product);

//   socket.on("validacion", (data) => {
//     if (data === "ok") {
//       Swal.fire({
//         title: "Formulario enviado",
//         icon: "success",
//       });
//     } else {
//       Swal.fire({
//         title: "Error, todos los campos deben estar completos",
//         icon: "error",
//       });
//     }
//   });
//   form.reset();
// });

// socket.on("listaDeProductos", (data) => {
//   const listaDeProductos = document.querySelector("#products");

//   listaDeProductos.innerHTML = data
//     .map((post) => {
//       return `

//     <tr ${(key = post.id)}>    <td>${post.id}</td>
//             <td> ${post.title}</td>
//             <td>${post.description}</td>
//             <td>${post.price}</td>
//             <td>${post.code}</td>
//             <td>${post.status}</td>
//             <td>${post.category}</td>
//             <td>${post.stock}</td>
//             <td>${post.thumbnail}</td>
//             <td><button>X</button></td></tr>      
//        `;
//     })
//     .join(" ");
// });
