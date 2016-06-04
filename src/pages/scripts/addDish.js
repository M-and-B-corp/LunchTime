'use strict';
(function () {
    var link = $('.menu-item__link');
    link.on('click', sendForm);

    function sendForm() {
        $.ajax({
            type: 'get',
            url: $(this).attr('href')
        }).done(function (dish) {
            var dishInOrders = false;
            $('.order').each(function () {
                if ($(this).find('.order__id').eq(0).val() == dish._id) {
                    $(this).find('.order__value').eq(0).text(+$(this).find('.order__value').eq(0).text() + 1);
                    dishInOrders = true;
                }
            });

            if (!dishInOrders) addOrder(dish.title, dish.price, dish._id);

            var close = $('.order').find('.order__close');
            close.off('click', sendOrder);
            close.on('click', sendOrder);

            var more = $('.order__more');

            more.off('click', sendIconMore);
            more.on('click', sendIconMore);

            var less = $('.order__less');
            less.off('click', sendIconLess);
            less.on('click', sendIconLess);

            updateSum();
        });
        return false;
    }
    
    function addOrder(title, sum, id) {
        var order = $("<div/>", {
            "class": "order"
        }).appendTo($('.orders'));

        $("<input/>", {
            'class': 'order__price',
            type: 'hidden',
            value: sum
        }).appendTo(order);

        $("<input/>", {
            "class": "order__id",
            type: 'hidden',
            value: id
        }).appendTo(order);

        var order__close = $("<a/>", {
            "class": "order__close"
        }).appendTo(order);

        $("<i/>", {
            "class": "order__icon order__icon_close"
        }).appendTo(order__close);

        $("<div/>", {
            "class": "order__info",
            text: title + ' (' + sum + ' руб.)'
        }).appendTo(order);

        var order__less = $("<a/>", {
            "class": "order__less"
        }).appendTo(order);

        $("<i/>", {
            "class": "order__icon order__icon_less"
        }).appendTo(order__less);

        $("<div/>", {
            "class": "order__value",
            text: '1'
        }).appendTo(order);

        var order__more = $("<a/>", {
            "class": "order__more"
        }).appendTo(order);

        $("<i/>", {
            "class": "order__icon order__icon_more"
        }).appendTo(order__more);
    }
})();
