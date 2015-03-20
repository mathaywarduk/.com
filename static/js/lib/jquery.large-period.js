(function ($) {

    var LargePeriod = function(el, opts) {
        var $element = this.$element = $(el);

        this.opts = opts;
        this.init();
    }

    LargePeriod.prototype = {
        constructor: LargePeriod,
        init: function() {
            this.exec();
        },
        exec: function() {
            var lastPara = this.$element.find("p:last-child");
            var html = lastPara.html();
            var lastChar = html.substr(html.length-1);
            var period = '<span class="' + this.opts.periodClass + '">.</span>';
            if (lastChar == ".") {
                var newHTML = html.substr(0, html.length-1) + period;
                lastPara.html(newHTML);
            }

        },
        
    }

    $.fn.largePeriod = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.largePeriod.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.largePeriod.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('largePeriod');
            if(!data){
                $this.data('largePeriod', data = new LargePeriod(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.largePeriod('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.largePeriod.defaults = {
        periodClass: "period"
    };


    $(window).load( function() {
        $("[data-large-period]").largePeriod();
    });


})(jQuery);
