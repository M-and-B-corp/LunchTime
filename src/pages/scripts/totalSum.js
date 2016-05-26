function updateSum() {
    var totalSum = 0;
    var order = $('.order');

    order.each(function () {
        var dishPrice = +$(this).find('.order__cost').find('.order__cost_val').text();
     
             var dishCount = +$(this).find('.order__value').text();
       
        var orderPrice = dishPrice * dishCount;

        $(this).find('.order__cost_sum').find('.order__cost_val').text(orderPrice);

        totalSum = totalSum + orderPrice;
    });    
}
