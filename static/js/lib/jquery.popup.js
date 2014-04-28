(function ($) {

    // Pop up windows for share links
    $(document).on('click', "[data-popup]", function(e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var windowName = "popup";
        var windowSize = "width=" + $(this).attr("data-popup-width") + ",height=" + $(this).attr("data-popup-height") + ",scrollbars=no,resizable=no,toolbar=no" 
        window.open(url, windowName, windowSize);
    });

})(jQuery);
