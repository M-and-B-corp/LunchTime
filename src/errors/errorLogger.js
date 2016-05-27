module.exports = function errorLogger(error, req, res, next) {
    next(error);
};
