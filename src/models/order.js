var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = require('./service').schema;
var Dish = require('./dish').model;
var personSchema = require('./person').schema;

var orderSchema = new Schema({
    owner: personSchema,
    orders: [{count: String, dish: {type: Schema.Types.ObjectId, ref: 'Dish'}}],
    service: serviceSchema,
    creatingTime: String,
    subscriber: [{
        person: personSchema, 
        orders: [{count: String, dish: {type: Schema.Types.ObjectId, ref: 'Dish'}}], 
        paid: Boolean
    }]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};
