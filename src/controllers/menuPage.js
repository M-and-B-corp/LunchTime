var DishModel = require('../models/dish').model,
    CategoryModel = require('../models/category').model;

module.exports = function (req, res, next) {
    DishModel.find({_serviceId: req.params.id, category: '/burgers'}).exec(function (err, dishes) {
        CategoryModel.find({}, function (err, categories) {
            if (err) return next(err);

            var ordersInBasket = [];
            
            if (req.session.orders && req.session.orders[0] && 
                req.session.orders[0].dish._serviceId + '' == req.params.id + '') {
                ordersInBasket = req.session.orders.map(function (order) {
                    return order.dish;
                });
            } else {
                req.session.orders = [];
            }

            res.render('menuPage', {serviceId: req.params.id, dishes: dishes,
                orders: ordersInBasket, categories: categories});
        });
    });
};
