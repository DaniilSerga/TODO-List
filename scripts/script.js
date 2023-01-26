let liElements = document.getElementsByTagName('li');

for (let i = 0; i < liElements.length; i++) {
    let deleteSpan = document.createElement('span');
    let deleteText = document.createTextNode('\u00D7');
    let editSpan = document.createElement('span');
    let editText = document.createTextNode('\u270F');

    deleteSpan.className = 'close';
    deleteSpan.appendChild(deleteText);
    editSpan.className = 'edit';
    editSpan.appendChild(editText);

    liElements[i].appendChild(deleteSpan);
    liElements[i].appendChild(editSpan);
}

let deleteTaskElements = document.getElementsByClassName('close');

for (let i = 0; i < deleteTaskElements.length; i++) {
    deleteTaskElements[i].onclick = function() {
        this.parentElement.style.display = 'none';
    }
}

let ulElement = document.querySelector('ul');

ulElement.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
});

function addTask() {
    let inputBox = document.getElementById('task-input');
    
    if (!inputBox.value) {
        alert('Вы не указали задачу!');
        return;
    }
    
    let span = document.createElement('span');
    let text = document.createTextNode('\u00D7');
    let liElement = document.createElement('li');
    let liText = document.createTextNode(inputBox.value);
    
    span.className = 'close';
    span.appendChild(text);
    span.onclick = function() {
        this.parentElement.style.display = 'none';
    };

    liElement.appendChild(liText);
    liElement.appendChild(span);
    ulElement.appendChild(liElement);

    inputBox.value = '';
}