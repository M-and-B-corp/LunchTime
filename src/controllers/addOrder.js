var OrderModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;

module.exports = function (req, res, next) {
    ServiceModel.findOne({_id: req.body.serviceId}, function (err, service) {
        if (err) {
            return next(err);
        }
        var orderModel = new OrderModel({
            owner: req.user,
            dishes: req.session.dishes,
            service: service,
            subscriber: []
        });
        console.log(orderModel);
        orderModel.save(function (err) {
            if (!err) {
                req.session.dishes = {};
            }
            res.redirect('/');
        });
    });
};
