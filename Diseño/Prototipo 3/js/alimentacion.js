var carrusel = document.querySelector('.carrusel');
var items = document.querySelectorAll('.item');
var puntos = document.querySelectorAll('.punto');
var prevButton = document.querySelector('.anterior');
var nextButton = document.querySelector('.siguiente');
let index = 0;

function updateCarrusel() {
    var offset = -index * 100;
    carrusel.style.transform = `translateX(${offset}%)`;
    puntos.forEach((punto, i) => {
        punto.classList.toggle('activo', i === index);
    });
}

prevButton.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : items.length - 1;
    updateCarrusel();
});

nextButton.addEventListener('click', () => {
    index = (index < items.length - 1) ? index + 1 : 0;
    updateCarrusel();
});

puntos.forEach((punto, i) => {
    punto.addEventListener('click', () => {
        index = i;
        updateCarrusel();
    });
});