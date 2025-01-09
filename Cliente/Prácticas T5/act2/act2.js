var caja = document.getElementById('caja');

var x = 100;
var y = 100;

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "w":
            y -= 50;
            break;

        case "a":
            x -= 50;
            break;

        case "s":
            y += 50;
            break;

        case "d":
            x += 50;
            break;

        case "ArrowUp":
            y -= 50;
            break;

        case "ArrowLeft":
            x -= 50;
            break;

        case "ArrowDown":
            y += 50;
            break;

        case "ArrowRight":
            x += 50;
            break;

        case "Numpad8":
            y -= 50;
            break;

        case "Numpad4":
            x -= 50;
            break;

        case "Numpad2":
            y += 50;
            break;

        case "Numpad6":
            x += 50;
            break;

        default:
            return;
    }
    caja.style.top = y + "px";
    caja.style.left = x + "px";
});