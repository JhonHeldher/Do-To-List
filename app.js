
const localStorageKey = 'to-do-list-gn'

//Switch thema dark
const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
const body = document.querySelector('body');

toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }    
});

function validateExistsTask(){
	let values =  JSON.parse(localStorage.getItem(localStorageKey) || "[]")
	let inputValue = document.getElementById('input-new-task').value
	let exists = values.find(x => x.name == inputValue)
	return !exists ? false : true
}

function newTask() {
  let input = document.getElementById('input-new-task');
  input.style.border = '1px solid red';

  // validação
  if (!input.value) {
    input.style.border = '3px solid red';
    alert('Digite algo para inserir em sua lista');
  } else if (validateExistsTask()) {
    alert('Já existe uma task com essa descrição');
  } else {
    // incremente to localstorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
  input.value = '';
}

function showValues(){
	let values =  JSON.parse(localStorage.getItem(localStorageKey) || "[]")
	let list = document.getElementById('to-do-list')
	list.innerHTML = ''
	for(let i = 0; i < values.length; i++){
		list.innerHTML += `<li>${values[i]['name']}<button id='btn-edit' onclick='editItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
		<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
		<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
	  </svg></button><button id='btn-excluir' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
		<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
		<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
	  </svg></button></li>`
	}

}

function editItem(data){
	let values =  JSON.parse(localStorage.getItem(localStorageKey) || "[]")
	let index = values.findIndex(x => x.name == data)
	let newTaskName = prompt('Digite o novo nome da task:')

	values[index].name = newTaskName
	localStorage.setItem(localStorageKey, JSON.stringify(values))
	showValues()
}

function removeItem(data){
	let values =  JSON.parse(localStorage.getItem(localStorageKey) || "[]")
	let index = values.findIndex(x => x.name == data)
	values.splice(index,1)
	localStorage.setItem(localStorageKey,JSON.stringify(values))
	showValues()
}

showValues()

/*

//Switch thema dark
const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
const body = document.querySelector('body');

toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }    
});

function addTask() {
  const taskTitleInput = document.getElementById("text");
  const text = text.value;
  if (title.trim() !== "") {
    const taskTimeInput = document.getElementById("task-date");
    const time = taskTimeInput.value;
    tasks.push({text: task, time: time});
    taskTitleInput.value = "";
    taskTimeInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

//edite task
function updateTask(index, addTask) {
  tasks[index] = addTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

//delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}



function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    li.innerHTML = task.text;
    const editButton = document.createElement("button");
    editButton.innerHTML = "Editar";
    editButton.onclick = function() {
      const newTask = prompt("Editar tarefa", task.text);
      if (newTask !== null) {
        updateTask(i, addTask, newTime);
      }
    };
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.onclick = function() {
      deleteTask(i);
    };
    li.appendChild(title);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
}

*/

