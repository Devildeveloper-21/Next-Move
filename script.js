//  Create a to-do list (add, delete, mark complete).

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const addTaskBtn = document.getElementById("addTaskBtn");
const inputTask = document.getElementById("inputTask");
const taskSection = document.querySelector(".taskSection");
const deleteBtn = document.querySelector(".delete-btn");

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskcontainer(text, UID, completedtask) {
  let div = document.createElement("div");
  div.classList.add("task-card");
  div.id = UID;

  let div2 = document.createElement("div");
  div2.classList.add("left");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (completedtask == true) {
    checkbox.checked = completedtask;
    div.classList.add("completed");
  }

  let task = document.createElement("p");
  task.innerText = text;

  let deletebtn = document.createElement("button");
  deletebtn.classList.add("delete-btn");

  let deleteicon = document.createElement("i");
  deleteicon.classList.add("fa-regular", "fa-trash-can");

  div2.appendChild(checkbox);
  div2.appendChild(task);
  deletebtn.appendChild(deleteicon);
  div.appendChild(div2);
  div.appendChild(deletebtn);
  taskSection.appendChild(div);
}

addTaskBtn.addEventListener("click", function () {
  if (inputTask.value === "") {
    return alert("Enter task");
  } else {
    let id = Date.now();

    const task = {
      identity: id,
      text: inputTask.value,
      mark: false,
    };

    tasks.push(task);
    saveToLocalStorage();
    createTaskcontainer(task.text, task.identity, false);
    inputTask.value = "";
  }
});

window.onload = loadTaskcards;
function loadTaskcards() {
  tasks.forEach((element) => {
    createTaskcontainer(element.text, element.identity, element.mark);
  });
}

taskSection.addEventListener("click", function (e) {
  let getidToMarkChecked = e.target.closest(".task-card").id;

  if (e.target.type === "checkbox") {
    if (e.target.checked) {
      e.target.closest(".task-card").classList.add("completed");
    } else {
      e.target.closest(".task-card").classList.remove("completed");
    }

    for (const key in tasks) {
      if (tasks[key].identity == getidToMarkChecked) {
        tasks[key].mark = e.target.checked;
      }
    }
  }

  saveToLocalStorage();
});

taskSection.addEventListener("click", function (e) {
  if (e.target.closest(".delete-btn")) {
    let getidtoRemove = e.target.closest(".task-card").id;

    e.target.closest(".task-card").remove();

    for (const key in tasks) {
      if (getidtoRemove == tasks[key].identity) {
        tasks.splice(key, 1);
      }
    }

    saveToLocalStorage();
  }
});
