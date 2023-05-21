
function generateMenu() {
    var menuItems = [
        { text: 'Menu Item 1', id: 'item1' },
        { text: 'Menu Item 2', id: 'item2' },
        { text: 'Menu Item 3', id: 'item3' }
    ];

    $.each(menuItems, function(index, item) {
        var $li = $('<li>', { text: item.text, id: item.id });
        $('#menu').append($li);
    });
}

export const createTest = () => {

    return []
}
