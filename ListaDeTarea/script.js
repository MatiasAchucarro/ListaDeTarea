const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const enter = document.querySelector("#enter");
const check = "fa-circle-check";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

//Fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-AR", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

//FUNCION AGREGAR TAREA

const agregarTarea = (tarea, id, realizado, eliminado) => {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";
  const elemento = ` <li id="elemento"> 
                 <i class="fa-sharp fa-regular ${REALIZADO}" data="realizado"id="${id}"></i>  
                  <p class="text ${LINE}" > ${tarea} </p> 
                 <i class="fa-sharp fa-solid fa-trash" data="eliminado" id="${id}"></i>
                    </li>`;
  lista.insertAdjacentHTML("beforeend", elemento);
};

//Fucion de tarea Realizada
const tareRealizada = (element) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  console.log(LIST);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
  console.log(LIST[element.id]);
  console.log(LIST[element.id].realizado);
};

//funcion de tarea eliminar

const tareaEliminada = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
};

enter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  id++;
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

lista.addEventListener("click", (event) => {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "realizado") {
    tareRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//local Storage get item

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}
function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
