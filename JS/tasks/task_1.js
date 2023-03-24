export { createTask1 };
function updateDateTime() {
    const now = new Date();
    const optionsDate = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'};
    const optionsTime = { hour12: true, hour: '2-digit', minute:'2-digit', second: '2-digit' };
    const dateString = now.toLocaleDateString('ru-RU', optionsDate)
        .replaceAll(RegExp(/(?!\d{2})\.(?=\d{2})/g), '-');
    const timeString = now.toLocaleTimeString('en-US', optionsTime,)
        .replaceAll(':', '/');

    document.getElementById('task-1').textContent = dateString + ' ' + timeString;
}

// обновляем время каждую секунду


const createTask1 = () => {

    const task1 = document.createElement("div");
    task1.id = "task-1"

    const dateTime = document.createElement("div");
    dateTime.id = "task1-date-time-id"
    dateTime.classList.add("task1-date-time")
    dateTime.textContent = "Дата/Время"

    setInterval(updateDateTime, 1000);

    return [dateTime, task1]
}