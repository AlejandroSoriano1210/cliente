document.addEventListener("DOMContentLoaded", function () {
    const preguntas = document.querySelectorAll(".pregunta");

    preguntas.forEach((pregunta) => {
        pregunta.addEventListener("click", function () {
            const respuesta = this.nextElementSibling;
            const icono = this.querySelector(".icono");

            this.classList.toggle("activa");

            if (respuesta.style.maxHeight) {
                respuesta.style.maxHeight = null;
                icono.textContent = "+";
            } else {
                document.querySelectorAll(".respuesta").forEach((res) => (res.style.maxHeight = null));
                document.querySelectorAll(".icono").forEach((ico) => (ico.textContent = "+"));

                respuesta.style.maxHeight = respuesta.scrollHeight + "px";
                icono.textContent = "−";
            }
        });
    });
});
