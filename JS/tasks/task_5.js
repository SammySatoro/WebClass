let continueAdding = false;
const parentDiv = document.createElement('div');

const showDialog = () => {
    continueAdding = !continueAdding
    dialog()
    console.log(continueAdding)
}

const dialog = () => {
    // Цикл для добавления блоков в родительский элемент
    while (continueAdding) {
        // Запрашиваем содержимое блока у пользователя
        const blockContent = prompt('Введите содержимое блока');

        // Если пользователь нажал ESC или отменил ввод, прерываем цикл
        if (blockContent === null) {
            continueAdding = false;
            break;
        }

        // Создаем новый блок и добавляем в него содержимое
        const block = document.createElement('div');
        block.textContent = blockContent;

        // Добавляем новый блок в родительский элемент
        parentDiv.appendChild(block);
    }

// Добавляем родительский элемент на страницу
    document.body.appendChild(parentDiv);

// Добавляем обработчик клика на каждый блок
    parentDiv.addEventListener('click', event => {
        const block = event.target;

        // Если кликнули на блок, запросим подтверждение удаления и удалить блок, если подтверждено
        if (block.tagName === 'DIV') {
            const confirmDelete = confirm(`Вы уверены, что хотите удалить блок со следующим содержимым: ${block.textContent}?`);
            if (confirmDelete) {
                console.log(`Блок со следующим содержимым был удален: ${block.textContent}`);
                block.remove();
            }
        }
    });
}

export const createTask5 = () => {
    // Создаем родительский элемент div
    const addButton = document.createElement('button')
    addButton.textContent = "Add block"
    addButton.classList.add("task5-button")
    addButton.onclick = showDialog

    parentDiv.appendChild(addButton)

    return [parentDiv]
}