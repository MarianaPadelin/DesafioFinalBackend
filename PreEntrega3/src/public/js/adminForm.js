const form = document.getElementById("productForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("llego al boton formulario");
  //formData es un objeto de js que recopila los campos ingresados en el form
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 201) {
        alert("Producto ingresado correctamente");
        return window.location.replace("/api/products");
      }
      alert("El ingreso falló. Complete los campos requeridos.");
    })
    .catch((error) => {
      alert("Hubo un error al ingresar los datos.");
      console.log(error);
    });
});
