var subscriberPaid = $('.subscriber__input input');
subscriberPaid.on('click', checkPaid);

function checkPaid() {
    var paidInput = $(this);
    var subscriber = $(this).parent().parent();
    var subscriberId = subscriber.find('.subscriber_id').val();
    var orderId = subscriber.parent().parent().parent().parent().find('.session_id').val();

    $.ajax({
        data: {
            subscriberId: subscriberId,
            orderId: orderId,
            inputChecked: $(this).prop('checked')
        },
        type: 'POST',
        url: '/changePaid'
    }).done(function () {
        paidInput.prop('checked', !paidInput.prop('checked'));
        var paidString = paidInput.parent().parent().find('.subscriber__paid');

        if (paidString.text() == '(не оплачено)') {
            paidString.text('(оплачено)');
        } else {
            paidString.text('(не оплачено)');
        }
    });
    return false;
}