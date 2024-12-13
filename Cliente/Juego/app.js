//funcion para bloquear los botones
function bloquearBotones() {
    document.getElementById("pedir-carta").disabled = true;
    document.getElementById("plantarse").disabled = true;
}

//funcion para habilitar los botones
function habilitarBotones() {
    document.getElementById("pedir-carta").disabled = false;
    document.getElementById("plantarse").disabled = false;
}

//funcion para calcular el puntaje
function calcularPuntaje(cartas) {
    var puntaje = 0;
    var tieneAs = false;

    //recorre cada carta del conjunto de cartas de la mano
    cartas.forEach(carta => {

        //condicion para cambiar el valor del As a 11, y K, Q y J a 10
        if (carta.valor === 'A') {
            puntaje += 11;
            tieneAs = true;
        } else if (['K', 'Q', 'J'].includes(carta.valor)) {
            puntaje += 10;

        //para el resto de cartas simplemente se añade su valor al puntaje
        } else {
            puntaje += parseInt(carta.valor);
        }
    });

    //si la mano tiene un As y se pasa del "maximo" se reduce a 1 el valor del As, o se quitan 10 puntos
    if (tieneAs && puntaje > 21) {
        puntaje -= 10;
    }

    return puntaje;
}


//funcion para comenzar la partida la presionar el boton de "Nueva partida"
function nuevaPartida() {
    //se crea el mazo
    mazo = crearMazo();
    
    //se "limpia" el resultado en caso de ser una partida a continuacion de otra
    document.getElementById("resultado").innerHTML = '';
    
    //se reparten las cartas
    cartasJugador = [generarCarta(), generarCarta()];
    cartasCrupier = [generarCarta(), generarCarta()];
    
    //se muestran las cartas, excepto la "carta oculta" del crupier, que se sustituye por una carta X
    mostrarCartas('cartas-jugador', cartasJugador);
    mostrarCartas('cartas-crupier', [cartasCrupier[0], { valor: 'X', palo: '' }]);
    
    jugadorPlanto = false;
    
    habilitarBotones();
    
    //verifica si tiene alguien blackjack para terminar la partida actual
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

//funcion para mostrar el puntaje de cada jugador
function mostrarPuntaje() {
    var puntajeJugador = calcularPuntaje(cartasJugador);
    //puntaje del crupier para que solo sea el de la primera carta
    var puntajeCrupier = calcularPuntaje([cartasCrupier[0]]);

    //condicion para cuando el jugador se plante, mostrar el puntaje correcto
    if (jugadorPlanto) {
        puntajeCrupier = calcularPuntaje(cartasCrupier);
    }

    document.getElementById('puntaje-jugador').innerHTML = "Puntaje Jugador: " + puntajeJugador;
    document.getElementById('puntaje-crupier').innerHTML = "Puntaje Crupier: " + puntajeCrupier;
}

//funcion para que las cartas aparezcan en la "mesa"
function mostrarCartas(zona, cartas) {
    const contenedor = document.getElementById(zona);
    contenedor.innerHTML = '';

    //recorre cada objeto del array
    cartas.forEach(carta => {

        //por cada carta se crea un elemento div
        const divCarta = document.createElement('div');
        
        //se le da la clase "carta" para el CSS
        divCarta.classList.add('carta');

        //las cartas con el palo del corazon o el diamante, darle tambien la clase "rojo" del CSS
        if (carta.palo === "♥" || carta.palo === "♦") {
            divCarta.classList.add('rojo');
        }

        //define el contenido del divCarta creado
        divCarta.innerHTML = carta.valor + carta.palo;

        //se añade al contenedor padre el divCarta creado como hijo
        contenedor.appendChild(divCarta);
    });
}

var cartasJugador = [];
var cartasCrupier = [];
var jugadorPlanto = false;

//funcion para el boton de pedir carta
function pedirCarta() {

    //roba una carta del mazo
    var nuevaCarta = generarCarta();

    //se añade la carta al array de cartas del jugador
    cartasJugador.push(nuevaCarta);

    mostrarCartas('cartas-jugador', cartasJugador);
    mostrarPuntaje();
}

//funcion para el boton de plantarse
function plantarse() {
    jugadorPlanto = true;

    //muestra todas las cartas del crupier, es decir, revela la carta oculta y muestra el puntaje correcto
    mostrarCartas('cartas-crupier', cartasCrupier);
    mostrarPuntaje();

    //verifica el puntaje del jugador
    var puntajeJugador = calcularPuntaje(cartasJugador);

    //condicion para verificar si el jugador se ha pasado de 21, terminando la partida
    if (puntajeJugador > 21) {
        document.getElementById("resultado").innerHTML = '¡Te has pasado!';
        bloquearBotones();

    //o el crupier juega su turno
    } else {

        jugarCrupier();
    }
}

//funcion para verificar si al comienzo de la partida hay un blackjack
function esBlackjack(cartas) {
    //variables para verificar si hay al menos un as y/o una carta con valor 10
    var tieneAs = false;
    var tieneCartaValor10 = false;

    //recorrer el array de cartas
    cartas.forEach(carta => {
        //si la carta es un As
        if (carta.valor === 'A') {
            tieneAs = true;
        //si la carta es un rey, reina, jota o el 10
        } else if (['K', 'Q', 'J', '10'].includes(carta.valor)) {
            tieneCartaValor10 = true;
        }
    });

    //devuelve en true los valores si hay un As, una carta con valor 10 y hay exactamente 2 cartas en total
    return tieneAs && tieneCartaValor10 && cartas.length === 2;
}

//funcion que el crupier juegue
function jugarCrupier() {
    //corrige el puntaje del crupier al correcto
    var puntajeCrupier = calcularPuntaje(cartasCrupier);

    //un pequeño retraso antes de empezar a robar
    setTimeout(() => {

        //funcion de robar cartas
        function robarCarta() {
            //condicion para simular la regla del blackjack estandar, el crupier siempre roba si tiene 16 o menos
            if (puntajeCrupier < 17 ) {

                var nuevaCarta = generarCarta();
                cartasCrupier.push(nuevaCarta);
                mostrarCartas('cartas-crupier', cartasCrupier);
                puntajeCrupier = calcularPuntaje(cartasCrupier);
                mostrarPuntaje();

                //retraso antes de robar la siguiente carta
                setTimeout(robarCarta, 900);
            
            //se "planta" si tiene 17 o mas, donde determina el ganador
            } else {

                determinarGanador();
            }
        }

        robarCarta();
    }, 900);
}

//funcion para determinar quien gana
function determinarGanador() {
    var puntajeJugador = calcularPuntaje(cartasJugador);
    var puntajeCrupier = calcularPuntaje(cartasCrupier);

    //condicion para ver quien es el ganador
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