var nombre = document.getElementById('nombre');
var apellidos = document.getElementById('apellidos');
var contrasena = document.getElementById('contrasena');
var nacimiento = document.getElementById('nacimiento');

document.getElementById('boton').addEventListener('click', function() {
    
    var interesesSeleccionados = document.querySelectorAll('input[name="intereses"]:checked').length;
    
    if (!nombre.value || !apellidos.value || !contrasena.value || !nacimiento.value || interesesSeleccionados === 0) {
        document.getElementById('error').hidden = false;
    } else {
        document.getElementById('error').hidden = true;
        
    }
});