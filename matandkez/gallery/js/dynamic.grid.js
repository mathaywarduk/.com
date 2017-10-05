
(function ($) {

    $(document).on("ready", function() {
        init();
        loadVisibleImages();
    });

    $(window).smartresize( function() {
        loadVisibleImages();
    });
    
    $(window).on("scroll", function() {
        loadVisibleImages();
    });



})(jQuery);


function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init() {

    var grid = $("[data-dynamic-grid]");
    var images = $('.image');
    var allImages = [];
    var imageRow = [];
    var row;
    var rowLength = randomNumber(2, 4);

    $.each(images, function() {

        var $image = $(this);

        if (imageRow.length == rowLength) {
            allImages.push(imageRow);
            imageRow = [];
            rowLength = randomNumber(2, 4);
        }
        
        imageRow.push([$image, $image.width(), $image.height()]);
        
    });

    if (imageRow.length) {
        allImages.push(imageRow);
    }


    grid.empty();

    // Each row
    $.each(allImages, function() {

        row = $("<div/>").addClass("row");
        rowWidth = 0;

        // Each image within a row
        $.each(this, function() {
            var $image = this[0];
            var imageWidth = this[1];

            rowWidth += imageWidth;
            row.append($image);
        });

        grid.append(row);


        $.each(this, function() {
            var $image = this[0];
            var imageWidth = this[1];

            var percentWidth = (imageWidth / rowWidth) * 100;


            $image.css({
                width: ((imageWidth/rowWidth) * 100) + "%"
            });

        });

        $('img').css({
            width: '100%',
            height: 'auto'
        });

        row.css({
            'overflow': 'hidden'
        });



    });


    $('.image').swipebox();
    
}

function loadVisibleImages() {

    $("body").find("img").each( function() {
        var newSrc = $(this).data('imageSrc');

        if(checkVisible($(this), 50) && $(this).attr("src") != newSrc) {
            $(this).attr("src", newSrc);
        }

    });
}

function checkVisible($el, threshold) {
    var elementTop = $el.offset().top;
    var elementHeight = $el.height();
    var elementBottom = elementTop + elementHeight;
    var scrollPosition = $(document).scrollTop();
    var viewportHeight = document.body.clientHeight;

    var visibleTop = scrollPosition - threshold;
    var visibleBottom = (scrollPosition + viewportHeight) + threshold;

    var topIsIn = (elementTop >= visibleTop && elementTop <= visibleBottom)
    var bottomIsIn = (elementBottom <= visibleBottom && elementBottom >= visibleTop)

    return (topIsIn || bottomIsIn)

}