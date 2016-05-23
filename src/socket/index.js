var cookieParser = require('cookie-parser');
var async = require('async');
var cookie = require('cookie');
var sessionStore = require('../lib/sessionStore');
var User = require('../models/person').model;
var moment = require('moment');

function loadSession(sid, callback) {
    // sessionStore callback is not quite async-style!
    sessionStore.load(sid, function (err, session) {
        if (arguments.length == 0) {
            // no arguments => no session
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {

    if (!session.passport.user) {
        console.log("Session %s is anonymous", session.id);
        return callback(null, null);
    }

    User.findOne({_id: session.passport.user}, function (err, user) {
        if (err) return callback(err);

        if (!user) {
            return callback(null, null);
        }
        callback(null, user);
    });
}

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    //io.set('origins', 'localhost:3000');

    io.use(function (socket, next) {

        async.waterfall([
            function (callback) {
                // сделать handshakeData.cookies - объектом с cookie
                cookies = cookie.parse(socket.request.headers.cookie || '');
                var sidCookie = cookies["sid"];
                var sid = cookieParser.signedCookie(sidCookie, "appsecret");
                loadSession(sid, callback);
            },
            function (session, callback) {
                if (!session) {
                    callback(new Error("No session!"))
                }
                socket.handshake.session = session;
                loadUser(session, callback);
            },
            function (user, callback) {
                if (!user) {
                    callback(new Error("Anonymous session may not connect"));
                }

                socket.handshake.user = user;
                callback(null);
            }
        ], function (err) {
            if (!err) {
                return next(null, true);
            }

            next(err);
        });
    });

    io.sockets.on('session:reload', function (sid) {
        var clients = io.sockets.clients();

        clients.forEach(function (client) {
            if (client.handshake.session.id != sid) return;

            loadSession(sid, function (err, session) {
                if (err) {
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }

                if (!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }

                client.handshake.session = session;
            });

        });

    });

    io.sockets.on('connection', function (socket) {
        var username = socket.handshake.user.get('name');
        var avatar = socket.handshake.user.get('avatar');
        console.log(avatar);
        console.log(username);
        socket.broadcast.emit('join', username);

        socket.on('message', function (text, cb) {
            var time = moment().format('HH:mm');
            socket.broadcast.emit('message', username, text, avatar, time);
            cb && cb();
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('leave', username);
        });

    });

    return io;
};









