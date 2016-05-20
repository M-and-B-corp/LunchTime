var OrderModel = require('../models/order').model;

module.exports = function (req, res, next) {
    OrderModel.findOne({_id: req.session.order}, function (err, order) {
        if (err) {
            next();
        }
        
        order.subscriber.push({
            person: req.user,
            dishes: req.session.dishes,
            paid: false
        });

        order.save(function (err) {
            if (!err) {
                req.session.dishes = {};
            }
                res.redirect('/');
        });
    });
};
