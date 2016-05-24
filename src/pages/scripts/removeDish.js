var close = $('.order').find('.order__close');

close.on('click', sendOrder);

function sendOrder() {
    var order = $(this).parent();
    $.ajax({
        data: $('.order').find('.order__info').text(),
        method: 'post',
        url: 'removeFromBasket'
    }).done(function () {
        $(this).off('click', sendOrder);
        order.remove();
        updateSum();
    });
    return false;
}
       