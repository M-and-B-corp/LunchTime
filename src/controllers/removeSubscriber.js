var OrderModel = require('../models/order').model;

module.exports = function (req, res, next) {
    console.log(req.body);
    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        if (err) next(err);

        order.subscribers = order.subscribers.filter(function (subscriber) {
            return subscriber._id != req.body.subscriberId;
        });
        
        console.log('order: ', order);
        order.save(function (err) {
            if (err) next(err);

            res.send('ok');
        });
    });
};
