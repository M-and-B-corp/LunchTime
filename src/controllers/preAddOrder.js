module.exports = function (req, res) {
    console.log(req.body);
    req.session.cart.orderTime = req.body.time;
    res.redirect('/basket');
};
