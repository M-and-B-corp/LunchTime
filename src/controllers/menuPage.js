var DishModel = require('../models/dish').model;

module.exports = function (req, res, next) {
    DishModel.find({_serviceId: req.params.id}).exec(function (err, dishes) {
        if (err) {
            return next(err);
        }
        req.session.orders = [];
        
        res.render('menuPage', {serviceId: req.params.id, dishes: dishes, orders: req.session.orders});
    });
};
