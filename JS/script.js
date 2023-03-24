import {createTask1} from './tasks/task_1.js'
import {createCalendar} from './tasks/task_2.js'
function toggleElement( element ) {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}


function createTaskContainer(taskID, taskContentDiv, fieldStyle) {

    const taskContainer = document.createElement("div")
    taskContainer.id = `task-container-${taskID}`
    taskContainer.classList.add('task-container')

    const taskButton = document.createElement("button");
    taskButton.id = `show-task-button-${taskID}`
    taskButton.classList.add('show-task-button')
    taskButton.textContent = `Задание ${taskID}`;

    const taskField = document.createElement("div")
    taskField.id = `task-filed-${taskID}`
    taskField.classList.add(fieldStyle === undefined ? "task-field" : `${fieldStyle}`)
    taskField.style.display = 'none'

    taskButton.addEventListener('click', () => toggleElement(taskField));

    taskContentDiv.forEach((item) => taskField.appendChild(item))

    taskContainer.appendChild(taskButton)
    taskContainer.appendChild(taskField)

    return taskContainer

}


let tasks_list = [createTask1(), createCalendar()]

function createGrid() {
    const grid_container = document.createElement("div")
    grid_container.id = 'grid-container-id'
    grid_container.classList.add('grid-container')

    tasks_list.forEach((task, index) => {
        grid_container.appendChild(createTaskContainer(index + 1, task));
    })
    document.body.append(grid_container)
}

createGrid()


