var request = require('request');

module.exports = function (data) {
    var jar = request.jar();
    request({
        method: 'GET',
        url: 'http://www.pizzatempo.by/menu',
        jar: jar
    }, function () {
        var promises = data.products.map(function (item) {
            if (item.category != 'Пицца') {
                return tempoOrderProducts(item, jar);
            } else {
                return tempoOrderPizza(item, jar);
            }
        });
        Promise.all(promises).then(function () {
            createOrder(data.user, jar);
        });
    });
};

