module.exports = function (req, res) {
    req.session.dishes = req.session.dishes.filter(function (dish) {
        return dish._id !== req.body.title;
    });

    res.send('ok');
};
