export {createTask3}

const createTask3 = () => {
    const parentElement = document.querySelector("*")
    const childElements = Array.from(parentElement.children)
    const blocks = document.createElement("label")
    blocks.textContent = childElements.toString()
    const blocksCount = document.createElement("label")
    blocksCount.textContent = childElements.length.toString()
    const container = document.createElement("div")
    container.id = 'task3-container-id'
    container.classList.add("task3-container")
    container.appendChild(blocks)
    container.appendChild(blocksCount)
    return [container]
}