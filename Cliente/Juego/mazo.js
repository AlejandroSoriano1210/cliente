const palos = ['♠', '♥', '♦', '♣'];
const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function generarCarta() {
    const palo = palos[Math.floor(Math.random() * palos.length)];
    const valor = valores[Math.floor(Math.random() * valores.length)];
    return { valor, palo };  // Retornamos un objeto con el valor y el palo
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