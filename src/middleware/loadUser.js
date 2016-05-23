var UserModel = require('../models/person').model;

module.exports = function (req, res, next) {
    if (!req.session.passport) return next();

    UserModel.findOne({_id: req.session.passport.user}).exec(function (err, user) {
        if (err) return next(err);

        req.user = res.locals.user = user;
        next();
    });
};
