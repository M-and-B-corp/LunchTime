var OrderModel = require('../models/order').model;

module.exports = function (req, res, next) {

    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        if (err) return next(err);

        order.subscribers.forEach(function (subscriber) {
            if (subscriber._id == req.body.subscriberId) {
                subscriber.paid = req.body.inputChecked;
            }
        });
        order.save(function (err) {
            if (err) next(err);
            
            res.send('ok');
        });
    });
};
