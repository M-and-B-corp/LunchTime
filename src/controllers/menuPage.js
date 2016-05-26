var DishModel = require('../models/dish').model,
    CategoryModel = require('../models/category').model;

module.exports = function (req, res, next) {
    DishModel.find({_serviceId: req.query.serviceId, category: '/burgers'}, function (err, itemDishes) {
        CategoryModel.find({}, function (err, categories) {
            if (err) return next(err);
            console.log('query: ', req.query.isOwner == 'true');
            if (!req.session.cart || !req.session.cart.orders) {
                if (req.query.isOwner == 'true') {
                    req.session.cart = {
                        orders: [],
                        serviceId: req.query.serviceId,
                        isOwner: 'true'
                    };
                } else {
                    req.session.cart = {
                        orders: [],
                        orderId: req.query.orderId,
                        isOwner: 'false'
                    };
                }
            }

            res.render('menuPage', {dishes: itemDishes, categories: categories, orders: req.session.cart.orders});
        });
    });
};
