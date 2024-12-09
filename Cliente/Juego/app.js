function bloquearBotones() {
    document.getElementById("pedir-carta").disabled = true;
    document.getElementById("plantarse").disabled = true;
}

function habilitarBotones() {
    document.getElementById("pedir-carta").disabled = false;
    document.getElementById("plantarse").disabled = false;
}

function calcularPuntaje(cartas) {
    var puntaje = 0;
    var tieneAs = false;

    cartas.forEach(carta => {
        if (carta.valor === 'A') {
            puntaje += 11;
            tieneAs = true;
        } else if (['K', 'Q', 'J'].includes(carta.valor)) {
            puntaje += 10;
        } else {
            puntaje += parseInt(carta.valor);
        }
    });

    if (tieneAs && puntaje > 21) {
        puntaje -= 10;
    }

    return puntaje;
}

var cartasJugador = [];
var cartasCrupier = [];
var jugadorPlanto = false;

function mostrarPuntaje() {
    var puntajeJugador = calcularPuntaje(cartasJugador);
    var puntajeCrupier = calcularPuntaje([cartasCrupier[0]]);

    if (jugadorPlanto) {
        puntajeCrupier = calcularPuntaje(cartasCrupier);
    }
    document.getElementById('puntaje-jugador').innerHTML = "Puntaje Jugador: "+puntajeJugador;
    document.getElementById('puntaje-crupier').innerHTML = "Puntaje Crupier: "+puntajeCrupier;
}

function esBlackjack(cartas) {
    var tieneAs = false;
    var tieneCartaValor10 = false;

    cartas.forEach(carta => {
        if (carta.valor === 'A') {
            tieneAs = true;
        } else if (['K', 'Q', 'J', '10'].includes(carta.valor)) {
            tieneCartaValor10 = true;
        }
    });

    return tieneAs && tieneCartaValor10 && cartas.length === 2;
}

function nuevoJuego() {
    mazo = crearMazo();

    document.getElementById("resultado").innerHTML = ''; 

    cartasJugador = [generarCarta(), generarCarta()];
    cartasCrupier = [generarCarta(), generarCarta()];

    mostrarCartas('cartas-jugador', cartasJugador);
    mostrarCartas('cartas-crupier', [cartasCrupier[0], { valor: 'X', palo: '' }]);

    jugadorPlanto = false;

    habilitarBotones();

    var tieneBlackjackCrupier = esBlackjack(cartasCrupier);
    var tieneBlackjackJugador = esBlackjack(cartasJugador);
    
    if (tieneBlackjackCrupier && tieneBlackjackJugador) {
        document.getElementById("resultado").innerHTML = "Empate, ambos tienen Blackjack.";
        mostrarCartas('cartas-crupier', cartasCrupier);
        mostrarPuntaje();
        bloquearBotones();
    } 
    else if (tieneBlackjackCrupier) {
        document.getElementById("resultado").innerHTML = "El crupier tiene Blackjack, has perdido.";
        mostrarCartas('cartas-crupier', cartasCrupier);
        mostrarPuntaje();
        bloquearBotones();
    }

    mostrarPuntaje();
}


function pedirCarta() {
    if (!jugadorPlanto) {
        var nuevaCarta = generarCarta();
        cartasJugador.push(nuevaCarta);
        mostrarCartas('cartas-jugador', cartasJugador);
    }

    mostrarPuntaje();
}

function plantarse() {
    jugadorPlanto = true;

    mostrarCartas('cartas-crupier', cartasCrupier);

    mostrarPuntaje();

    var puntajeJugador = calcularPuntaje(cartasJugador);

    if (puntajeJugador > 21) {
        document.getElementById("resultado").innerHTML = '¡El jugador ha perdido!';
        bloquearBotones();

    } else {

        jugarCrupier();
    }
}

function jugarCrupier() {
    var puntajeCrupier = calcularPuntaje(cartasCrupier);
    var puntajeJugador = calcularPuntaje(cartasJugador);

    function robarCartaConRetraso() {
        if (puntajeCrupier < 17 || (puntajeCrupier < puntajeJugador && puntajeCrupier < 21)) {
            var nuevaCarta = generarCarta();
            cartasCrupier.push(nuevaCarta);
            mostrarCartas('cartas-crupier', cartasCrupier);
            puntajeCrupier = calcularPuntaje(cartasCrupier);
            mostrarPuntaje();

            setTimeout(robarCartaConRetraso, 900);

        } else {

            determinarGanador();
        }
    }

    robarCartaConRetraso();
}


function determinarGanador() {
    var puntajeJugador = calcularPuntaje(cartasJugador);
    var puntajeCrupier = calcularPuntaje(cartasCrupier);

    if (puntajeJugador > 21) {
        document.getElementById("resultado").innerHTML='¡El jugador ha perdido!';
    } else if (puntajeCrupier > 21) {
        document.getElementById("resultado").innerHTML='¡El crupier ha perdido!';
    } else if (puntajeJugador > puntajeCrupier) {
        document.getElementById("resultado").innerHTML='¡El jugador gana!';
    } else if (puntajeCrupier > puntajeJugador) {
        document.getElementById("resultado").innerHTML='¡El crupier gana!';
    } else {
        document.getElementById("resultado").innerHTML='¡Empate!';
    }

    bloquearBotones();
}