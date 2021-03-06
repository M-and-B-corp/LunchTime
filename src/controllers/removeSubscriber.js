var OrderModel = require('../models/order').model;

module.exports = function (req, res, next) {
    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        if (err) next(err);

        order.subscribers = order.subscribers.filter(function (subscriber) {
            return subscriber._id != req.body.subscriberId;
        });
        
        order.save(function (err) {
            if (err) next(err);

            res.send('ok');
        });
    });
};
