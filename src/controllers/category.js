var DishModel =  require('../models/dish').model;

module.exports = function (req, res, next) {
    DishModel.find({category: req.body.category}, function (err, dishes) {
        if (err) next(err);        
        
        res.send(dishes);
    });
};
