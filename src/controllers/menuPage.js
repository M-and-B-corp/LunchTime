var DishModel = require('../models/dish').model,
    CategoryModel = require('../models/category').model,
    OrderModel = require('../models/order').model;

module.exports = function (req, res, next) {
    OrderModel.findOne({_id: req.query.orderId})
        .populate('orders.dish')
        .populate('subscribers.orders.dish')
        .exec(function (err, order) {
        DishModel.find({_serviceId: req.query.serviceId, category: '/burgers'}).exec(function (err, itemDishes) {
            CategoryModel.find({}).exec(function (err, categories) {
                if (err) return next(err);

                //Если не существует заказа в сессии, или если мы зашли на другой сервис,
                // то создаем новую сессию, иначе берем старую
                console.log(req.session.cart);
                if (!req.session.cart || !req.session.cart.orders || req.session.serviceId != req.query.serviceId) {

                    if (req.query.whoIsIt == 'owner') {
                        req.session.cart = {
                            orders: [],
                            serviceId: req.query.serviceId,
                            whoIsIt: 'owner'
                        };
                    } else if (req.query.whoIsIt == 'fickleOwner') {
                        req.session.cart = {
                            orders: order.orders,
                            orderId: req.query.orderId,
                            whoIsIt: 'fickleOwner'
                        };
                    }
                    else if (req.query.whoIsIt == 'subscriber') {
                        req.session.cart = {
                            orders: [],
                            orderId: req.query.orderId,
                            whoIsIt: 'subscriber'
                        };
                    }
                    else if (req.query.whoIsIt == 'fickleSubscriber') {
                        var orders = [];
                        order.subscribers.forEach(function (subscriber) {
                            if (subscriber.person._id + '' == req.user._id + '')
                                orders = subscriber.orders;
                        });
                        req.session.cart = {
                            orders: orders,
                            orderId: req.query.orderId,
                            whoIsIt: 'fickleSubscriber'
                        };
                    }
                }

                res.render('menuPage', {
                    dishes: itemDishes,
                    categories: categories,
                    orders: req.session.cart.orders
                });
            })
        });
    });
};
