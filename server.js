var express = require('express'),
    app = express(),

    mongoose = require('mongoose'),
    auth = require('./src/controllers/auth.js'),
    passport = require('passport'),
    session = require('express-session'),

    bodyParser = require('body-parser'),

    errorHandler = require('./src/errors/errorHandler.js'),
    errorLogger = require('./src/errors/errorLogger.js'),

    routes = require('./src/routes/routes.js'),

    cookieParser = require('cookie-parser'),

    parser = require('./src/middleware/parser.js');

//TODO: Избавиться от хардкода(сделать конфиг)
mongoose.connect('mongodb://localhost/lenka');
app.use(cookieParser());

var sessionStore = require('./src/lib/sessionStore.js');

app.use(session({
    secret: "appsecret",
    key: "sid",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        secure: false,
        httpOnly: true,
        maxAge: null
    },
    store: sessionStore
}));

app.use(require('./src/middleware/loadUser.js'));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes.router);

app.set('view engine', 'jade');
app.set('views', './src/pages');


// app.use(errorLogger);
// app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

//already last(error processing)
app.use(function (req, res) {
    res.render('404');
});

var server = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
    console.log('Working ' + this.port);
});

require('./src/socket')(server);