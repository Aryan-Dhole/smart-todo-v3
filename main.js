const taskInput = document.getElementById('input')
const addbtn = document.getElementById('addbtn')
const TaskList = document.getElementById('TaskList')

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function renderTask() {
    TaskList.innerHTML = "";

    tasks.forEach((taskObj, index) => {
        const li = document.createElement('li')
        li.innerHTML = `<span>${taskObj.task}</span>
            <span class="text-muted" style="font-size: 0.8em; margin-left: 8px;">
            (${taskObj.time})
            </span>
            <button class="btn btn-sm btn-outline-primary ms-2" onclick="editTask(${index})">Edit</button>
            <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteTask(${index})">Delete</button>
            `;

        TaskList.appendChild(li)
    })
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].task);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].task = newTask.trim();
        tasks[index].time = new Date().toLocaleString(); // Optional: update time
        saveTasks();
        renderTask();
    }
}



function deleteTask(index) {
    tasks.splice(index, 1)
    saveTasks()
    renderTask()
}

addbtn.addEventListener("click", () => {
    const task = taskInput.value.trim()

    if (task !== "") {
        const taskObj = {
            task: task,
            time: new Date().toLocaleString()
        };
        tasks.push(taskObj)
        saveTasks()
        renderTask()
        taskInput.value = "";
    }
}
)

renderTask();


