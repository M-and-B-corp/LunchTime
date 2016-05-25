var category = $('.category').find('a');

category.on('click', function () {
    jQuery.ajax({
        data: {
            category: $(this).find('input').val()
        },
        type: 'POST',
        url: '/category'
    }).done(function (dishes) {
        var form = $('.main-wrapper__menuitem');
        form.off('submit', sendForm);
        form.remove();

        dishes.forEach(function (dish) {
            addItem(dish);
        });

        form = $('.main-wrapper__menuitem');
        form.on('submit', sendForm);
    });
});

function addItem(dish) {
    var form = $("<form/>", {
        name: "dishForm",
        action: '/orders',
        method: 'post',
        'class': 'main-wrapper__menuitem'
    }).appendTo($('.main-wrapper__menu'));

    $("<input/>", {
        type: 'hidden',
        name: 'dishId',
        value: dish._id
    }).appendTo(form);

    var menuItem = $("<div/>", {
        'class': 'menu-item'
    }).appendTo(form);

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

    var button = $("<div/>", {
        'class': 'button button_size-m'
    }).appendTo(menuItemOtherInfo);

    var buttonButton = $("<button/>", {
        'class': 'button__button button_size-m'
    }).appendTo(button);

    $("<span/>", {
        'class': 'button__title',
        text: 'В заказ'
    }).appendTo(buttonButton);
}