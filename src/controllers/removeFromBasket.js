module.exports = function (req, res) {
    req.session.cart.orders = req.session.cart.orders.filter(function (order) {
        return order.dish._id != req.body.id;
    });

    res.send('ok');
};
