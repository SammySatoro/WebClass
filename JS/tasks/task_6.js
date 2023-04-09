

const square = () => {
    const object = document.createElement('div')
    object.classList.add("task6-square")
    object.id = "task6-square-id"

    return object
}

const field = (square) => {
    const object = document.createElement('div');
    object.classList.add("task6-field");
    object.id = "task6-field-id";

    object.addEventListener('click', event => {

        const fieldRect = object.getBoundingClientRect();
        const x = event.clientX - fieldRect.left;
        const y = event.clientY - fieldRect.top;

        const squareRect = square.getBoundingClientRect();

        const newLeft = x - squareRect.width/2;
        const newTop = y - squareRect.height/2;

        const maxX = fieldRect.width - squareRect.width;
        const maxY = fieldRect.height - squareRect.height;
        const clampedLeft = Math.min(Math.max(newLeft, 0), maxX);
        const clampedTop = Math.min(Math.max(newTop, 0), maxY);

        square.style.left = `${clampedLeft}px`;
        square.style.top = `${clampedTop}px`;

    });


    return object;
};

const container = () => {
    const object = document.createElement('div')
    object.classList.add("task6-container")
    object.id = "task6-container-id"

    return object
}


export const createTask6 = () => {

    const sqr = square()
    const fld = field(sqr)
    const cntr = container()
    fld.appendChild(sqr)
    cntr.appendChild(fld)
    return [cntr]
}