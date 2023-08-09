const input = document.querySelector(".agregar input");
const listaTarea = document.querySelector(".lul");
let btnadd = document.querySelector("#btnañadir");
let btnremove = document.querySelector("#remover");
let tareas = [];

btnadd.onclick = function () {
    agregarTarea();
}

btnremove.onclick = function () {
    deleteAll();
}

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded", () => {
    tareas = JSON.parse(localStorage.getItem("tareas"));
    crearhtml();
    });

    listaTarea.addEventListener("click", deleteTask);
}

function deleteTask(e){
    if (e.target.tagName == "SPAN"){
        const deleteId = parseInt(e.target.getAttribute("tarea-id"));
        tareas = tareas.filter(tarea => tarea.id !== deleteId);
        crearhtml();
    }
}

function agregarTarea() {
    const tarea = input.value;
    if (tarea === "") {
        alert("Tienes que escribir la tarea");
        return
    }

    const tareaObj = {
        tarea: tarea,
        id: Date.now()
    }
    tareas = [...tareas, tareaObj]

    crearhtml();

    input.value = "";

}

function crearhtml() {
    clearhtml();

    tareas.forEach(tarea => {
        if (tareas.length > 0) {
            const li = document.createElement("li");
            li.innerHTML = `${tarea.tarea}<span tarea-id="${tarea.id}">X</span>`

            listaTarea.appendChild(li);
        }
    })

    guardarStorage();
}

function guardarStorage(){
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function clearhtml(){
    listaTarea.innerHTML = "";
}

function deleteAll(){
    tareas = [];
    crearhtml();
}