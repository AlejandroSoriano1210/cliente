function crearMazo() {
    const palos = ['♠', '♥', '♦', '♣'];
    const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const baraja = [];
    
    palos.forEach(palo => {
        valores.forEach(valor => {
            baraja.push({ valor, palo });
        });
    });

    return baraja;
}

var mazo = [];

function generarCarta() {
    const indiceAleatorio = Math.floor(Math.random() * mazo.length);
    const carta = mazo[indiceAleatorio];
    
    mazo.splice(indiceAleatorio, 1);
    
    return carta;
}

function mostrarCartas(zona, cartas) {
    const contenedor = document.getElementById(zona);
    contenedor.innerHTML = '';

    cartas.forEach(carta => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.innerHTML = carta.valor + carta.palo;
        contenedor.appendChild(divCarta);
    });
}