const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

console.log(taskForm);
console.log(taskInput);
console.log(taskList);

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulario enviado")
})