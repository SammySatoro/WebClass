
export const createTask7 = () => {

    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-button');
    menuButton.textContent = 'Menu';

    const menuList = document.createElement('ul');
    menuList.classList.add('menu-items');
    menuList.style.display = 'none';

    const lbl = document.createElement('label');
    lbl.classList.add('out-of-sweets-label');
    lbl.textContent = 'Out of sweets!'
    lbl.style.display = 'none';


    let showed = 0

    const sweets = ['Chocolate', 'Candies', 'Cookies']
        .map( sweet => {
        const menuItem = document.createElement('li');
        menuItem.textContent = sweet;
        menuItem.classList.add('hidden');
        menuList.appendChild(menuItem);

        menuItem.addEventListener('click', () => {
            menuItem.style.opacity = '0';
            setTimeout(() => {
                menuItem.style.display = 'none';
                menuItem.style.opacity = '1'
                showed--;
                if (showed === 0) {
                    lbl.style.display = 'block';
                    showed = menuList.children.length;
                }}, 500);
        });

    })

    showed = menuList.children.length

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(menuList);


    const container = document.createElement('div');
    container.appendChild(menuContainer);

    menuButton.addEventListener('click', () => {
        if (menuList.style.display === 'none') {
            menuList.style.display = 'block';
        } else {
            menuList.style.display = 'none';
        }
    });

    lbl.addEventListener('click', () => {
        if (lbl.style.display === 'block') {
            lbl.style.display = 'none'
            showed = menuList.children.length
            menuList.childNodes.forEach(node => {
                node.style.display = 'block'
            })
        }
    })

    menuContainer.appendChild(lbl)

    return [container]
}