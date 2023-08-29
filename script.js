const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const allTasks = document.querySelectorAll("#list-container li")
const activeTasks = document.querySelectorAll("#list-container li:not(.checked)")
const completedTasks = document.querySelectorAll("list-container li.checked")
const clearCompletes = document.getElementById("LimparCompletas")

function addTask(){
    if(inputBox.value === ''){
        alert("Você deve escrever uma tarefa.")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

inputBox.addEventListener('keypress', function(e){
    if(e.which == 13){
       addTask();
    }
 }, false);

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData(){
    localStorage.setItem('data', listContainer.innerHTML)
}



function showAll(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showAll();

const tasks = document.querySelectorAll("#list-container li");

document.querySelector(".content--footer").addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
        event.preventDefault();

        const filter = event.target.getAttribute("data-filter");

        document.querySelectorAll(".content--footer a").forEach(link => {
            link.classList.remove("selected");
        });

        event.target.classList.add("selected");

        tasks.forEach(task => {
            if (filter === "all") {
                task.style.display = "block";
            } else if (filter === "active") {
                task.style.display = task.classList.contains("checked") ? "none" : "block";
            } else if (filter === "completed") {
                task.style.display = task.classList.contains("checked") ? "block" : "none";
            }
        });
    }
});

document.getElementById("LimparCompletas").addEventListener("click", function(event) {
    event.preventDefault();
    tasks.forEach(task => {
        if (task.classList.contains("checked")) {
            task.remove();
        }
    });
});
