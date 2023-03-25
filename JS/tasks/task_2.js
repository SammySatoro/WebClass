export { createCalendar }

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const createDayLabel = (id) => {
    const dayLabel = document.createElement("label")
    dayLabel.id = `day-label-${id}`
    dayLabel.classList.add("day-label")
    dayLabel.textContent = id
    return dayLabel
}

function getDaysForWeekday() {
    const days = [];

    let date = new Date()
    date = new Date(date.getFullYear(), date.getMonth())
    const month = date.getMonth();
    while (date.getMonth() === month) {
        days.push(new Date(date.getTime()).getDay());

        date.setDate(date.getDate() + 1);
    }

    return days;
}

const createWeekDayLabels = () => {
    const weekDays = document.createElement("div")
    weekDays.id = "week-days-id"
    weekDays.classList.add("calendar-week")

    weekdays.forEach(day => {
        let cur_day = createDayLabel(day)
        if (day === "Сб" || day === "Вс") {
            cur_day.classList.add("weekend")
        }
        weekDays.appendChild(cur_day)
    })

    return weekDays
}



const createCalendar = () => {
    const calendarContainer = document.createElement("div")
    calendarContainer.id = "calendar-container-id"
    calendarContainer.classList.add("calendar-container")

    const days = getDaysForWeekday()
    const calendarGrid = document.createElement("div")
    calendarGrid.id = "calendar-grid-id"
    calendarGrid.classList.add("calendar-grid")
    for (let i = 0; i < days[0] - 1; i++) {
        calendarGrid.appendChild(createDayLabel(""))
    }
    for (let i = 1; i <= days.length; i++) {
        let dayLabel = createDayLabel(i)
        if (days[i] < 2) {
            console.log(days[i])
            dayLabel.classList.add("weekend")
        }
        calendarGrid.appendChild(dayLabel)
    }

    calendarContainer.appendChild(createWeekDayLabels())
    calendarContainer.appendChild(calendarGrid)
    return [calendarContainer]
}

