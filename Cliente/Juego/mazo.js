//funcion para crear baraja de 52 cartas
function crearMazo() {
    const palos = ['♠', '♥', '♦', '♣'];
    const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const baraja = [];
    
    //ciclos que recorren cada array, cada iteración crea un objeto "carta" con las propiedades valor y palo que se agrega al array baraja
    palos.forEach(palo => {
        valores.forEach(valor => {
            baraja.push({ valor, palo });
        });
    });

    //devuelve la baraja con 52 cartas
    return baraja;
}

var mazo = [];

//funcion para "sacar" una carta del mazo
function generarCarta() {
    //indice que selecciona que carta sacar
    const indiceAleatorio = Math.floor(Math.random() * mazo.length);
    const carta = mazo[indiceAleatorio];
    
    mazo.splice(indiceAleatorio, 1);
    
    //devuelve la carta para confirmar que sale del mazo y trabajar con ella
    return carta;
}