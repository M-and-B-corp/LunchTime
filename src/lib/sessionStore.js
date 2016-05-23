var mongoose = require('mongoose'),
    express = require('express-session'),
    MongoStore = require('connect-mongo')(express);

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;
