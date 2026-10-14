const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = taskInput.value.trim();

    const taskItem = document.createElement("li");
    taskItem.textContent = taskTitle;

    taskList.append(taskItem);
})