document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const modeToggle = document.getElementById("mode-toggle");

 
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.done));

  
  addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
      addTaskToDOM(taskText, false);
      saveTask(taskText, false);
      input.value = "";
    }
  });

  
  function addTaskToDOM(text, done) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = done;

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task");
    if (done) span.classList.add("done");

    checkbox.addEventListener("change", () => {
      span.classList.toggle("done");
      updateStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      updateStorage();
    });

    const taskBox = document.createElement("div");
    taskBox.style.display = "flex";
    taskBox.style.alignItems = "center";
    taskBox.style.flex = "1";
    taskBox.appendChild(checkbox);
    taskBox.appendChild(span);

    li.appendChild(taskBox);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  
  function saveTask(text, done) {
    tasks.push({ text, done });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  
  function updateStorage() {
    const updatedTasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
      const checkbox = li.querySelector("input[type='checkbox']");
      const span = li.querySelector("span");
      updatedTasks.push({
        text: span.textContent,
        done: checkbox.checked
      });
    });
    tasks = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
