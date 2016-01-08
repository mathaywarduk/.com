(function ($) {
/**
 * A simple JSON search
 * Requires jQuery (v 1.7+)
 *
 * @author  Mat Hayward - Erskine Design
 * @version  0.1
 */

 /* ==========================================================================
    Initialisation
    ========================================================================== */

var q, jsonFeedUrl = "/feeds/feed.json",
    $searchForm = $("[data-search-form]"),
    $searchInput = $("[data-search-input]"),
    $resultTemplate = $("#search-result"),
    $resultsPlaceholder = $("[data-search-results]"),
    $foundContainer = $("[data-search-found]"),
    $foundTerm = $("[data-search-found-term]"),
    $foundCount = $("[data-search-found-count]"),
    allowEmpty = true,
    showLoader = true,
    loadingClass = "is--loading";


$(document).ready( function() {
    // hide items found string
    $foundContainer.hide();

    // initiate search functionality
    initSearch();
});




 /* ==========================================================================
    Search functions
    ========================================================================== */
 

/**
 * Initiate search functionality.
 * Shows results based on querystring if present.
 * Binds search function to form submission.
 */
function initSearch() {

    // Get search results if q parameter is set in querystring
    if (getParameterByName('q')) {
        q = decodeURIComponent(getParameterByName('q'));
        $searchInput.val(q);
        execSearch(q);
    }

    // Get search results on submission of form
    $(document).on("submit", $searchForm, function(e) {
        e.preventDefault();
        q = $searchInput.val();
        execSearch(q);
    });
}


/**
 * Executes search
 * @param {String} q 
 * @return null
 */
function execSearch(q) {
    if (q != '' || allowEmpty) {
        if (showLoader) {
            toggleLoadingClass();
        }

        getSearchResults(processData());
    }
}


/**
 * Toggles loading class on results and found string
 * @return null
 */
function toggleLoadingClass() {
    $resultsPlaceholder.toggleClass(loadingClass);
    $foundContainer.toggleClass(loadingClass);
}


/**
 * Get Search results from JSON
 * @param {Function} callbackFunction 
 * @return null
 */
function getSearchResults(callbackFunction) {
    $.get(jsonFeedUrl, callbackFunction, 'json');
}


/**
 * Process search result data
 * @return null
 */
function processData() {
    $results = [];
    
    return function(data) {
        
        var resultsCount = 0,
            results = "";

        $.each(data, function(index, item) {
            // check if search term is in content or title 
            if (item.seach_omit != "true" && (item.content.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
                var result = populateResultContent($resultTemplate.html(), item);
                resultsCount++;
                results += result;
            }
        });

        if (showLoader) {
            toggleLoadingClass();
        }

        populateResultsString(resultsCount);
        showSearchResults(results);
    }
}


/**
 * Add search results to placeholder
 * @param {String} results
 * @return null
 */
function showSearchResults(results) {
    // Add results HTML to placeholder
    $resultsPlaceholder.html(results);
}


/**
 * Add results content to item template
 * @param {String} html 
 * @param {object} item
 * @return {String} Populated HTML
 */
function populateResultContent(html, item) {
    console.log(item.date);
    if (!!item.date) {
        var dateString = $("#search-date").html();
        html = injectContent(html, populateDateString(dateString, item), '##SubTitle##');
    } else {
        html = injectContent(html, item.subtitle, '##SubTitle##');
    }
    html = injectContent(html, item.title, '##Title##');
    html = injectContent(html, item.link, '##Url##');
    html = injectContent(html, item.excerpt, '##Excerpt##');
    return html;
}


function populateDateString(html, item) {
    var d = new Date(item.date);

    html = injectContent(html, item.link, '##Url##');
    html = injectContent(html, formatDate(d), '##Date##');
    return html;
}


/**
 * Populates results string
 * @param {String} count 
 * @return null
 */
function populateResultsString(count) {
    $foundTerm.text(q);
    $foundCount.text(count);
    $foundContainer.show();
}




 /* ==========================================================================
    Helper functions
    ========================================================================== */


/**
 * Gets query string parameter - taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param {String} name 
 * @return {String} parameter value
 */
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/**
 * Injects content into template using placeholder
 * @param {String} originalContent
 * @param {String} injection
 * @param {String} placeholder 
 * @return {String} injected content
 */
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

})(jQuery);