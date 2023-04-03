export {Calendar}
class Calendar {
    constructor() {
        this.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        this.weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        const date = new Date();
        this.date = new Date(date.getFullYear(), date.getMonth());
        this.currentMonth = date.getMonth()
        this.currentMonthDays = []

        // calendar container
        this.calendarContainer = document.createElement("div")
        this.calendarContainer.id = "calendar-container-id"
        this.calendarContainer.classList.add("calendar-container")

        // calendar grid
        this.calendarGrid = document.createElement("div")
        this.calendarGrid.id = "calendar-grid-id"
        this.calendarGrid.classList.add("calendar-grid")

        // weekday labels
        this.weekDays = document.createElement("div")
        this.weekDays.id = "week-days-id"
        this.weekDays.classList.add("calendar-week")

        // bottom header
        this.bottomHeader = document.createElement("div")
        this.bottomHeader.id = "bottom-header-id"
        this.bottomHeader.classList.add("bottom-header-container")

        this.monthLabel = document.createElement("label")
        this.monthLabel.id = "month-label-id"
        this.monthLabel.classList.add("month-label")
        this.monthLabel.textContent = this.months[this.currentMonth]

        this.previousMonthButton = document.createElement('button')
        this.previousMonthButton.id = `$prev-month-button-id`
        this.previousMonthButton.classList.add("month-button")
        this.previousMonthButton.classList.add("arrow")
        this.previousMonthButton.classList.add("arrow-left")
        this.previousMonthButton.addEventListener('click', () => this.previousMonth());

        this.nextMonthButton = document.createElement('button')
        this.nextMonthButton.id = `$next-month-button-id`
        this.nextMonthButton.classList.add("month-button")
        this.nextMonthButton.classList.add("arrow")
        this.nextMonthButton.classList.add("arrow-right")
        this.nextMonthButton.addEventListener('click', () => this.nextMonth());
    }

    fillCalendarGrid() {
        for (let i = 0; i < 42; i++) {
            let dayLabel = this.createDayLabel(i)
            if ((i % 7) >= 5) dayLabel.classList.add("weekend")
            this.calendarGrid.appendChild(dayLabel)
        }
    }

    drawCalendar() {
        this.getCurrentMonthDays()
        for (let i = 0; i < 42; i++) {
            this.calendarGrid.childNodes[i].textContent = ''
        }

        for (let i = 0; i < this.currentMonthDays.length; i++) {
            this.calendarGrid.childNodes[i].textContent = this.currentMonthDays[i]
        }
        return this.calendarGrid
    }

    getCurrentMonthDays() {
        this.currentMonthDays = []
        const days = this.getDaysForWeekday()

        for (let i = 0; i < days[0] - 1; i++) {
            this.currentMonthDays.push("")
        }
        for (let i = 1; i <= days.length; i++) {
            let dayLabel = i.toString()

            // if (days[i] < 2) dayLabel.classList.add("weekend")

            this.currentMonthDays.push(dayLabel)
        }
    }

    createDayLabel(id) {
        const dayLabel = document.createElement("label")
        dayLabel.id = `day-label-${id}`
        dayLabel.classList.add("day-label")
        dayLabel.textContent = ''
        return dayLabel
    }

    createWeekdayLabels() {
        this.weekdays.forEach((day) => {
            let curDay = this.createDayLabel(day)
            curDay.textContent = day

            if (day === "Сб" || day === "Вс") {
                curDay.classList.add("weekend")
            }
            this.weekDays.appendChild(curDay)

        })
        return this.weekDays
    }

    createBottomHeader(){
        this.bottomHeader.appendChild(this.previousMonthButton)
        this.bottomHeader.appendChild(this.monthLabel)
        this.bottomHeader.appendChild(this.nextMonthButton)

        return this.bottomHeader
    }

    adjustCurrentMonthAndYear() {
        if (this.currentMonth > 11) {
            this.currentMonth = 0
            this.date.setFullYear(this.date.getFullYear() + 1)
        }
        if (this.currentMonth < 0) {
            this.currentMonth = 11
            this.date.setFullYear(this.date.getFullYear() - 1)
        }
        this.date.setMonth(this.currentMonth)
    }

    nextMonth() {
        this.currentMonth++
        this.adjustCurrentMonthAndYear()
        this.drawCalendar()
        this.monthLabel.textContent = this.months[this.currentMonth]
    }

    previousMonth() {
        this.currentMonth--
        this.adjustCurrentMonthAndYear()
        this.drawCalendar()
        this.monthLabel.textContent = this.months[this.currentMonth]
    }

    getDaysForWeekday() {
        const days = [];
        let localDate = new Date(this.date.getFullYear(), this.date.getMonth())
        while (localDate.getMonth() === this.currentMonth) {
            days.push(new Date(localDate.getTime()).getDay());
            localDate.setDate(localDate.getDate() + 1);
        }
        return days;
    }

    createCalendar() {
        this.fillCalendarGrid()
        this.calendarContainer.appendChild(this.createBottomHeader())
        this.calendarContainer.appendChild(this.createWeekdayLabels())
        this.calendarContainer.appendChild(this.drawCalendar())
        return [this.calendarContainer]
    }
}