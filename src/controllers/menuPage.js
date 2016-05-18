var DishModel = require('../models/dish').model;

module.exports = function(req, res, next) {
     DishModel.find({_serviceId: req.params.id}).exec(function(err, dishes){
        if (err) {
            return next(err);
        }
        if (!req.session.dishes) {
            req.session.dishes = [];
        }
        res.render('menuPage', {dishes: dishes, orders: req.session.dishes, user: req.user});
    });
};
