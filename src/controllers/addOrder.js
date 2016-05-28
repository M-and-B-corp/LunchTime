var OrderModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;
var moment = require('moment');
    moment.locale('ru');

module.exports = function (req, res, next) {
    if (req.session.cart.whoIsIt == 'owner') {
        ServiceModel.findOne({_id: req.session.cart.serviceId}, addOwnerOrder);

    } else if (req.session.cart.whoIsIt == 'subscriber') {
        OrderModel.findOne({_id: req.session.cart.orderId}, addSubscriberOrder);

    } else if (req.session.cart.whoIsIt == 'fickleSubscriber') {
        OrderModel.findOne({_id: req.session.cart.orderId}, addFickleSubscriber);

    } else if (req.session.cart.whoIsIt == 'fickleOwner') {
        OrderModel.findOne({_id: req.session.cart.orderId}, addFickleOwner);
    }

    function addOwnerOrder(err, service) {
        if (err) return next(err);

        var totalSum = req.session.cart.orders.reduce(function (sum, order) {
            return sum + +order.dish.price * +order.count;
        }, 0);
        
        console.log('time: ',req.query.orderTime);
        var orderModel = new OrderModel({
            owner: req.user,
            orders: req.session.cart.orders,
            paymentSum: totalSum,
            service: service,
            orderTime: moment(req.session.cart.orderTime).calendar(true).toLowerCase(),
            subscriber: []
        });

        orderModel.save(function () {
            delete req.session.cart;

            res.redirect('/');
        });
    }

    function addSubscriberOrder(err, order) {
        if (err) next(err);

        var totalSum = req.session.cart.orders.reduce(function (sum, order) {
            return sum + +order.dish.price * +order.count;
        }, 0);

        order.subscribers.push({
            person: req.user,
            orders: req.session.cart.orders,
            paymentSum: totalSum,
            paid: false
        });

        order.save(function () {
            delete req.session.cart;

            res.redirect('/');
        });
    }

    function addFickleOwner(err, order) {
        if (err) next(err);

        order.orders = req.session.cart.orders;
        
        order.save(function (err) {
            if (err) next(err);

            delete req.session.cart;

            res.redirect('/');
        });
    }

    function addFickleSubscriber(err, order) {
        if (err) next(err);

        order.subscribers.forEach(function (subscriber) {
            if (subscriber.person._id + '' == req.user._id + '')
                subscriber.orders = req.session.cart.orders;
        });

        order.save(function (err) {
            if (err) next(err);

            delete req.session.cart;

            res.redirect('/');
        });
    }
};
