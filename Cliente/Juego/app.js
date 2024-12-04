// Cartas disponibles
const palos = ['♠', '♥', '♦', '♣'];
const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Función para generar una carta aleatoria
function generarCarta() {
    const palo = palos[Math.floor(Math.random() * palos.length)];
    const valor = valores[Math.floor(Math.random() * valores.length)];
    return { valor, palo };  // Retornamos un objeto con el valor y el palo
}

// Función para crear y mostrar las cartas
function mostrarCartas(zona, cartas) {
    const contenedor = document.getElementById(zona);
    contenedor.innerHTML = ''; // Limpiar cartas anteriores

    cartas.forEach(carta => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.textContent = `${carta.valor}${carta.palo}`;
        contenedor.appendChild(divCarta);
    });
}

// Función para calcular el puntaje de las cartas
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

    // Si hay un As y el puntaje es mayor de 21, restamos 10 puntos (se considera el As como 1)
    if (tieneAs && puntaje > 21) {
        puntaje -= 10;
    }

    return puntaje;
}

// Inicializamos las variables para las cartas del crupier y el jugador
let cartasJugador = [];
let cartasCrupier = [];
let jugadorPlanto = false;

// Función para actualizar y mostrar el puntaje en la interfaz
function mostrarPuntaje() {
    const puntajeJugador = calcularPuntaje(cartasJugador);
    let puntajeCrupier = calcularPuntaje([cartasCrupier[0]]); // Solo contamos la primera carta

    if (jugadorPlanto) {
        // Si el jugador se plantó, calculamos el puntaje completo del crupier
        puntajeCrupier = calcularPuntaje(cartasCrupier);
    }
    // Mostrar puntaje en la interfaz
    document.getElementById('puntaje-jugador').textContent = `Puntaje Jugador: ${puntajeJugador}`;
    document.getElementById('puntaje-crupier').textContent = `Puntaje Crupier: ${puntajeCrupier}`;
}

// Función para iniciar un nuevo juego
function nuevoJuego() {
    // Limpiar el resultado anterior
    document.getElementById("resultado").textContent = ''; 

    // Reiniciamos las variables
    cartasJugador = [generarCarta(), generarCarta()];
    cartasCrupier = [generarCarta(), generarCarta()];

    // Mostramos las cartas del jugador
    mostrarCartas('cartas-jugador', cartasJugador);
    
    // Mostramos la carta visible del crupier y ocultamos la segunda carta
    mostrarCartas('cartas-crupier', [cartasCrupier[0], { valor: 'X', palo: '' }]);

    // Restablecemos el estado de si el jugador se ha plantado
    jugadorPlanto = false;

    // Actualizamos los puntajes
    mostrarPuntaje();
}

// Función para pedir carta
function pedirCarta() {
    if (!jugadorPlanto) {
        const nuevaCarta = generarCarta();
        cartasJugador.push(nuevaCarta);
        mostrarCartas('cartas-jugador', cartasJugador);
    }

    // Actualizamos los puntajes después de cada acción
    mostrarPuntaje();
}

// Función para plantarse
function plantarse() {
    jugadorPlanto = true;

    // Mostramos la segunda carta del crupier cuando el jugador se plantó
    mostrarCartas('cartas-crupier', cartasCrupier);

    // Actualizamos los puntajes después de plantarse
    mostrarPuntaje();

    // El crupier juega ahora, seguimos pidiendo cartas hasta llegar a 17 o más
    jugarCrupier();
}

// Función para que el crupier juegue
function jugarCrupier() {
    let puntajeCrupier = calcularPuntaje(cartasCrupier);
    
    // El crupier sigue pidiendo cartas hasta que tenga al menos 17 puntos
    while (puntajeCrupier < 17) {
        const nuevaCarta = generarCarta();
        cartasCrupier.push(nuevaCarta);
        mostrarCartas('cartas-crupier', cartasCrupier);
        puntajeCrupier = calcularPuntaje(cartasCrupier);
        mostrarPuntaje();
    }

    // Determinamos al ganador después de que el crupier haya terminado de jugar
    determinarGanador();
}

// Función para determinar el ganador
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
