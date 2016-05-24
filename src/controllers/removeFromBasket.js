module.exports = function (req, res) {
    req.session.orders = req.session.orders.filter(function (order) {
        return order.dish._id != req.body.id;
    });

    res.send('ok');
};
