var tareas = [];

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

function marcarPorNumero() {
    var indice = parseInt(document.getElementById('marcarCompletada').value);
    tareas[indice].completada = true;
    renderizarTareas();
}

function eliminarPorNumero() {
    var indice = parseInt(document.getElementById('eliminarEspecifico').value);
    tareas.splice(indice, 1);
    renderizarTareas();
}

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

function renderizarTareas() {

}

renderizarTareas();
