(function ($) {

    var WidowBuster = function(el, opts) {
        var $wrapper = this.$wrapper = $(el);
        var selector = this.selector = 'h1, h2, h3, h4, p, li';

        this.opts = opts;
        this.init();
    }

    WidowBuster.prototype = {
        constructor: WidowBuster,
        init: function() {
            this.exec();
        },
        exec: function() {
            this.$wrapper.find(this.selector).each( function() {
                var lastSpaceIndex = $(this).html().lastIndexOf(" ");
                var newHTML = $(this).html().substr(0, lastSpaceIndex) + "&nbsp;" + $(this).html().substr(lastSpaceIndex+1);

                $(this).html(newHTML);

            });
        },
    }

    $.fn.widowBuster = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.widowBuster.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.widowBuster.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('widowBuster');
            if(!data){
                $this.data('widowBuster', data = new WidowBuster(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.widowBuster('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.widowBuster.defaults = {

    };


    $(window).load( function() {
        $("[data-no-widows]").widowBuster();
    });


})(jQuery);
