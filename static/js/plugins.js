var screenw = $(window).width();
var breakpoint = 766;
var hires = (screenw > breakpoint);

$(document).ready( function() {
    

    // Scroll top
    $("[data-scroll-to-target]").on('click', function(e) {
        e.preventDefault();
        var $target = $($(this).attr("href"));
        var top = $target.offset().top;

        $("body, html").animate({
            scrollTop: top
        }, 1000);
    });


    // Pop up windows for share links

    $("[data-popup]").on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var windowName = "popup";
        var windowSize = "width=" + $(this).attr("data-popup-width") + ",height=" + $(this).attr("data-popup-height") + ",scrollbars=no,resizable=no,toolbar=no" 
        window.open(url, windowName, windowSize);
    });

});


$(window).on('load', function() {
    // Initialise grid on load, so images are loaded
    hiresImages();

    $("body").removeClass("no-js");
});



$(window).on('resize', function() {
    screenw = $(window).width();
    hires = (screenw > breakpoint);
    hiresImages();
});

// Change height of images to fit rows in grid
function sizePhotoGrid() {

    if (screenw > breakpoint) {

        var baseHeight = 250;

        $("[data-grid-row]").each( function() {
            var desiredWidth = screenw - 15 - ( 5 * $(this).children().length ) - 5; // window width - body padding left - right padding of each item - row padding
            var $imgs = $(this).find('img');
            var baseWidth = 0;

            $imgs.each( function() {
                var $img = $(this);

                // get ratio
                var ratio = $img.height()/$img.width();

                // calculate base width and add to var
                baseWidth += baseHeight / ratio;

                // reset that image 
                $(this).removeAttr("style");
            });


            // calculate new height, base on desired row width
            var newHeight = baseHeight * (desiredWidth / baseWidth);
            $imgs.height(newHeight);

            // check all widths don't exceed desiredwidth
            var w = 0;
            $imgs.each( function() {
                // set width = width if hires images are going to be replaced
                if (hires) {
                    $(this).width($(this).width());
                }

                // add width to var
                w += $(this).width();
            });

            // tweak last image width if row is too short/long
            if (w != desiredWidth) {
                var $lastimg = $(this).find("img:last");
                var tweakWidth = $lastimg.width() + (desiredWidth - w);
                $lastimg.width(tweakWidth);
            }


        });

    }
}

function hiresImages() {

    if (hires) {

        $("[data-hires]").each( function() {
            var $img = $(this);
            var hiresImg = $(this).attr("data-hires");
            $("<img/>").attr("src", hiresImg).on('load', function() {
                $img.attr("src", hiresImg).removeAttr("data-hires");
            });
        });

        // only sort the photo grid after the larger images have loaded
        sizePhotoGrid();
    } else {
        // if mobile, reset
        $("[data-grid-row] img").removeAttr("style");
    }

}