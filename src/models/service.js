var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    logo: String,
    title:  String,
    mincost: Number,
    costDelivery: String,
    departureTime: String,
    workTime: String,
    phone: [String]
});

module.exports = {
    model: mongoose.model('Service', serviceSchema),
    schema: serviceSchema
};
