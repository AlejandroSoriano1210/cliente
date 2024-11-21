var listaCompra = [];

function anadir() {
    listaCompra.push(document.getElementById("lista-compra"));
    return anadir;
}

function mostrar() {
    var lista3primeros = listaCompra.slice(0, 2);
    document.write(lista3primeros.toLocaleString);
    return mostrar;
}

function deleteUltimo() {
    var lista3ultimo = listaCompra.splice(listaCompra.length - 3, 3);
}

function delete1() {

}