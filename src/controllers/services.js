var ServiceModel = require('../models/service').model;

module.exports = function(req, res) {
    ServiceModel.find({}, function(err, services) {
        if (err) {
            return next(err);
        }

        res.render('services', {services: services});
    });
};
