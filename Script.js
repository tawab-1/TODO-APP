const userInput = document.getElementById('userinput'),
    dueDate = document.getElementById('DueDate'),
    addBtn = document.getElementById('addbtn'),
    taskbox = document.getElementById('task-box'),
    presentMoment = new Date();

//gettting local storage todo-list
let todos = JSON.parse(localStorage.getItem('todo-list'));
let isEditable = false;
let editId;



addBtn.addEventListener('click', () => {
    let userTask = userInput.value;
    let [time, date] = dueDate.value.split("T");


    if (userTask && time && date) {
        //If is not editable is not true
        if (!isEditable) {
            //If todos not exist pass an empty array to todos
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, date: `${time} ${date}`, status: "pending" };
            todos.push(taskInfo);
        } else {
            todos[editId].name = userTask;
            todos[editId].date = `${time} ${date}`
        }
    }
    userInput.value = "";
    date = "";
    time = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoList();
    document.location.reload();
})

//Step 2
function showTodoList() {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `
            <li id="tasks-list"";
                        class="list-group-item col-12 col-md-8 shadow border-0 d-flex align-items-center p-3 p-md-0 fs-4 rounded my-1">
                        <label id="${id}" for="" class="user-text ms-3 d-flex justify-content-between w-100 me-3">
                        <div>    
                        <input onclick="updateStatus(this)" class="m-2 ms-3" type="checkbox"
                                id="${id}" ${isCompleted}>
                                <span style="overflow-wrap: break-word; max-width: 500px;" class="${isCompleted}">${todo.name}</span>
                        </div>
                        ${presentMoment - new Date(todo.date) <= 0 ? `<span style="overflow-wrap: break-word; max-width:   325px; color: green;">${todo.date}</span>` : `<span style="overflow-wrap: break-word; max-width: 325px; color: red">${todo.date}</span>`}
                        </label>
                    </li>
                    <li id="action-buttons"
                        class="list-group-item col-12 col-md-3 d-flex gap-1 my-1 justify-content-between border-0">
                        <button onclick='editTask(${id},"${todo.name}","${todo.date}")' class="btn btn-primary w-75 fs-3 p-2"><i class="bi bi-pencil-square"></i>
                        </button>
                        <button onclick="deleteTask(${id})" id="" class="btn btn-danger w-75 fs-3 p-2"><i
                                class="bi bi-trash"></i></button>
                    </li>

        `;
        })
    }
    //if li is not empty insert this value into taskbox else insert span
    taskbox.innerHTML = li || `<p class="border border-1 rounded shadow ps-3 p-2 fs-3">No task added yet!</p>`;
}
showTodoList();


//Checked and Unchecked
function updateStatus(selectedTask) {
    let taskText = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskText.classList.add("checked");
        todos[selectedTask.id].status = "completed"
    } else {
        taskText.classList.remove("checked");
        todos[selectedTask.id].status = "pending"

    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}


//Edit Task
function editTask(taskId, taskName, taskDate) {
    //Get taskId from and store it on edit task variable
    editId = taskId;
    //Set isEditable value to true by clicking on edit button
    isEditable = true;
    //show the taskName on the userInput 
    userInput.value = taskName;
    dueDate.value = taskDate;
    //also focus of cursor on the input
    userInput.focus();
}

//Delete Task
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoList();
}


