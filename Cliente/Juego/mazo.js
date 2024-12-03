var cartas = {palo: palo, nombre: nombre, valor: valor};

var mazo = [];
mazo.push(cartas);

var manoJugador = [];

var manoCrupier = [];

function nuevaPartida() {
    manoJugador.push(mazo);
    manoCrupier.push(mazo);
}

function pedir() {
    manoJugador.push(mazo);
    document.getElementById('valoresJugador').innerHTML = valoresJugador;
}

function plantarse() {
    manoCrupier.push(mazo);
    document.getElementById('valoresCrupier').innerHTML = valoresCrupier;
}

