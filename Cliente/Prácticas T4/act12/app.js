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
    var lista3Ultimo = listaCompra.splice(listaCompra.length - 3, 3);
    document.write(lista3Ultimo.toLocaleString);
    return deleteUltimo;
}

function delete1() {
    var listaUltimo = listaCompra.pop;
    document.write(listaUltimo.toLocaleString);
    return delete1;
}