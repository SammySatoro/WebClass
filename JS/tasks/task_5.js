let continueAdding = false;
const parentDiv = document.createElement('div');

const showDialog = () => {
    continueAdding = !continueAdding
    dialog()
}

const dialog = () => {

    let block;

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
        block = document.createElement('div');
        block.textContent = blockContent;

        // Добавляем новый блок в родительский элемент
        parentDiv.appendChild(block);
        continueAdding = false;
    }

    if (block != null) {
        // Добавляем обработчик клика на каждый блок
        block.addEventListener('click', event => {
            const block = event.target;

            // Если кликнули на блок, запросим подтверждение удаления и удалить блок, если подтверждено
            const confirmDelete = confirm(`Вы уверены, что хотите удалить блок со следующим содержимым: ${block.textContent}?`);
            if (confirmDelete) {
                console.log(`Блок со следующим содержимым был удален: ${block.textContent}`);
                block.remove();
            }
        });
    }
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