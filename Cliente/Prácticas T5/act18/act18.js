var formulario = document.getElementById("formulario");
var nombre = document.getElementById("nombre");
var apellidos = document.getElementById("apellidos");
var contrasena = document.getElementById("contrasena");
var nacimiento = document.getElementById("nacimiento");
var intereses = document.getElementsByName("intereses");
var genero = document.getElementsByName("genero");
var boton = document.getElementById("boton");
var errorNombre = document.getElementById("errorNombre");
var errorApellidos = document.getElementById("errorApellidos");
var errorContrasena = document.getElementById("errorContrasena");
var errorNacimiento = document.getElementById("errorNacimiento");
var errorInteres = document.getElementById("errorInteres");
var errorGenero = document.getElementById("errorGenero");
var errorGeneral = document.getElementById("error");

function validarNombre() {
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        errorNombre.style.color = "red";
        return false;
    } else if (!regex.test(nombre.value)) {
        errorNombre.textContent = "El nombre no puede contener números ni caracteres especiales.";
        errorNombre.style.color = "red";
        return false;
    } else {
        errorNombre.textContent = "";
        return true;
    }
}

function validarApellidos() {
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (apellidos.value.trim() === "") {
        errorApellidos.textContent = "Los apellidos son obligatorios.";
        errorApellidos.style.color = "red";
        return false;
    } else if (!regex.test(apellidos.value)) {
        errorApellidos.textContent = "Los apellidos no pueden contener números ni caracteres especiales.";
        errorApellidos.style.color = "red";
        return false;
    } else {
        errorApellidos.textContent = "";
        return true;
    }
}

function validarContrasena() {
    if (contrasena.value.length < 9 || contrasena.value.length > 11) {
        errorContrasena.textContent = "La contraseña debe tener entre 9 y 11 caracteres.";
        errorContrasena.style.color = "red";
        return false;
    } else {
        errorContrasena.textContent = "";
        return true;
    }
}

function validarNacimiento() {
    var fechaIngresada = new Date(nacimiento.value);
    var fechaActual = new Date();
    var anioMinimo = 1900;

    if (nacimiento.value === "") {
        errorNacimiento.textContent = "La fecha de nacimiento es obligatoria.";
        errorNacimiento.style.color = "red";
        return false;
    } else if (fechaIngresada.getFullYear() < anioMinimo || fechaIngresada > fechaActual) {
        errorNacimiento.textContent = "Por favor, ingresa una fecha de nacimiento válida.";
        errorNacimiento.style.color = "red";
        return false;
    } else {
        errorNacimiento.textContent = "";
        return true;
    }
}

function validarIntereses() {
    var interesSeleccionado = false;
    intereses.forEach((interes) => {
        if (interes.checked) {
            interesSeleccionado = true;
        }
    });
    if (!interesSeleccionado) {
        errorInteres.textContent = "Debes seleccionar al menos un interés.";
        errorInteres.style.color = "red";
        return false;
    } else {
        errorInteres.textContent = "";
        return true;
    }
}

function validarGenero() {
    var generoSeleccionado = false;
    genero.forEach((opcion) => {
        if (opcion.checked) {
            generoSeleccionado = true;
        }
    });
    if (!generoSeleccionado) {
        errorGenero.textContent = "Debes seleccionar un género.";
        errorGenero.style.color = "red";
        return false;
    } else {
        errorGenero.textContent = "";
        return true;
    }
}

function manejarValidacionIndividual() {
    nombre.addEventListener("blur", validarNombre);
    apellidos.addEventListener("blur", validarApellidos);
    contrasena.addEventListener("blur", validarContrasena);
    nacimiento.addEventListener("blur", validarNacimiento);
    intereses.forEach((interes) => interes.addEventListener("change", validarIntereses));
    genero.forEach((opcion) => opcion.addEventListener("change", validarGenero));
}

function validarFormulario() {
    var validNombre = validarNombre();
    var validApellidos = validarApellidos();
    var validContrasena = validarContrasena();
    var validNacimiento = validarNacimiento();
    var validIntereses = validarIntereses();
    var validGenero = validarGenero();

    var valid = validNombre && validApellidos && validContrasena && validNacimiento && validIntereses && validGenero;

    if (!valid) {
        errorGeneral.hidden = false;
    } else {
        errorGeneral.hidden = true;
        alert("Formulario enviado correctamente.");
        formulario.reset();
    }
}

manejarValidacionIndividual();

boton.addEventListener("click", (event) => {
    event.preventDefault();
    validarFormulario();
});
