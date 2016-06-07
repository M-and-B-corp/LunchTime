(function () {
    var infoForm = $('.allInfo__change');
    infoForm.on('click', sendInfo);

    function sendInfo() {
        var inputs = $('.allInfo input');

        var sendData = {};

        inputs.each(function () {
            sendData[$(this).attr('name')] = $(this).val();
        });

        jQuery.ajax({
            data: sendData,
            type: 'POST',
            url: '/setInfo'
        }).done(function (status) {

        });
        return false;
    }

})();
