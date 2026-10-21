let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let tasksData = JSON.parse(localStorage.getItem("tasks")) || [];
tasksData.forEach((tData) => {
  renderTask(tData);
});

// Add Tasks

add.addEventListener("click", function () {
  let text = input.value.trim();
  if (text === "") {
    return;
  }
  let taskData = {
    text: text,
    completed: false,
  };
  tasksData.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(tasksData));
  renderTask(taskData);
  input.value = "";
});

// Add With Enter Key

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    add.click();
  }
});

// Delete Tasks

tasks.addEventListener("click", function (e) {
  let button = e.target.closest("button");
  if (!button) {
    return;
  }

  let task = button.closest(".task");
  let taskIndex = Array.from(tasks.children).indexOf(task);

  if (taskIndex === -1) {
    return;
  }

  if (button.classList.contains("delete-btn")) {
    tasksData.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    task.remove();
    return;
  }


  // Complete Tasks

  if (button.classList.contains("complete-btn")) {
    tasksData[taskIndex].completed = !tasksData[taskIndex].completed;
    task.classList.toggle("completed", tasksData[taskIndex].completed);
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }
});

function renderTask(tData) {
  let task = document.createElement("div");
  let taskText = document.createElement("span");
  let deleteBtn = document.createElement("button");
  task.classList.add("task");
  if (tData.completed) {
    task.classList.add("completed");
  }
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  taskText.textContent = tData.text;
  task.appendChild(deleteBtn);
  task.appendChild(taskText);
  tasks.appendChild(task);

  // Compelete

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "Complete";
  task.appendChild(completeBtn);
}

// Delete With Back Space Key

document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    let target = e.target;
    if (
      tasksData.length === 0 ||
      target.matches("input, textarea, [contenteditable='true']")
    ) {
      return;
    }
    e.preventDefault();
    tasksData.pop();
    tasks.lastElementChild.remove();
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }
});
