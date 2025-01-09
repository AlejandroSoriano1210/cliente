document.addEventListener('mousedown', function (event) {
    let mensaje = '';
    switch (event.button) {
        case 0:
            mensaje = "Botón izquierdo";
            break;
        case 1:
            mensaje = "Rueda central";
            break;
        case 2:
            mensaje = "Botón derecho";
            break;
    }
    document.getElementById("mensaje").textContent = mensaje;
});
