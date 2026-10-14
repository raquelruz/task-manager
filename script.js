const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const filterButtons = document.querySelectorAll("[data-filter]");

let currentFilter = "all";

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        applyTaskFilter();
    });
});

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const taskTitle = taskInput.value.trim();

	if (taskTitle === "") {
		return;
	}

	const taskItem = document.createElement("li");

    taskItem.dataset.completed = "false";

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
            taskItem.dataset.completed = "true";
		} else {
			taskText.classList.remove("completed");
            taskItem.dataset.completed = "false";
		}
	});

	taskItem.append(taskCheckbox, taskText, deleteButton);
	taskList.append(taskItem);

	taskInput.value = "";
});

const applyTaskFilter = () => {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach((task) => {
        const isCompleted = task.dataset.completed === "true";

        if (currentFilter === "all") {
            task.style.display = "flex";
        } else if (currentFilter === "pending") {
            if (isCompleted) {
                task.style.display = "none";
            } else {
                task.style.display = "flex";
            }
        } else if (currentFilter === "completed") {
            if (isCompleted) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        }
    });
}