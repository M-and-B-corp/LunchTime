var ServiceModel = require('../models/service').model;

module.exports = function(req, res) {
    ServiceModel.find({}, function(err, services) {
        if (err) {
            return next(err);
        }
        if (req.session.orders) {
            req.session.orders = [];
        }
        req.session.isOwner = req.query.owner;
        req.session.order = {};
        res.render('services', {services: services, user: req.user});
    });
};
