var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title:  String,
    href: String,
    service: String
});

module.exports = {
    model: mongoose.model('Category', categorySchema),
    schema: categorySchema
};
