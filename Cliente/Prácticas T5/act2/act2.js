var caja = document.getElementById('caja');

var x = 100;
var y = 100;

document.onkeydown = function(event) {
    switch(event.key) {
        case "w":
            y -= 20;
            break;

        case "a":
            x -= 20;
            break;

        case "s":
            y += 20;
            break;

        case "d":
            x += 20;
            break;

        default:
            return;
    }
    caja.style.top = y + "px";
    caja.style.left = x +  "px";
};