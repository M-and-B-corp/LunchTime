var input = $('.chat__input input');
var ul = $('.chat__history');
var form = $('.chat__input');

var socket = io.connect('', {
    reconnect: false
});

socket
    .on('message', function (username, message, avatar, time) {
        printMessage(username, message, avatar, time);
    })

    .on('connect', function () {
        form.on('submit', sendMessage);
        input.prop('disabled', false);
    })
    .on('disconnect', function () {
        printStatus("соединение потеряно");
        form.off('submit', sendMessage);
        input.prop('disabled', true);
        this.$emit('error');
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
    var text = input.val();
    var time = moment().format('HH:mm');
    socket.emit('message', text, function () {
        printMessage(mainUser.name, text, mainUser.avatar, time);
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