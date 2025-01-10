var imagen = document.getElementById('chill');

document.addEventListener('mousedown', function() {
    let mensaje = '';

    imagen.src = 'img/no_chill.png';
    mensaje = "Manteniendo el Click";

    document.getElementById("mensaje").textContent = mensaje;
});

document.addEventListener('mouseup', function() {
    let mensaje = '';
    
    imagen.src = 'img/chill.jpg';
    mensaje = "Sin hacer Click";

    document.getElementById("mensaje").textContent = mensaje;
});
