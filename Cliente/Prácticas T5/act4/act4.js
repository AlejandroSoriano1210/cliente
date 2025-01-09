var mensaje = document.getElementById('mensaje')

document.addEventListener('mousedown', function() {
    mensaje.style.backgroundColor = '#FFFF00';
})

document.addEventListener('mousemove', function() {
    mensaje.style.backgroundColor = '#FFFFFF'
})

document.addEventListener('keydown', function() {
    mensaje.style.backgroundColor = '#CCE6FF'
})