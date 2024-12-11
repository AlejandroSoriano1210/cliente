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
    document.getElementById('puntaje-jugador').innerHTML = "Puntaje Jugador: " + puntajeJugador;
    document.getElementById('puntaje-crupier').innerHTML = "Puntaje Crupier: " + puntajeCrupier;
}

function mostrarCartas(zona, cartas) {
    const contenedor = document.getElementById(zona);
    contenedor.innerHTML = '';

    cartas.forEach(carta => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');

        if (carta.palo === "♥" || carta.palo === "♦") {
            divCarta.classList.add('rojo');
        }

        divCarta.innerHTML = carta.valor + carta.palo;
        contenedor.appendChild(divCarta);
    });
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

    if (tieneBlackjackJugador) {
        document.getElementById("resultado").innerHTML = "Tienes Blackjack, felicidades!";
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
        document.getElementById("resultado").innerHTML = '¡Te has pasado!';
        bloquearBotones();

    } else {

        jugarCrupier();
    }
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

function jugarCrupier() {
    var puntajeCrupier = calcularPuntaje(cartasCrupier);

    setTimeout(() => {

        function robarCarta() {
            if (puntajeCrupier < 17 ) {

                var nuevaCarta = generarCarta();
                cartasCrupier.push(nuevaCarta);
                mostrarCartas('cartas-crupier', cartasCrupier);
                puntajeCrupier = calcularPuntaje(cartasCrupier);
                mostrarPuntaje();

                setTimeout(robarCarta, 900);

            } else {

                determinarGanador();
            }
        }

        robarCarta();
    }, 900);
}

function determinarGanador() {
    var puntajeJugador = calcularPuntaje(cartasJugador);
    var puntajeCrupier = calcularPuntaje(cartasCrupier);

    if (puntajeCrupier > 21) {
        document.getElementById("resultado").innerHTML = '¡El crupier se ha pasado, GG!';
    } else if (puntajeJugador > puntajeCrupier) {
        document.getElementById("resultado").innerHTML = '¡Enhorabuena, has ganado!';
    } else if (puntajeCrupier > puntajeJugador) {
        document.getElementById("resultado").innerHTML = '¡El crupier gana, mala suerte!';
    } else if (puntajeCrupier = puntajeJugador) {
        document.getElementById("resultado").innerHTML = '¡Es un empate!';
    }

    bloquearBotones();
}