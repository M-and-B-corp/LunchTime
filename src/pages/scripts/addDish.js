var form = $('.main-wrapper__menuitem');
form.on('submit', sendForm);

function sendForm() {
    var sendData = $(this).serialize();
    jQuery.ajax({
        data: sendData,
        type: $(this).attr('method'),
        url: $(this).attr('action')
    }).done(function (dish) {
        addOrder(dish.title, dish.price, dish._id);

        var close = $('.order').find('.order__close');
        close.off('click', sendOrder);
        close.on('click', sendOrder);

        updateSum();
    });
    return false;
}

function addOrder(title, sum) {
    var order = $("<div/>", {
        "class": "order"
    }).appendTo($('.orders'));

    var order__close = $("<a/>", {
        "class": "order__close"
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_close"
    }).appendTo(order__close);

    $("<div/>", {
        "class": "order__info",
        text: title
    }).appendTo(order);

    var order__less = $("<a/>", {
        "class": "order__less"
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_less"
    }).appendTo(order__less);

    var order__value = $("<div/>", {
        "class": "order__value"
    }).appendTo(order);

    $("<input/>", {
        "class": "order__value",
        value: '1'
    }).appendTo(order__value);

    var order__more = $("<a/>", {
        "class": "order__more",
        href: '#'
    }).appendTo(order);

    $("<i/>", {
        "class": "order__icon order__icon_more"
    }).appendTo(order__more);

    var order__cost = $("<div/>", {
        "class": "order__cost"
    }).appendTo(order);

    $("<span/>", {
        "class": "order__cost_val",
        text: sum
    }).appendTo(order__cost);

    $("<span/>", {
        text: 'руб'
    }).appendTo(order__cost);
}
