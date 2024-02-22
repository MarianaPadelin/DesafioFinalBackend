const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  //esto es lo que hice en postman
  fetch("/api/jwt/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        result.json()
                .then(json => {

                    console.log("Cookies generadas:");
                    console.log(document.cookie);
                     alert("Usuario conectado");
                     window.location.replace("/api/products");
                })
    
      }
      else {
        alert("Credenciales incorrectas")
      }
    
    })
    .catch((error) => {
      alert("credenciales incorrectas, inténtelo nuevamente");
      console.log(error);
    });
});

