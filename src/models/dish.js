var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    title:  String,
    price: String,  
    category: String,
    image: String,
    description: String,
    uselfulness: String
});

module.exports = {
    model: mongoose.model('Dish', dishSchema),
    schema: dishSchema
};
