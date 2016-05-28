var Person = require('./../models/person').model;

module.exports = function (req, res, next) {
    Person.findOne({_id: req.user._id}, function (err, user) {
        if (err) return next(err);

        user.phone = req.body.phone || '';
        user.street = req.body.street || '';
        user.home = req.body.home || '';
        user.building = req.body.building || '';
        user.apartment = req.body.apartment || '';
        
        user.save(function (err) {
            if (err) next(err);
            
            res.send('ok');
        });
    });
};
