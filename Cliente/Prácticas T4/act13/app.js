var tareas = [];

var tareaNueva = document.getElementById('tarea');
var listaTareas = document.getElementById('listaTareas');

function renderizarTareas(array) {
    listaTareas.innerHTML = array.map(tarea => tarea.nombre+" ("+tarea.completada+")"+"<br>").join(" ");
}

function anadir() {
    var tareaNombre = tareaNueva.value;
    tareas.push({ nombre: tareaNombre, completada: "pendiente" });
    renderizarTareas(tareas);
}

function marcarPorNumero() {
    var indice = parseInt(document.getElementById('marcarCompletada').value);
    tareas = tareas.map((tarea, index) => {
        if (index + 1 === indice) {
            tarea.completada = "hecha";
        }
        return tarea;
    });
    renderizarTareas(tareas);
}

function eliminarPorNumero() {
    var indice = parseInt(document.getElementById('eliminarEspecifico').value);
    tareas.splice(indice - 1, 1);
    renderizarTareas(tareas);
}

function mostrarCompletadas() {
    var tareasCompletadas = tareas.filter(tarea => tarea.completada === "hecha");
    renderizarTareas(tareasCompletadas);
}

function mostrarPendientes() {
    var tareasPendientes = tareas.filter(tarea => tarea.completada === "pendiente");
    renderizarTareas(tareasPendientes);
}

function mostrarTodas() {
    renderizarTareas(tareas);
}