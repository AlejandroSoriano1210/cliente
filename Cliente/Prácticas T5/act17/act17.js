var bienvenida = document.getElementById('bienvenida');
var nombre = document.getElementById('nombre');
var color = document.getElementById('color');
var boton = document.getElementById('boton');
var error = document.getElementById('error');
var preview = document.getElementById('preview');
var resumen = document.getElementById('resumen');

nombre.addEventListener('input', function () {
    preview.textContent = "Hola, " + nombre.value;
    preview.style.backgroundColor = "white";
});

color.addEventListener('change', function () {
    if (color.value) {
        preview.textContent = "Tu color favorito es " + color.value;
    }

    switch (color.value) {
        case "Rojo":
            preview.style.backgroundColor = "lightcoral";
            break;
        case "Azul":
            preview.style.backgroundColor = "lightblue";
            break;
        case "Verde":
            preview.style.backgroundColor = "lightgreen";
            break;
        case "Amarillo":
            preview.style.backgroundColor = "yellow";
            break;
    }
});

boton.addEventListener('click', function () {
    var name = nombre.value;
    var colour = color.value;
    var notifications = document.getElementById('notifications').checked;

    if (!name || !colour) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
        preview.textContent = "";
        preview.style.backgroundColor = "";
        resumen.innerHTML = `
                <strong>Resumen de tus respuestas:</strong><br>
                Nombre: ${name}<br>
                Color favorito: ${colour}<br>
                Desea recibir notificaciones: ${notifications ? 'Sí' : 'No'}
            `;
            confirm("¿Esta seguro de que quiere enviar el formulario?")
    }
});

window.addEventListener('load', function () {
    setTimeout(() => {
        bienvenida.style.display = 'none'
    }, 3500);
});