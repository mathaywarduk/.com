(function ($) {
    
    $(window).load( function() {
        $("body").removeClass("no-js").addClass("js");
    });


    var minHeight = $(window).height() - ($(".masthead__wrapper").outerHeight(true) + $(".footer").outerHeight(true));

    $(".wrapper.post").css({
        "min-height": minHeight + "px"
    })

})(jQuery);
