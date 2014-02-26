var screenw = $(window).width();
var breakpoints = [481, 767, 1200, 1500];
var hires = (screenw >= breakpoints[1]);

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
    $(document).on('click', "[data-popup]", function(e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var windowName = "popup";
        var windowSize = "width=" + $(this).attr("data-popup-width") + ",height=" + $(this).attr("data-popup-height") + ",scrollbars=no,resizable=no,toolbar=no" 
        window.open(url, windowName, windowSize);
    });

    // Search function
    if (getParameterByName('q')) {
        var q =  decodeURIComponent(getParameterByName('q'));
        getSearchResults(q);
        $("[data-search-input]").val(q);
    }

    initSearch();

});


$(window).on('load', function() {
    // Initialise grid on load, so images are loaded
    hiresImages();

    // change blockquotes to tweet intents
    blockquoteTweets();

    $("body").removeClass("no-js").addClass("js");
});



$(window).on('resize', function() {
    screenw = $(window).width();
    hires = (screenw >= breakpoints[1]);
    hiresImages();
});

// Change height of images to fit rows in grid
function sizePhotoGrid() {

    if (screenw >= breakpoints[1]) {

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

function blockquoteTweets() {
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
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function initSearch() {
    var $searchForm = $("[data-search-form]"),
        $searchInput = $("[data-search-input]");

    $(document).on("submit", $searchForm, function(e) {
        e.preventDefault();
        var q = $searchInput.val();
        getSearchResults(q);
    });


}

function getSearchResults(q) {
    var jsonFeed = "/feed.json"
        $resultTemplate = $("#search-result"),
        $resultsWrapper = $("[data-search-results]"),
        count = 0,
        results = "";


    // remove results and show loader
    $resultsWrapper.addClass("is--loading");
    $("[data-search-found-string]").addClass("is--loading");

    // get new results
    $.get(jsonFeed, 'json', function(data) {
        $.each(data, function(index, item) {
            if (item.content.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                var result = populateSearchResult($resultTemplate.html(), item);
                count++;
                results += result;
            }
        });

        // hide loader
        $resultsWrapper.html("").removeClass("is--loading").append(results);
        
        // show results
        $("[data-search-term]").text(q);
        $("[data-search-count]").text(count);
        $resultsWrapper.parent().show();
        $("[data-search-found-string]").removeClass("is--loading").show();

        if (count > 0) {
            $resultsWrapper.show();
        }

    });
}

function populateSearchResult(html, item) {

    var pubdate = new Date(item.published);

    html = injectContent(html, item.title, '##Title##');
    html = injectContent(html, item.link, '##Url##');
    html = injectContent(html, item.excerpt, '##Excerpt##');
    html = injectContent(html, formatDate(pubdate), '##PubDate##');
    return html;
}

function injectContent(originalContent, injection, placeholder) {
    var regex = new RegExp(placeholder, 'g');
    return originalContent.replace(regex, injection);
}

function formatDate(date) {
    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
        months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
        n = date.getDate(),
        suffix = "th";

        if (n == 1 || n == 21 || n ==31) {
            suffix = "st";
        }
        else if (n == 2 || n == 22) {
            suffix = "nd";
        }
        else if (n == 3 || n == 23) {
            suffix = "rd";
        }

        return "" + days[date.getDay()] + " " + n + suffix + " " + months[date.getMonth()] + " " + date.getFullYear();
}


