let liElements = document.getElementsByTagName('li');

for (let i = 0; i < liElements.length; i++) {
    let deleteSpan = document.createElement('span');
    let deleteText = document.createTextNode('\u00D7');
    let editSpan = document.createElement('span');
    let editText = document.createTextNode('\u270E');

    deleteSpan.className = 'close';
    deleteSpan.appendChild(deleteText);
    editSpan.className = 'edit';
    editSpan.appendChild(editText);

    liElements[i].appendChild(deleteSpan);
    liElements[i].appendChild(editSpan);
    enableChecking(liElements[i]);
}

let deleteTaskElements = document.getElementsByClassName('close');

for (let i = 0; i < deleteTaskElements.length; i++) {
    deleteTaskElements[i].onclick = function() {
        this.parentElement.style.display = 'none';
    }
}

let editTaskElements = document.getElementsByClassName('edit');

for (let i = 0; i < editTaskElements.length; i++) {
    editTaskElements[i].onclick = () => editTask(editTaskElements[i]);
}


function enableChecking(liElement) {
    liElement.onclick = function() {
        liElement.classList.toggle('checked');
    }
}
// let ulElement = document.querySelector('ul');

// ulElement.addEventListener('click', function(event) {
//     if (event.target.tagName === 'LI') {
//         event.target.classList.toggle('checked');
//     }
// });

function addTask() {
    const ulElement = document.querySelector('ul');
    let inputBox = document.getElementById('task-input');
    
    if (!inputBox.value) {
        alert('Вы не указали задачу!');
        return;
    }
    
    const liElement = document.createElement('li');
    const deleteSpan = document.createElement('span');
    const deleteText = document.createTextNode('\u00D7');
    const editSpan = document.createElement('span');
    const editText = document.createTextNode('\u270E');
    const taskNameSpan = document.createElement('span');
    const taskName = document.createTextNode(inputBox.value);

    deleteSpan.className = 'close';
    deleteSpan.appendChild(deleteText);
    deleteSpan.onclick = function() {
        this.parentElement.style.display = 'none';
    };

    editSpan.className = 'edit';
    editSpan.appendChild(editText);
    editSpan.onclick = () => editTask(editSpan);

    taskNameSpan.className = 'task-name';
    taskNameSpan.appendChild(taskName);

    liElement.appendChild(deleteSpan);
    liElement.appendChild(editSpan);
    liElement.appendChild(taskNameSpan);
    enableChecking(liElement);
    
    ulElement.appendChild(liElement);

    inputBox.value = '';
}

function editTask(editSpan) {
    const liElement = editSpan.closest('li');
    const textSpan = liElement.querySelector('.task-name');
    
    const approveTaskName = document.createElement('span');
    const approveTaskNameText = document.createTextNode('\u2713');
    const inputBox = document.createElement('input');
    
    approveTaskName.className = 'approve-task-name';
    approveTaskName.appendChild(approveTaskNameText);
    approveTaskName.onclick = () => editTaskName(approveTaskName, inputBox);
    
    inputBox.className = 'rename-task-input'
    inputBox.placeholder = 'Edit...';
    inputBox.value = textSpan.textContent;

    textSpan.replaceWith(inputBox);
    editSpan.replaceWith(approveTaskName);
}

function editTaskName(approveTaskName, inputElement) {
    let inputText = inputElement.value;

    if (!inputText) {
        alert('Введите новое название задачи!');
        return;
    }

    const taskNameSpan = document.createElement('span');
    const taskName = document.createTextNode(inputText);
    const editSpan = document.createElement('span');
    const editText = document.createTextNode('\u270E');

    taskNameSpan.className = 'task-name'
    taskNameSpan.appendChild(taskName);
    
    editSpan.className = 'edit';
    editSpan.appendChild(editText);
    editSpan.onclick = () => editTask(editSpan);

    inputElement.replaceWith(taskNameSpan);
    approveTaskName.replaceWith(editSpan);
}