document.addEventListener('DOMContentLoaded', () => {
    const btnNuevaPartida = document.getElementById('btn-nueva-partida');
    const btnPedir = document.getElementById('btn-pedir');
    const btnPlantarse = document.getElementById('btn-plantarse');
    const jugadorCartas = document.getElementById('jugador-cartas');
    const jugadorPuntaje = document.getElementById('jugador-puntaje');
    const crupierCartas = document.getElementById('crupier-cartas');
    const crupierPuntaje = document.getElementById('crupier-puntaje');
    const resultado = document.getElementById('resultado');

    let baraja, jugador, crupier;

    // Función para actualizar la pantalla
    function actualizarEstado() {
        jugadorCartas.innerHTML = `<strong>Jugador:</strong> ${jugador.mano.map(carta => `${carta.valor} de ${carta.palo}`).join(', ')}`;
        jugadorPuntaje.textContent = `Puntaje del Jugador: ${jugador.puntaje}`;
        crupierCartas.innerHTML = `<strong>Crupier:</strong> ${crupier.mano.map(carta => `${carta.valor} de ${carta.palo}`).join(', ')}`;
        crupierPuntaje.textContent = `Puntaje del Crupier: ${crupier.puntaje}`;
    }

    // Iniciar nueva partida
    btnNuevaPartida.addEventListener('click', () => {
        resultado.textContent = '';
        btnPedir.disabled = false;
        btnPlantarse.disabled = false;

        baraja = barajar(crearBaraja());
        jugador = { mano: [repartirCarta(baraja), repartirCarta(baraja)], puntaje: 0 };
        crupier = { mano: [repartirCarta(baraja), repartirCarta(baraja)], puntaje: 0 };

        jugador.puntaje = calcularPuntaje(jugador.mano);
        crupier.puntaje = calcularPuntaje(crupier.mano);

        actualizarEstado();
    });

    // Pedir carta
    btnPedir.addEventListener('click', () => {
        jugador.mano.push(repartirCarta(baraja));
        jugador.puntaje = calcularPuntaje(jugador.mano);
        actualizarEstado();

        if (jugador.puntaje > 21) {
            resultado.textContent = '¡Te pasaste! El crupier gana.';
            btnPedir.disabled = true;
            btnPlantarse.disabled = true;
        }
    });

    // Plantarse
    btnPlantarse.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;

        while (crupier.puntaje < 17) {
            crupier.mano.push(repartirCarta(baraja));
            crupier.puntaje = calcularPuntaje(crupier.mano);
        }
        actualizarEstado();

        if (crupier.puntaje > 21 || jugador.puntaje > crupier.puntaje) {
            resultado.textContent = '¡Ganaste!';
        } else if (jugador.puntaje === crupier.puntaje) {
            resultado.textContent = 'Es un empate.';
        } else {
            resultado.textContent = 'El crupier gana.';
        }
    });
});

// Crear la baraja de cartas
function crearBaraja() {
    const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
    const valores = [
        { valor: 'A', puntos: 11 }, 
        { valor: '2', puntos: 2 }, 
        { valor: '3', puntos: 3 },
        { valor: '4', puntos: 4 }, 
        { valor: '5', puntos: 5 }, 
        { valor: '6', puntos: 6 }, 
        { valor: '7', puntos: 7 },
        { valor: '8', puntos: 8 }, 
        { valor: '9', puntos: 9 }, 
        { valor: '10', puntos: 10 },
        { valor: 'J', puntos: 10 }, 
        { valor: 'Q', puntos: 10 }, 
        { valor: 'K', puntos: 10 }
    ];

    const baraja = [];
    for (let palo of palos) {
        for (let carta of valores) {
            baraja.push({ palo, valor: carta.valor, puntos: carta.puntos });
        }
    }
    return baraja;
}

// Barajar las cartas
function barajar(baraja) {
    for (let i = baraja.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
    }
    return baraja;
}

// Repartir una carta
function repartirCarta(baraja) {
    return baraja.pop();
}

// Calcular el puntaje de una mano
function calcularPuntaje(mano) {
    let puntaje = 0;
    let ases = 0;

    for (let carta of mano) {
        puntaje += carta.puntos;
        if (carta.valor === 'A') ases++;
    }

    // Ajustar el valor de los ases si el puntaje supera 21
    while (puntaje > 21 && ases > 0) {
        puntaje -= 10;
        ases--;
    }
    return puntaje;
}

// Inicializar el juego
function iniciarJuego() {
    let baraja = barajar(crearBaraja());
    let jugador = { mano: [], puntaje: 0 };
    let crupier = { mano: [], puntaje: 0 };

    // Repartir dos cartas a cada uno
    jugador.mano.push(repartirCarta(baraja), repartirCarta(baraja));
    crupier.mano.push(repartirCarta(baraja), repartirCarta(baraja));

    jugador.puntaje = calcularPuntaje(jugador.mano);
    crupier.puntaje = calcularPuntaje(crupier.mano);

    return { baraja, jugador, crupier };
}

// Mostrar el estado actual del juego
function mostrarEstado(jugador, crupier) {
    console.log('Jugador:', jugador.mano, 'Puntaje:', jugador.puntaje);
    console.log('Crupier:', crupier.mano, 'Puntaje:', crupier.puntaje);
}

// Flujo del juego
function jugar() {
    let { baraja, jugador, crupier } = iniciarJuego();
    mostrarEstado(jugador, crupier);

    // Turno del jugador
    let seguirJugando = true;
    while (seguirJugando && jugador.puntaje < 21) {
        const accion = prompt('¿Quieres otra carta? (sí/no)').toLowerCase();
        if (accion === 'sí') {
            jugador.mano.push(repartirCarta(baraja));
            jugador.puntaje = calcularPuntaje(jugador.mano);
            mostrarEstado(jugador, crupier);
        } else {
            seguirJugando = false;
        }
    }

    // Turno del crupier
    while (crupier.puntaje < 17) {
        crupier.mano.push(repartirCarta(baraja));
        crupier.puntaje = calcularPuntaje(crupier.mano);
    }

    mostrarEstado(jugador, crupier);

    // Determinar el resultado
    if (jugador.puntaje > 21) {
        console.log('¡Te pasaste! El crupier gana.');
    } else if (crupier.puntaje > 21 || jugador.puntaje > crupier.puntaje) {
        console.log('¡Ganaste!');
    } else if (jugador.puntaje === crupier.puntaje) {
        console.log('Es un empate.');
    } else {
        console.log('El crupier gana.');
    }
}

// Ejecutar el juego
jugar();
