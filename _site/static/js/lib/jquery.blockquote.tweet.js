(function ($) {
    $(document).ready( function() {

        $(".post__content blockquote").each( function() {
            var content = $(this).find("p").text();
            var url = "http://mathayward.com" + window.location.pathname;
            var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&related=mathaywarduk&text=%E2%80%9C" + content.replace(/ /g, "+") + "%E2%80%9D";
            var $anchor = $("<a/>").attr({
                'data-popup'          : '',
                'data-popup-width'    : '685',
                'data-popup-height'   : '500',
                'href'                : tweetUrl,
                'title'               : 'Tweet this'
            }).text(content).addClass("inline-tweet");

            $(this).find("p").html($anchor);
        });
    })
    
})(jQuery);
