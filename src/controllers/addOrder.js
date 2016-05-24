var OrdersModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;
var moment = require('moment');

module.exports = function (req, res, next) {
    ServiceModel.findOne({_id: req.body.serviceId}, function (err, service) {
        if (err) {
            return next(err);
        }
        
        var orderModel = new OrdersModel({
            owner: req.user,
            orders: req.session.orders,
            service: service,
            creatingTime: moment().format('HH:mm'),
            subscriber: []
        });
        
        orderModel.save(function (err) {
            req.session.orders = {};

            res.redirect('/');
        });
    });
};
