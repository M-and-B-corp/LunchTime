var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = require('./person').schema;

var messageSchema = new Schema({
    author: personSchema,
    text: String,
    time: String,
    room: Schema.Types.ObjectId
});

module.exports = {
    model: mongoose.model('Message', messageSchema),
    schema: messageSchema
};
