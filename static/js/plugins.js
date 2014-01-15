var screenw = $(window).width();

$(document).ready( function() {
    

    // Scroll top
    $("[data-scroll-to-target]").click( function(e) {
        e.preventDefault();
        var $target = $($(this).attr("href"));
        var top = $target.offset().top;

        $("body, html").animate({
            scrollTop: top
        }, 1000);
    });
});


$(window).load( function() {
    // Initialise grid on load, so images are loaded
    sizePhotoGrid();

    $("body").removeClass("no-js");
});


$(window).resize( function() {
    screenw = $(window).width();
    sizePhotoGrid();
});


// Change height of images to fit rows in grid
function sizePhotoGrid() {

    if (screenw > 480) {

        var baseHeight = 250;

        $("[data-grid-row]").each( function() {
            var desiredWidth = screenw - 15 - ( 5 * $(this).children().length ) - 5; // window width - body padding left - right padding of each item - row padding
            var $imgs = $(this).find('img');
            var baseWidth = 0;

            $imgs.each( function() {

                // get ratio
                var ratio = $(this).height()/$(this).width(); 

                // calculate base width and add to var
                baseWidth += baseHeight / ratio;
            });


            // calculate new height, base on desired row width
            var newHeight = baseHeight * (desiredWidth / baseWidth);
            $imgs.height(newHeight);

            // check all widths don't exceed desiredwidth
            var w = 0;
            $imgs.each( function() {
                w += $(this).width();
            });

            // tweak last image width if row is too short/long
            if (w != desiredWidth) {
                var $lastimg = $(this).find("img:last");
                var tweakWidth = $lastimg.width() + (desiredWidth - w);
                $lastimg.width(tweakWidth)/*.css("height", "auto")*/;
            }

        });

    } else {
        // if mobile, reset
        $("[data-grid-row] img").removeAttr("style");
    }
}