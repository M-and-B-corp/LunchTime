var Person = require('./../models/person').model;

module.exports = function (req, res) {
    Person.find({}, function (err, services) {
        if (err) return next(err);
        
        res.render('personalArea', {services: services});
    });
};
