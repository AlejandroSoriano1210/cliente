var formulario = document.getElementById("formulario");
var nombre = document.getElementById("nombre");
var entrada = document.getElementById("entrada");
var salida = document.getElementById("salida");
var huespedes = document.getElementById("huespedes");
var telefono = document.getElementById("telefono");
var boton = document.getElementById("boton");
var errorNombre = document.getElementById("errorNombre");
var errorFecha = document.getElementById("errorFecha");
var errorFechaSalida = document.getElementById("errorFechaSalida");
var errorHuespedes = document.getElementById("errorHuespedes");
var errorTelefono = document.getElementById("errorTelefono");
var errorGeneral = document.getElementById("error");
var regexNom = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
var regexNum = /^6+\d{8}$/;
var fechaEntrada = new Date(entrada.value);
var fechasalida = new Date(salida.value);
var fechaActual = new Date();

function validarNombre() {
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        errorNombre.style.color = "red";
        return false;
    } else if (!regexNom.test(nombre.value)) {
        errorNombre.textContent = "El nombre no puede contener números ni caracteres especiales.";
        errorNombre.style.color = "red";
        return false;
    } else if (nombre.value.length < 3){
        errorNombre.textContent = "El nombre debe contener al menos 3 caracteres";
        errorNombre.style.color = "red";
        return false;
    } else {
        errorNombre.textContent = "";
        return true;
    }
}

function validarEntrada() {
    if (entrada.value === "") {
        errorFecha.textContent = "La fecha de entrada es obligatoria.";
        errorFecha.style.color = "red";
        return false;
    } else if (fechaEntrada < fechaActual) {
        errorFecha.textContent = "Por favor, ingresa una fecha de entrada válida.";
        errorFecha.style.color = "red";
        return false;
    } else {
        errorFecha.textContent = "";
        return true;
    }
}


function salidaValida() {
    if (salida.value === "") {
        errorFechaSalida.textContent = "La fecha de salida es obligatoria.";
        errorFechaSalida.style.color = "red";
        return false;
    } else if (fechasalida < fechaEntrada) {
        errorFechaSalida.textContent = "Por favor, ingresa una fecha de salida válida.";
        errorFechaSalida.style.color = "red";
        return false;
    } else {
        errorFechaSalida.textContent = "";
        return true;
    }
}

function huespedesValida() {
    if (huespedes.value < 1 || huespedes.value > 4) {
        errorHuespedes.textContent = "Introduzca un valor válido entre 1 y 4.";
        errorHuespedes.style.color = "red";
        return false;
    } else {
        errorHuespedes.textContent = "";
        return true;
    }
}

var telefonoValida = function() {
    if (telefono.value.trim() === "") {
        errorTelefono.textContent = "El teléfono es obligatorio.";
        errorTelefono.style.color = "red";
        return false;
    } else if (!regexNum.test(telefono.value)) {
        errorTelefono.textContent = "El teléfono debe tener 9 dígitos y empezar por 6.";
        errorTelefono.style.color = "red";
        return false;
    } else {
        errorTelefono.textContent = "";
        return true;
    }
}

function manejarValidacionIndividual() {
    nombre.addEventListener("blur", validarNombre);
    entrada.addEventListener("blur", validarEntrada);
    salida.addEventListener("blur", salidaValida);
    huespedes.addEventListener("blur", huespedesValida);
    telefono.addEventListener("blur", telefonoValida);
}

function validarFormulario() {
    var validNombre = validarNombre();
    var validentrada = validarEntrada();
    var validarSalida = salidaValida();
    var validarTelefono = telefonoValida();
    var validarHuespedes = huespedesValida();

    var valid = validNombre && validentrada && validarSalida && validarTelefono && validarHuespedes;

    if (!valid) {
        errorGeneral.hidden = false;
    } else {
        errorGeneral.hidden = true;
        alert("Registro correcto.");
        formulario.reset();
    }
}

manejarValidacionIndividual();

boton.addEventListener("click", (event) => {
    event.preventDefault();
    validarFormulario();
});