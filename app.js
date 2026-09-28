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

function addTask(taskName, category, deadline, status) {
  taskArray.push({
    name: taskName,
    category: category;
    deadline: deadline;
    status: status;
  });
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function loadTasks() {
  let stored = localStorage.getItem("taskArray");
  if (stored) {
    taskArray = JSON.parse(stored);
  }
  checkOverdueTasks();
}

function checkOverdueTasks() {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  taskArray.forEach((task) => {
    if (task.status != "Completed") {
      let deadline = new Date(task.deadline);
      if (deadline < today) {
        task.status = "Overdue";
      }
    }
  });
  saveTasks();
}

function displayList() {
  taskList.innerHTML = "";
  let filteredArray = filterTasks();
  for (let i = 0; i < filteredArray.length; i++) {
    let task = filteredArray[i];
    let listTask = document.createElement("li");
    let taskInfo = document.createElement("span");
    taskInfo.innerText = `${task.name} | Category: ${task.category} | Deadline: ${task.deadline} | Status: ${task.status}`;
    listTask.appendChild(taskInfo);
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
  let category = categoryInput.value;
  let deadline = deadlineInput.value;
  let status = statusInput.value
  addTask(task, category, deadline, status);
  displayList();
  taskInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
  statusInput.value = "In Progress";
});

categoryFilterInput.addEventListener("input", function (e) {
  categoryFilter = e.target.value;
  displayList();
});

statusFilterInput.addEventListener("input", function (e) {
  statusFilter = e.target.value;
  displayList();
});

loadTasks();
displayList();