document.onmousedown = function(event) {
    let mensaje = "";
    switch(event.button) {
        case 0:
            mensaje = "Botón izquierdo presionado";
            break;
        case 1:
            mensaje = "Botón central (rueda) presionado";
            break;
        case 2:
            mensaje = "Botón derecho presionado";
            break;
    }
    document.getElementById("mensaje").textContent = mensaje;
};