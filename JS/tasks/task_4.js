export const createTask4 = () => {

    const gridContainer = document.createElement("div")
    gridContainer.id = "task4-grid-container-id"
    gridContainer.classList.add("task4-grid-container")

    const grid = document.createElement("div")
    grid.id = "task4-grid-id"
    grid.classList.add("task4-grid")

    for (let i = 0; i < 30; i++) {
        const cell = document.createElement("div")
        cell.id = `task4-cell-${i}`
        cell.classList.add("task4-cell")
        grid.appendChild(cell)
    }

    gridContainer.appendChild(grid)

    const startId = Math.floor(Math.random() * 30)
    let previousCellId = startId
    let currentCellId = Math.floor(Math.random() * 30)

    const updateRandomImage = () => {
        // Update current cell ID with a new random value
        currentCellId = Math.floor(Math.random() * 30)

        // Remove image from previous cell
        const previousCell = grid.querySelector(`#task4-cell-${previousCellId}`)
        previousCell.classList.remove("task4-cell-image")

        // Add image to current cell
        const currentCell = grid.querySelector(`#task4-cell-${currentCellId}`)
        currentCell.classList.add("task4-cell-image")

        // Update previous cell ID
        previousCellId = currentCellId
    }

    setTimeout(() => {
        setInterval(updateRandomImage, 100)
    }, 0)

    return [gridContainer]
}
