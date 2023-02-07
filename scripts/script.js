const liElements = document.getElementsByTagName('li');
const initLiElements = [...liElements];

for (let liElement of liElements) {
    const deleteSpan = document.createElement('span');
    const deleteText = document.createTextNode('\u00D7');
    const editSpan = document.createElement('span');
    const editText = document.createTextNode('\u270E');

    deleteSpan.className = 'close';
    deleteSpan.appendChild(deleteText);
    editSpan.className = 'edit';
    editSpan.appendChild(editText);

    liElement.appendChild(deleteSpan);
    liElement.appendChild(editSpan);
}

const deleteTaskElements = document.getElementsByClassName('close');
for (let deleteTaskElement of deleteTaskElements) {
    deleteTaskElement.addEventListener('click', function() {
        this.parentElement.remove();

        initLiElements.forEach((liElement, index) => {
            if (liElement == this.parentElement) {
                delete initLiElements[index];
            }
        });
    });
}

const editTaskElements = document.getElementsByClassName('edit');
for (let editTaskElement of editTaskElements) {
    editTaskElement.addEventListener('click', () => editTask(editTaskElement));
}

const ulElement = document.querySelector('ul');
ulElement.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN' && event.target.className == 'task-name') {
        const liElement = event.target.closest('li');
        liElement.classList.toggle('checked');
    } else if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
});

const applySearchButton = document.getElementById('apply-search');
applySearchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search').value;
    
    for (let liElement of liElements) {
        const liText = liElement.querySelector('.task-name').textContent;

        if (!liText.toLowerCase().includes(searchInput.toLowerCase())) {
            liElement.style.display = 'none';
        }
    }   
});

const resetSearchButton = document.getElementById('reset-search');
resetSearchButton.addEventListener('click', () => {
    document.getElementById('search').value = '';

    for (let li of liElements) {
        li.style.display = 'block';
    }
});

const sortingButton = document.getElementById('sorting-button');
sortingButton.addEventListener('click', event => {
    if (event.target.className == 'no-sort') {
        event.target.className = 'descending';
    } else if (event.target.className == 'descending') {
        event.target.className = 'ascending';
    } else {
        event.target.className = 'no-sort';
    }

    let taskNames = document.getElementsByClassName('task-name');
    let sortedTasksNames = [...taskNames];

    switch(event.target.className) {
        case 'no-sort':
            initLiElements.forEach(li => ulElement.appendChild(li));
            break;
        case 'ascending':
            sortedTasksNames.sort(function(a, b) {
                return a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase());
            });

            sortedTasksNames.forEach(span => ulElement.appendChild(span.parentNode));
            break;
        case 'descending':
            sortedTasksNames.sort(function(a, b) {
                return b.textContent.toLowerCase().localeCompare(a.textContent.toLowerCase());
            });

            sortedTasksNames.forEach(span => ulElement.appendChild(span.parentNode));
            break;
    }
});

function addTask() {
    const ulElement = document.querySelector('ul');
    const inputBox = document.getElementById('task-input');
    
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
    deleteSpan.addEventListener('click', function() {
        this.parentElement.remove();

        initLiElements.forEach((liElement, index) => {
            if (liElement == this.parentElement) {
                delete initLiElements[index];
            }
        });
    });

    editSpan.className = 'edit';
    editSpan.appendChild(editText);
    editSpan.addEventListener('click', () => editTask(editSpan));

    taskNameSpan.className = 'task-name';
    taskNameSpan.appendChild(taskName);

    liElement.appendChild(deleteSpan);
    liElement.appendChild(editSpan);
    liElement.appendChild(taskNameSpan);
    
    ulElement.appendChild(liElement);
    initLiElements.push(liElement);

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
    approveTaskName.addEventListener('click', () => editTaskName(approveTaskName, inputBox));
    
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
    editSpan.addEventListener('click', () => editTask(editSpan));

    inputElement.replaceWith(taskNameSpan);
    approveTaskName.replaceWith(editSpan);
}