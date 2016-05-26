var DishModel = require('../models/dish').model;

module.exports = function (req, res) {
    DishModel.findOne({_id: req.body.dishId}, function (err, dish) {
        var addedOrder = {};
        var emptyOrder = true;
        req.session.cart.orders = req.session.cart.orders.map(function (order) {
            if (order.dish._id == req.body.dishId) {
                order.count = order.count + 1;
                addedOrder = order;
                emptyOrder = false;
                return order;
            }
            else return order;
        });
        
        if (emptyOrder) {
            addedOrder = {
                dish: dish,
                count: 1
            };
            req.session.cart.orders.push(addedOrder);
        }
        
        res.send(addedOrder.dish);
    });
};
