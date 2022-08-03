
let addNewTodoBtn = document.getElementById("addNewTodoBtn");
let newTodoTxt = document.getElementById("newTodoTxt");
let todoPending = document.getElementById("todoPending");
let todoCompleted = document.getElementById("todoCompleted");
let editTask = document.querySelectorAll(".edit");
let complete = document.querySelectorAll(".complete");
let editInput = document.getElementsByClassName("editInput");
let saveEdit = document.getElementsByClassName("saveEdit");
let taskText = document.getElementsByClassName("taskText");
let pendingHeading = document.getElementById("pendingHeading");
let completedHeading = document.getElementById("completedHeading");
let taskControls = document.getElementsByClassName("taskControls");
let taskDescription = document.getElementsByClassName("taskDescription");
let counttxt = document.getElementById("counttxt");
let clearAll = document.getElementById("clearAll");
let nulltask = document.getElementsByClassName("null");

show();
showPendingPage();

// adding items to pending task

addNewTodoBtn.addEventListener("click", function () {
    let task = localStorage.getItem("Tasks");
    if (task == null) {
        taskObj = {
            pendingTasks: [],
            completeTasks: []
        }
    }
    else {
        taskObj = JSON.parse(task);
    }
    if (newTodoTxt.value != "") {
        taskObj.pendingTasks.push(newTodoTxt.value);
    }
    else {
        return null;
    }
    newTodoTxt.value = "";
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    show();
    showPendingPage();
});

// Show Todo
function show() {
    let nullPending = document.getElementById("nullPending");
    let nullCompleted = document.getElementById("nullCompleted");
    let task = localStorage.getItem("Tasks");
    if (task == null) {
        taskObj = {
            pendingTasks: [],
            completeTasks: []
        }
        Array.from(nulltask).forEach(function (item, index) {
            nulltask[index].style.display = "block";
            nullPending.style.display = "none";
            nullCompleted.style.display = "none";
        })

    }
    else {
        taskObj = JSON.parse(task);
        Array.from(nulltask).forEach(function (item, index) {
            nulltask[index].style.display = "none";
        });

        if (taskObj.pendingTasks == []) {
            nullPending.style.display = "block";
            nullCompleted.style.display = "none";
        }
        else if (taskObj.completeTasks == []) {
            nullPending.style.display = "none";
            nullCompleted.style.display = "block";
        }
        else if (taskObj.completeTasks == [] && taskObj.pendingTasks == []) {
            nullPending.style.display = "block";
            nullCompleted.style.display = "block";
        }
        // showing pending tasks
        let pending = `` //for adding the tasks added in pending
        if (taskObj.pendingTasks.length == 0) {
            pending = `No pending tasks left!`
        } else { 
            for (let index = 0; index < taskObj.pendingTasks.length; index++) {
                // console.log(index);
                pending += `<div class="task">
                            <div class="taskDescription"><div class="taskText">${taskObj.pendingTasks[index]}</div><input type="text" class="editInput"><button class="saveEdit" onclick="saveEditBtn(${index})">Save</button></div>
                            <div class="taskControls">
                                <button class="edit" onclick="edit(${index})"><i class="fa-solid fa-pencil"></i></button>
                                <button class="complete" onclick="sendToComplete(${index})"><i class="fa-solid fa-check"></i></button>
                            </div>
                        </div>`;
            }
        }
        todoPending.innerHTML = pending;

        // showing completed Tasks

        let complete = "";
        if (taskObj.completeTasks.length == 0) {
            complete = `All tasks are pending`
        } else { 
            for (let index1 = 0; index1 < taskObj.completeTasks.length; index1++) {
                // console.log(index);
                complete += `<div class="task">
                            <div class="taskDescription">${taskObj.completeTasks[index1]}</div>
                            <div class="taskControls">
                                <button class="delete" onclick="Delete(${index1})"><i class="fa-solid fa-trash"></i></button>
                                <button class="completed"><i class="fa-solid fa-check"></i></button>
                            </div>
                        </div>`;
            }
        }
        todoCompleted.innerHTML = complete;
    }
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    console.log(localStorage);
}

// Editing Task
function edit(index) {
    taskControls[index].style.display = "none"
    editInput[index].style.display = "block";
    editInput[index].style.width = "400px";
    taskText[index].style.display = "none";
    saveEdit[index].style.display = "block";
    editInput[index].value = `${taskObj.pendingTasks[index]}`;

}
function saveEditBtn(index) {
    console.log(editInput[index].value);
    taskObj.pendingTasks[index] = editInput[index].value;
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    editInput[index].style.display = "none";
    taskText[index].style.display = "block";
    saveEdit[index].style.display = "none";
    show();
}


function showPendingPage() {
    todoPending.classList.add("active");
    todoCompleted.classList.remove("active");
    pendingHeading.classList.add("show");
    completedHeading.classList.remove("show");
    clearAll.style.display = "none";
    counttxt.innerHTML = `There are ${taskObj.pendingTasks.length} tasks pending!`;
}
function showCompletedCount() {
    todoPending.classList.remove("active");
    todoCompleted.classList.add("active");
    pendingHeading.classList.remove("show");
    completedHeading.classList.add("show");
    clearAll.style.display = "block";
    counttxt.innerHTML = `${taskObj.completeTasks.length} tasks are completed out of ${taskObj.completeTasks.length + taskObj.pendingTasks.length}`;
}

// sending Tasks from pending to completed
function sendToComplete(index) {
    let targetObj = taskObj.pendingTasks[index]
    taskObj.pendingTasks.splice(index, 1);
    taskObj.completeTasks.push(targetObj);
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    showPendingPage();
    showCompletedCount();
    show();
}

function Delete(index) {
    let taskObj = JSON.parse(localStorage.getItem("Tasks"));
    taskObj.completeTasks.splice(index, 1);
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    showCompletedCount();
    show();
};

function clearall() {
    let task = localStorage.getItem("Tasks");
    if (task == null) {
        taskObj = {
            pendingTasks: [],
            completeTasks: []
        }
    }
    else {
        taskObj = JSON.parse(task);
        taskObj.completeTasks.splice(0, taskObj.completeTasks.length);
    }
    localStorage.setItem("Tasks", JSON.stringify(taskObj));
    showCompletedCount();
    show();
}

clearAll.addEventListener("click", clearall)
pendingHeading.addEventListener("click", showPendingPage);

completedHeading.addEventListener("click", showCompletedCount);