const palos = ['♠', '♥', '♦', '♣'];
const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const mazo = [];

palos.forEach(palo => {
    valores.forEach(valor => {
        mazo.push({ valor, palo });
    });
});

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