

const fadeInImage = (image) => {
    let opacity = 1;
    const intervalId = setInterval(() => {
        opacity -= 0.05;
        image.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(intervalId);
        }
    }, 50);
};

const fadeOutImage = (image) => {
    let opacity = 0;
    const intervalId = setInterval(() => {
        opacity += 0.05;
        image.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(intervalId);
        }
    }, 50);
};


export const createTask8 = () => {

    const container = document.createElement('div')
    container.classList.add('image-container')
    container.style.height = `${container.width * (3 / 4)}px`
    const image = document.createElement('img')
    image.style.width = container.width + 'px'

    const lbl = document.createElement('label');
    lbl.classList.add('text-behind');
    lbl.textContent = 'Hello there!'

    window.addEventListener('resize', () => {
        container.style.height = container.width * 3 / 4 + 'px'
    })

    image.addEventListener('mouseout', ()=>fadeOutImage(image));
    image.addEventListener('mouseover', ()=>fadeInImage(image));

    container.appendChild(lbl)
    container.appendChild(image)

    return [container]
}