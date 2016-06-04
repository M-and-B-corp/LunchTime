(function () {
    var input = $('.chat__input input');
    var ul = $('.chat__history');
    var form = $('.chat__input');
    var chatButton = $('.control__chat');
    var closeButton = $('.chat__close');
    var room;

    var socket = io.connect('', {
        reconnect: false
    });

    chatButton.on('click', function () {
        room = $(this).parent().parent().parent().find('.session_id').val();
        socket.emit('join', room, function (messages) {
            moment.locale('ru');
            messages.forEach(function (message) {
                if (moment(message.time).dayOfYear() > moment().dayOfYear() - 1) {
                    printMessage(message.author.name, message.text,
                        message.author.avatar, moment(message.time).format('h:mm'));
                } else {
                    printMessage(message.author.name, message.text,
                        message.author.avatar, moment(message.time).format('DD.MM.YY'));
                }
            })
        });
    });

    closeButton.on('click', function () {
        room = $(this).parent().parent().parent().find('.session_id').val();
        $('.message').remove();
        socket.emit('leave', room);
    });

    socket
        .on('message', function (username, message, avatar, time) {
            printMessage(username, message, avatar, time);
            $('.chat__history').scrollTop($('.chat__history')[0].scrollHeight);
        })

        .on('connect', function () {
            form.on('submit', sendMessage);
            input.prop('disabled', false);
        })
        .on('disconnect', function () {
            printStatus("соединение потеряно");
            form.off('submit', sendMessage);
            input.prop('disabled', true);
            this.emit('error');
        })
        .on('logout', function () {
            location.href = "/";
        })
        .on('error', function (reason) {
            if (reason == "handshake unauthorized") {
                printStatus("вы вышли из сайта");
            } else {
                setTimeout(function () {
                    socket.socket.connect();
                }, 500);
            }
        });
    function sendMessage() {
        var time = moment().format('HH:mm');
        var data = {
            text: input.val(),
            room: room
        };

        socket.emit('message', data, function () {
            printMessage(mainUser.name, data.text, mainUser.avatar, time);

            $('.chat__history').scrollTop($('.chat__history')[0].scrollHeight);
        });

        input.val('');

        return false;
    }

    function printStatus(status) {
        $('<li>').append($('<i>').text(status)).appendTo(ul);
    }

    function printMessage(userName, text, avatar, time) {
        var message = $("<div/>", {
            "class": "message"
        }).appendTo(ul);
        var message_avatar = $("<div/>", {
            "class": "message__avatar"
        }).appendTo(message);

        message_avatar.append($("<img/>", {
            src: avatar
        }));

        var message_content = $("<div/>", {
            "class": "message__content"
        }).appendTo(message);

        message_content.append($("<div/>", {
            "class": "message__name",
            text: userName
        }));

        message_content.append($("<div/>", {
            "class": "message__text",
            text: text
        }));

        $("<div/>", {
            "class": "message__time",
            text: time
        }).appendTo(message);
    }

})();
