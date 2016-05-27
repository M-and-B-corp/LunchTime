var close = $('.order').find('.order__close');

close.on('click', sendOrder);

function sendOrder() {
    var order = $(this).parent();
    $.ajax({
        data: {
            id: order.find('.order__id').val()
        },
        method: 'post',
        url: '/removeFromBasket'
    }).done(function () {
        order.off('click', sendOrder);
        order.remove();
        updateSum();
    });
    return false;
}
       