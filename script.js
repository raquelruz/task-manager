const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks !== null) {
	tasks = JSON.parse(savedTasks);
}

let currentFilter = "all";

const saveTasks = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		currentFilter = button.dataset.filter;

		filterButtons.forEach((filterButton) => {
			filterButton.classList.remove("active");
		});

		button.classList.add("active");

		applyTaskFilter();
	});
});

document.querySelector('[data-filter="all"]').classList.add("active");

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const taskTitle = taskInput.value.trim();

	if (taskTitle === "") {
		return;
	}

	const newTask = {
		title: taskTitle,
		completed: false,
	};

	tasks.push(newTask);
	saveTasks();

	renderTask(newTask);

	taskInput.value = "";

	applyTaskFilter();
});

const renderTask = (task) => {
	const taskItem = document.createElement("li");

	taskItem.dataset.completed = String(task.completed);

	const taskCheckbox = document.createElement("input");
	taskCheckbox.type = "checkbox";
	taskCheckbox.checked = task.completed;

	const taskText = document.createElement("span");
	taskText.textContent = task.title;

	if (task.completed) {
		taskText.classList.add("completed");
	}

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Eliminar";
	deleteButton.type = "button";

	taskCheckbox.addEventListener("change", () => {
		task.completed = taskCheckbox.checked;

		taskText.classList.toggle("completed", task.completed);
		taskItem.dataset.completed = String(task.completed);

		saveTasks();
		applyTaskFilter();
	});

	deleteButton.addEventListener("click", () => {
		taskItem.remove();

		tasks = tasks.filter((item) => item !== task);

		saveTasks();
	});

	taskItem.append(taskCheckbox, taskText, deleteButton);
	taskList.append(taskItem);
};

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
};

tasks.forEach((task) => {
	renderTask(task);
});

applyTaskFilter();
