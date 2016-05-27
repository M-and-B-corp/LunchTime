var OrderModel = require('../models/order').model;

module.exports = function (req, res) {

    OrderModel.remove({_id: req.body.id}).exec(function () {
        res.send('ok');
    });
};
