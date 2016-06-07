module.exports = function (req, res) {
    req.session.cart.orderTime = req.body.time;
    res.redirect('/basket');
};
