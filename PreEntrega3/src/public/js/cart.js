const botonComprar = document.getElementById("comprar");

const cid = document.getElementById("cid").innerHTML;

botonComprar.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(`/api/carts/${cid}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          if (result.status === 200) {
            return alert("Se completó la compra");
            
          }
          alert("Hubo un problema, inténtelo nuevamente")
        })
        // .then((tid) => {
        //   window.location.replace(`/ticket/${tid}`);
        // })
        .catch((error) => {
          console.log(error);
        });
})