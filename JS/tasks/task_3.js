export {createTask3}

const createTask3 = () => {
    const container = document.createElement("div")
    document.addEventListener("DOMContentLoaded", () => {
        const lbl = document.createElement('label')
        lbl.textContent = "Child blocks of 'grid-container'"
        lbl.classList.add('task3-font-style')
        const parentElement = document.getElementById("grid-container-id")
        const childBlocks = Array.from(parentElement.children)
            .map(child => {
                const idLabel = document.createElement("label")
                idLabel.textContent = child.id
                idLabel.classList.add('task3-font-ids')
                return idLabel
            }
        )

        const blocksCount = document.createElement("label")
        blocksCount.classList.add('task3-font-style')
        blocksCount.textContent = `Number of child blocks: ${childBlocks.length.toString()}`

        container.id = 'task3-container-id'
        container.classList.add("task3-container")
        container.appendChild(lbl)
        childBlocks.forEach(block => container.appendChild(block))
        container.appendChild(blocksCount)
    });
    return [container]
}