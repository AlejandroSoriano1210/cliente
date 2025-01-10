document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    
    document.getElementById('mensaje').textContent = 'Click derecho deshabilitado'
});