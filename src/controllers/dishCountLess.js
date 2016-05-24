module.exports = function (req, res) {
    var removedDish = {};
    var needDelete = false;
    req.session.orders.forEach(function (order, i, arr) {
        if (order.dish._id == req.body.dishId) {
            removedDish = order.dish;
            if (order.count > 1) order.count = order.count - 1;
            else {
                needDelete = true;
                arr.splice(i, 1);
            }
        }
    });
    res.send({
        removedDish: removedDish,
        needDelete: needDelete});
};
