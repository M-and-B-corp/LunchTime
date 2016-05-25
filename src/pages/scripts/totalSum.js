function updateSum() {
    var totalSum = 0;
    var order = $('.order');

    order.each(function () {
        var dishPrice = +$(this).find('.order__cost').find('.order__cost_val').text();
        console.log('dishPrice', dishPrice);
        var dishCount = +$(this).find('.order__value').text();
        console.log('dishCount', dishCount);

        var orderPrice = dishPrice * dishCount;

        $(this).find('.order__cost_sum').find('.order__cost_val').text(orderPrice);

        totalSum = totalSum + orderPrice;
    });

    $('.basket__allcost').eq(0).find('.total_sum').text('Общая сумма: ' + totalSum + ' руб.');
}
