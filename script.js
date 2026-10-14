const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const taskTitle = taskInput.value.trim();

	if (taskTitle === "") {
		return;
	}

	const taskItem = document.createElement("li");

	const taskCheckbox = document.createElement("input");
	taskCheckbox.type = "checkbox";

	const taskText = document.createElement("span");
	taskText.textContent = taskTitle;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
        taskItem.remove();
    })

	taskCheckbox.addEventListener("change", () => {
		if (taskCheckbox.checked) {
			taskText.classList.add("completed");
		} else {
			taskText.classList.remove("completed");
		}
	});

	taskItem.append(taskCheckbox, taskText, deleteButton);
	taskList.append(taskItem);

	taskInput.value = "";
});
