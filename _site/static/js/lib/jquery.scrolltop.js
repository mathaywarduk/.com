(function ($) {

    // Scroll top
    $("[data-scroll-to-target]").on('click', function(e) {
        e.preventDefault();
        var $target = $($(this).attr("href"));
        var top = $target.offset().top;

        $("body, html").animate({
            scrollTop: top
        }, 1000);
    });

})(jQuery);
