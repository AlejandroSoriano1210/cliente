function calcularPuntaje(cartas) {
    let puntaje = 0;
    let tieneAs = false;

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

let cartasJugador = [];
let cartasCrupier = [];
let jugadorPlanto = false;

function mostrarPuntaje() {
    const puntajeJugador = calcularPuntaje(cartasJugador);
    let puntajeCrupier = calcularPuntaje([cartasCrupier[0]]);

    if (jugadorPlanto) {
        puntajeCrupier = calcularPuntaje(cartasCrupier);
    }
    document.getElementById('puntaje-jugador').innerHTML = `Puntaje Jugador: ${puntajeJugador}`;
    document.getElementById('puntaje-crupier').innerHTML = `Puntaje Crupier: ${puntajeCrupier}`;
}

function nuevoJuego() {
    document.getElementById("resultado").innerHTML = ''; 

    cartasJugador = [generarCarta(), generarCarta()];
    cartasCrupier = [generarCarta(), generarCarta()];

    mostrarCartas('cartas-jugador', cartasJugador);
    
    mostrarCartas('cartas-crupier', [cartasCrupier[0], { valor: 'X', palo: '' }]);

    jugadorPlanto = false;

    mostrarPuntaje();
}

function pedirCarta() {
    if (!jugadorPlanto) {
        const nuevaCarta = generarCarta();
        cartasJugador.push(nuevaCarta);
        mostrarCartas('cartas-jugador', cartasJugador);
    }

    mostrarPuntaje();
}

function plantarse() {
    jugadorPlanto = true;

    mostrarCartas('cartas-crupier', cartasCrupier);

    mostrarPuntaje();

    jugarCrupier();
}

function jugarCrupier() {
    let puntajeCrupier = calcularPuntaje(cartasCrupier);
    
    while (puntajeCrupier < 17) {
        const nuevaCarta = generarCarta();
        cartasCrupier.push(nuevaCarta);
        mostrarCartas('cartas-crupier', cartasCrupier);
        puntajeCrupier = calcularPuntaje(cartasCrupier);
        mostrarPuntaje();
    }

    determinarGanador();
}

function determinarGanador() {
    const puntajeJugador = calcularPuntaje(cartasJugador);
    const puntajeCrupier = calcularPuntaje(cartasCrupier);

    if (puntajeJugador > 21) {
        document.getElementById("resultado").innerHTML='¡El jugador ha perdido! Se pasó de 21.';
    } else if (puntajeCrupier > 21) {
        document.getElementById("resultado").innerHTML='¡El crupier ha perdido! Se pasó de 21.';
    } else if (puntajeJugador > puntajeCrupier) {
        document.getElementById("resultado").innerHTML='¡El jugador gana!';
    } else if (puntajeCrupier > puntajeJugador) {
        document.getElementById("resultado").innerHTML='¡El crupier gana!';
    } else {
        document.getElementById("resultado").innerHTML='¡Empate!';
    }
}
