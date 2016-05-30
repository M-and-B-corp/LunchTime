var category = $('.category').find('input');

category.on('click', function () {
    jQuery.ajax({
        data: {
            category: $(this).val()
        },
        type: 'POST',
        url: '/category'
    }).done(function (dishes) {
        var item = $('.menu-item');
        item.off('click', sendForm);
        item.remove();

        dishes.forEach(function (dish) {
            addItem(dish);
        });

        item = $('.menu-item__link');
        item.on('click', sendForm);
    });
});

function addItem(dish) {
    var menuItem = $("<div/>", {
        'class': 'menu-item'
    }).appendTo($('.main-wrapper__menu'));

    $("<a/>", {
        href: "/orders?dishId=" + dish._id,
        'class': 'menu-item__link'
    }).appendTo(menuItem);
    
    $("<img/>", {
        src: dish.image,
        'class': 'menu-item__image'
    }).appendTo(menuItem);

    var menuItemInfo = $("<div/>", {
        'class': 'menu-item__info'
    }).appendTo(menuItem);

    $("<div/>", {
        'class': 'menu-item__title',
        text: dish.title
    }).appendTo(menuItemInfo);

    var menuItemOtherInfo = $("<div/>", {
        'class': 'menu-item__other-info'
    }).appendTo(menuItemInfo);

    $("<div/>", {
        'class': 'menu_item__price',
        text: dish.price + ' руб'
    }).appendTo(menuItemOtherInfo);

}