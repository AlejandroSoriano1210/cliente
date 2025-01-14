var imagen = document.getElementById('imagen');

imagen.addEventListener("error", miFuncion);

function miFuncion() {
    document.getElementById("texto").innerHTML = "<h1>La imagen no se pudo cargar<h1>";
}