var boton = document.getElementById('boton');
var botonRojo = document.getElementById('rojo');
var botonAzul = document.getElementById('azul');
var botonVerde = document.getElementById('verde');
var projo = document.getElementById('p-rojo');
var pazul = document.getElementById('p-azul');
var pverde = document.getElementById('p-verde');
var i = 0;
var j = 0;
var k = 0;

boton.addEventListener("click", function() {
    
    if(boton.innerHTML == "Has hecho clic") {
        boton.innerHTML = "Haz click en mí";
    } else {
        boton.innerHTML = "Has hecho clic";
    }
});

botonRojo.addEventListener("click", function() {
    i++;
    projo.textContent = "Rojo: " + i;
    comprobarGanador();
});

botonAzul.addEventListener("click", function() {
    j++;
    pazul.textContent = "Azul: " + j;
    comprobarGanador();
});

botonVerde.addEventListener("click", function() {    
    k++;
    pverde.textContent = "Verde: " + k;
    comprobarGanador();
});

function comprobarGanador() {
    if (i > j && i > k) {
        botonRojo.style.backgroundColor = "yellow";
    } else if (j > i && j > k) {
        botonAzul.style.backgroundColor = "yellow";
    } else if (k > i && k > j) {
        botonVerde.style.backgroundColor = "yellow";
    } else if (i == j) {
        botonRojo.style.backgroundColor = "white";
        botonAzul.style.backgroundColor = "white";
    } else if (i == k) {
        botonRojo.style.backgroundColor = "white";
        botonVerde.style.backgroundColor = "white";
    } else if (j == k) {
        botonAzul.style.backgroundColor = "white";
        botonVerde.style.backgroundColor = "white";
    }
};