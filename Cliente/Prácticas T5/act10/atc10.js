document.getElementById('enviar').addEventListener('click', function () {    
    
    var nombre = document.getElementById('nombre').value;

    var mensaje = document.getElementById('mensaje').value;

    var radio  = document.getElementsByName('color');
    var color;

    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            color =  radio[i].value;
            break;
        }
    }

    var asignatura = document.getElementById('asignatura').value;
    var profesor = '';
    
    switch(asignatura){
        case "matematicas":
            profesor = "Manuel";
            break;
        case "lengua":
            profesor = "Mariano";
            break;
        case "religion":
            profesor = "Madre Eva";
            break;
        case "plastica":
            profesor = "Juan Manuel";
            break;
        case "efisica":
            profesor = "Antonio";
            break;
    }

    var checkbox = document.getElementsByClassName('dia');
    var diaDisponible = [];

    for (var j = 0; j < checkbox.length; j++) {
        if (checkbox[j].checked) {
            diaDisponible.push(checkbox[j].name);
        }
    }

    var diaPreferente = document.getElementById('preferente').value;

    window.open(`resultado.html?nombre=${nombre}&mensaje=${mensaje}&color=${color}&asignatura=${asignatura}&diaDisponible=${diaDisponible.join(',')}&diaPreferente=${diaPreferente}&profesor=${profesor}`);

});

function google() {
    window.location.href = "https://www.google.com/?hl=es";
}