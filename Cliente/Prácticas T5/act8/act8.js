document.getElementById('enviar').addEventListener('submit', function () {    
    var nombre = document.getElementById('nombre').value;
    
    document.write(nombre);

    var radio  = document.getElementsByName('color');
    var color;

    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            color =  radio[i].value;
            break;
        }
    }

    var asignatura = document.getElementById('asignatura').value;

    var checkbox = document.getElementsByClassName('dia');
    var diaDisponible;

    // for (var j = 0; j < checkbox.length; j++) {
    //     if (checkbox[j].checked) {
    //         color =  checkbox[j].value;
    //         break;
    //     }
    // }

});

function google() {
    window.location.href = "https://www.google.com/?hl=es"
}