var sendIconLess = (function () {
    var iconLess = $('.order__less');
    iconLess.on('click', sendIconLess);

    function sendIconLess() {
        var dishId = $(this).closest('.order').find('.order__id').val();
        var order = $(this).closest('.order');

        jQuery.ajax({
            data: {
                dishId: dishId
            },
            method: 'post',
            url: '/dishCountLess'
        }).done(function (response) {
            $('.order').each(function () {
                if ($(this).find('.order__id').eq(0).val() == response.removedDish._id) {
                    $(this).find('.order__value').eq(0).text(+$(this).find('.order__value').eq(0).text() - 1);
                }
            });

            if (response.needDelete) {

                order.off('click', sendIconLess);
                order.remove();
            }
            updateSum();
        });
        return false;
    }
    return sendIconLess;
})();
