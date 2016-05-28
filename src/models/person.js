var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:  {type: String, require: true},
    phone: String,
    street: String,
    home: String,
    building: String,
    apartment: String,
    avatar: String,
    facebookId: String,
    vkId: String
});

module.exports = {
    model: mongoose.model('Person', personSchema),
    schema: personSchema
};
