var lista = [];

var articuloInput = document.getElementById("articuloInput");
var listaCompra = document.getElementById("listaCompra");

function actualizarLista(array) {
  listaCompra.innerHTML = array.join(", ");
}

function anadir() {
  var valor = articuloInput.value;
  lista.push(valor);
  actualizarLista(lista);
}

function eliminaPrimero() {
  if (lista.length > 0) {
    lista.shift();
    actualizarLista(lista);
  }
}

function eliminaUltimo() {
  if (lista.length > 0) {
    lista.pop();
    actualizarLista(lista);
  }
}

function mostrarPrimeros() {
  var primerosTres = lista.slice(0, 3);
  listaCompra.innerHTML = primerosTres.join(", ");
}
