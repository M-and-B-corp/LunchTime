var OrderModel = require('../models/order').model;
var PersonModel = require('../models/person').model;

module.exports = function(req, res) {
    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        PersonModel.findOne({_id: req.body.userId}, function (err, person) {
            order.subscriber.push({
                person: person,
                dishes: order.dishes,
                paid: false
            });
            order.save();
        });
    });
    res.redirect('/');
};
