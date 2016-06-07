(function () {
    $('.main-wrapper__title_cart').on('click', function () {
        $('.main-wrapper__basket').eq(0).css('display', function () {
            if ($(this).css('display') == "none")
                return "block";
            else
                return 'none';
        });
        $('.main-wrapper__title_cart').find('img').css('transform', function () {
            if ($(this).css('transform') == "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)")
                return "rotate(0deg)";
            else
                return "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)";
        });

    });
})();