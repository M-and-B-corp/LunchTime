var updateSum = (function () {
    return function () {
        var totalSum = 0;
        var totalCount = 0;
        var order = $('.order');

        order.each(function () {
            var dishPrice = +$(this).find('input').val();
            var dishCount = +$(this).find('.order__value').text();

            var orderPrice = dishPrice * dishCount;

            totalSum = totalSum + orderPrice;
            totalCount = totalCount + dishCount;
        });

        $('.main-wrapper__title_info').find('.main-wrapper__title_sum').text('Общая стоимость: ' + totalSum + ' руб.');
        $('.main-wrapper__title_info').find('.main-wrapper__title_count').text('Кол-во: ' + totalCount);
    }
})();
updateSum();