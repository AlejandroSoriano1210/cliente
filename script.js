let index = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.carrusel-item');
  const totalSlides = slides.length;

  index = (index + step + totalSlides) % totalSlides;

  const offset = -index * 100;
  document.querySelector('.carrusel-contenido').style.transform = `translateX(${offset}%)`;
}
