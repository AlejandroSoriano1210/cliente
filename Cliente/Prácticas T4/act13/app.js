var tareas = [];

// Añadir una nueva tarea
function anadir() {
    var tareaInput = document.getElementById('tareaInput');
    var nombreTarea = tareaInput.value.trim();
    if (nombreTarea) {
        tareas.push({ nombre: nombreTarea, completada: false });
        tareaInput.value = '';
        renderizarTareas();
    } else {
        alert("Por favor, escribe una tarea.");
    }
}

// Marcar tarea como completada
document.getElementById('marcarCompletada').addEventListener('change', () => {
    var indice = parseInt(document.getElementById('marcarCompletada').value);
    if (!isNaN(indice) && indice >= 0 && indice < tareas.length) {
        tareas[indice].completada = true;
        renderizarTareas();
    } else {
        alert("Por favor, ingresa un índice válido.");
    }
});

// Eliminar tarea específica
document.getElementById('eliminarEspecifico').addEventListener('change', () => {
    var indice = parseInt(document.getElementById('eliminarEspecifico').value);
    if (!isNaN(indice) && indice >= 0 && indice < tareas.length) {
        tareas.splice(indice, 1);
        renderizarTareas();
    } else {
        alert("Por favor, ingresa un índice válido.");
    }
});

// Mostrar tareas completadas
function mostrarCompletadas() {
    var tareasCompletadas = tareas.filter(tarea => tarea.completada);
    renderizarTareas(tareasCompletadas);
}

// Mostrar tareas pendientes
function mostrarPendientes() {
    var tareasPendientes = tareas.filter(tarea => !tarea.completada);
    renderizarTareas(tareasPendientes);
}

// Renderizar la lista de tareas
function renderizarTareas(filtro = null) {
    var listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';

    var tareasAMostrar = filtro || tareas;
    tareasAMostrar.forEach((tarea, index) => {
        var tareaElemento = document.createElement('div');
        tareaElemento.textContent = `${index}: ${tarea.nombre} - ${tarea.completada ? 'Completada' : 'Pendiente'}`;
        listaTareas.appendChild(tareaElemento);
    });
}

// Renderizar inicialmente la lista de tareas vacía
renderizarTareas();
