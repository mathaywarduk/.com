(function ($) {


    $(window).on("load", function() {
        init();

    });
    $(window).smartresize( function() {
        reset();
        init();
    });



})(jQuery);

function getOrientation($image) {
    var orientation;
    if ($image.width() == $image.height()) {
        orientation = 'square';
    } else if ($image.width() > $image.height()) {
        orientation = 'landscape';
    }
    else {
        orientation = 'portrait';
    }
    return orientation;
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function reset() {
    var grid = $("[data-dynamic-grid]");

    // $('body').animate({
    //     'opacity': 0
    // });

    $('img, .image').removeAttr('style');

}

function init() {

    // $('body').animate({
    //     'opacity': 0
    // });

    var grid = $("[data-dynamic-grid]");
    var images = $('.image');
    var allImages = [];
    var imageRow = [];
    var row;
    var rowLength = randomNumber(2, 4);

    $.each(images, function() {

        var $image = $(this);
        var orientation = getOrientation($image);

        if (imageRow.length == rowLength) {
            allImages.push(imageRow);
            imageRow = [];
            rowLength = randomNumber(2, 4);
        }
        
        imageRow.push([$image, $image.width(), $image.height()]);
        
    });


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

            $image.width(((imageWidth/rowWidth) * 100) + "%");

        });

        $('img').css({
            width: '100%',
            height: 'auto'
        });

        row.css({
            'overflow': 'hidden'
        });



    });

    // $('body').animate({
    //     'opacity': 1
    // });

    $("img").each( function() {
        var newSrc = $(this).data('imageSrc');
        $(this).attr("src", newSrc);
    });


    $('.image').swipebox();
    
}