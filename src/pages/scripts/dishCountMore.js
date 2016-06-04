var sendIconMore = (function () {
    var iconMore = $('.order__more');
    iconMore.on('click', sendIconMore);

    function sendIconMore() {
        var dishId = $(this).parent().find('.order__id').val();
        jQuery.ajax({
            data: {
                dishId: dishId
            },
            method: 'get',
            url: '/orders'
        }).done(function (dish) {
            $('.order').each(function () {
                if ($(this).find('.order__id').eq(0).val() == dish._id) {
                    $(this).find('.order__value').eq(0).text(+$(this).find('.order__value').eq(0).text() + 1);
                }
            });
            updateSum();
        });
        return false;
    }
    return sendIconMore;
})();