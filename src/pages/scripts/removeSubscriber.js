(function() {
    var subscriberRemove = $('.subscriber_header__close');
    subscriberRemove.on('click', removeSubscriber);

    function removeSubscriber() {
        var subscriber = $(this).parent().parent();
        var subscriberId = subscriber.find('.subscriber_id').val();
        var orderId = subscriber.parent().find('.session_id').val();

        $.ajax({
            data: {
                subscriberId: subscriberId,
                orderId: orderId
            },
            method: 'post',
            url: '/removeSubscriber'
        }).done(function () {

            var subscribers = subscriber.parent().find('.session__main .subscriber');

            subscribers.each(function () {
                if (subscriberId + '' == $(this).find('.subscriber_id').val() + '') $(this).remove();
            });

            subscriber.off('click', removeSubscriber);
            subscriber.remove();
            subscriber.on('click', removeSubscriber);
        });
        return false;
    }
})();
