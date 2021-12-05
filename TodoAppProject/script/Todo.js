const input = document.querySelector("input");
const addbtn = document.querySelector(".add");
const clearbtn = document.querySelector(".clear");
const todoList = document.querySelector(".todoList");
const pendingTag = document.querySelector(".pendingTasks");

let taskList = [];
let pendingTaskList = 0;
let  newLiElement = "";

addbtn.addEventListener("click",() => addTask());
clearbtn.addEventListener("click",() => clearTask());
window.addEventListener("load",() => showTask());


function addTask(){
    let newtask = input.value;
    if(newtask != ""){
        taskList.push(newtask);
        localStorage.setItem("TodoList",JSON.stringify(taskList));
        pendingTaskList++;
        localStorage.setItem("pendingcount",JSON.stringify(pendingTaskList));
        pendingTag.textContent = pendingTaskList;
        showTask();
    }else{
        alert("Please Enter Text...");
    }
    input.value = "";
}

function showTask(){
        if(localStorage.getItem("TodoList") == null){
            return;
        }
        newLiElement = "";
        console.log(JSON.parse(localStorage.getItem("pendingcount")));
        taskList = JSON.parse(localStorage.getItem("TodoList"));
        taskList.forEach((list,index) => {
            newLiElement += (`<li>${list} <span class="icon"><i onclick=deleteTask(${index}) class='fas fa-trash'></i></span></li>`);
        });
        pendingTag.textContent = JSON.parse(localStorage.getItem("pendingcount"));
        todoList.innerHTML = newLiElement;
}

function deleteTask(index){
    taskList.splice(index,1);
    localStorage.setItem("TodoList",JSON.stringify(taskList));
    pendingTaskList = JSON.parse(localStorage.getItem("pendingcount"));
    pendingTaskList--;
    localStorage.setItem("pendingcount",JSON.stringify(pendingTaskList));
    pendingTag.textContent = pendingTaskList;
    if(taskList.length == 0){
        clearTask();
    }
    showTask();
}

function clearTask(){
    taskList = []
    localStorage.clear();
    todoList.innerHTML = "";
    pendingTaskList = 0;
    pendingTag.textContent = pendingTaskList;
}