moment.locale('ru');
$('.info_owner__time').each(function () {
    $(this).text(moment($(this).text()).fromNow());
});