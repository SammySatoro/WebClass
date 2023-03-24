
function toggleElement() {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

// Create a new button element
const button = document.createElement("button");
button.id = 'task-btn-1'
button.classList.add('task-button')
button.textContent = "Задание 1";

let element = document.querySelector('.my-element');

button.addEventListener('click', toggleElement);

document.body.appendChild(button);