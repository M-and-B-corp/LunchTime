var close = $('.header_content__close');
close.on('click', removeOrder);

function removeOrder() {
    var order = $(this).parent().parent().parent();

    $.ajax({
        data: {
            id: order.find('.session_id').val()
        },
        method: 'post',
        url: '/removeOrder'
    }).done(function () {
        close.off('click', removeOrder);
        order.remove();
        close.on('click', removeOrder);
    });
    return false;
};