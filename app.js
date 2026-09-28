let taskList = document.getElementById("taskList");
let addTaskForm = document.getElementById("addTaskForm");

let taskInput = document.getElementById("taskInput");
let categoryInput = document.getElementById("categoryInput");
let deadlineInput = document.getElementById("deadlineInput");
let statusInput = document.getElementById("statusInput");
let addTaskButton = document.getElementById("addTaskButton");

let categoryFilterInput = document.getElementById("categoryFilter");
let statusFilterInput = document.getElementById("statusFilter");

let taskArray = [];
let categoryFilter = "";
let statusFilter = "";

function addTask(taskName) {
  taskArray.push({
    name: taskName,
  });
}

function displayList() {
  taskList.innerHTML = "";
  let filteredArray = filterTasks(categoryFilter);
  for (let i = 0; i < filteredArray.length; i++) {
    let listTask = document.createElement("li");
    listTask.innerText = filteredArray[i].name
    taskList.appendChild(listTask);
  }
}

function filterTasks(searchTerm) {
  let filteredArray = taskArray.filter((task) => {
    return task.name.includes(searchTerm);
  });
  return filteredArray;
}

addTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let task = taskInput.value;
  addTask(task);
  displayList();
  taskInput.value = "";
});

categoryFilterInput.addEventListener("input", function (e) {
  categoryFilter = e.target.value;
  displayList();
});

statusFilterInput.addEventListener("input", function (e) {
  statusFilter = e.target.value;
  displayList();
});