var OrderModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;
var moment = require('moment');

module.exports = function (req, res, next) {
    console.log('cart: ', req.session.cart);
    
    if (req.session.cart.isOwner == 'true') {
        console.log('owner - true');
        ServiceModel.findOne({_id: req.session.cart.serviceId}, addOwnerOrder);
    } else {
        console.log('owner - false');
        OrderModel.findOne({_id: req.session.cart.orderId}, addSubscriberOrder);
    }

    function addOwnerOrder(err, service) {
        if (err) return next(err);

        var orderModel = new OrderModel({
            owner: req.user,
            orders: req.session.cart.orders,
            service: service,
            creatingTime: moment(),
            subscriber: []
        });

        orderModel.save(function () {
            delete req.session.cart;
            
            res.redirect('/');
        });
    }

    function addSubscriberOrder(err, order) {
        if (err) next(new Error('Не создался подписчик'));

        order.subscriber.push({
            person: req.user,
            orders: req.session.cart.orders,
            paid: false
        });

        order.save(function (err) {
            delete req.session.cart;

            res.redirect('/');
        });
    }
};
