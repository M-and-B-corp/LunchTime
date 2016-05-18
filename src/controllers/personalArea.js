var Person = require('./../models/person').model;

module.exports = function PersonalAreaController(req, res) {
    Person.find({}, function(err, services) {
        if (err) {
            return next(err);
        }
        if (req.session.dishes) {
            req.session.dishes = [];
        }
        req.session.isOwner = req.query.owner;
        req.session.order = {};
        res.render('personalArea', {services: services, user: req.user});
    });
};
