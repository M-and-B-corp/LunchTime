var DishModel = require('../models/dish').model;

module.exports = function(req, res, next) {
        DishModel.findOne({_id: req.body.dishId}, function(err, dish){
            if (err) {
                return next(err);
            }   
            req.session.dishes.push(dish);
            res.send(dish);
        });
};
