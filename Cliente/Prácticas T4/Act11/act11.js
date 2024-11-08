// Función principal que maneja la operación seleccionada
var calcular = () => {
    var numerosInput = document.getElementById('numero').value;
    var operacion = document.getElementById('operacion').value;

    var numbers = numerosInput.split(',').map(num => parseFloat(num.trim()));

    let result;

    switch (operacion) {
        case 'suma':
            result = calcularSuma(...numbers);
            break;
        case 'resta':
            result = calcularResta(...numbers);
            break;
        case 'multiplica':
            result = calcularMult(...numbers);
            break;
        case 'divide':
            result = calcularDiv(...numbers);
            break;
        default:
            result = 'Operación no válida';
    }

    document.getElementById('result').textContent = `Resultado: ${result}`;
};

var calcularSuma = (...args) => {
    let total = 0;
    for (let i = 0; i < args.length; i++) {
        total += args[i];
    }
    return total;
};

var calcularResta = (...args) => {
    let total = args[0];
    for (let i = 1; i < args.length; i++) {
        total -= args[i];
    }
    return total;
};

var calcularMult = (...args) => {
    let total = 1;
    for (let i = 0; i < args.length; i++) {
        total *= args[i];
    }
    return total;
};

var calcularDiv = (...args) => {
    let total = args[0];
    for (let i = 1; i < args.length; i++) {
        total /= args[i];
    }
    return total;
};
