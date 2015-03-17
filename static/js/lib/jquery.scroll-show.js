(function ($) {

    var ScrollShow = function(el, opts) {
        var $element = this.$element = $(el);
        var showAt = this.showAt;

        this.opts = opts;
        this.init();
    }

    ScrollShow.prototype = {
        constructor: ScrollShow,
        init: function() {
            this.bind();
        },
        bind: function() {
            var that = this;

            this.getOptions();

            this.showAt = $(this.opts.showSelector).offset().top;

            this.testAndAct();

            $(window).on("scroll", function() {
                that.testAndAct();
            });

        },
        getOptions: function() {
            this.opts.showSelector = (!this.$element.attr("data-scroll-show-selector")) ? this.opts.showSelector : this.$element.attr("data-scroll-show-selector");
        },
        testAndAct: function() {
            if ($(window).width() > 489) {
                if ($(window).scrollTop() > this.showAt) {
                    this.show();
                } else {
                    this.hide();
                }
                
            }
        },
        show: function() {
            this.$element.show();
        },
        hide: function() {
            this.$element.fadeOut();
        }
    }

    $.fn.scrollShow = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.scrollShow.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.scrollShow.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('scrollShow');
            if(!data){
                $this.data('scrollShow', data = new ScrollShow(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.scrollShow('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.scrollShow.defaults = {
        showSelector: "#show"
    };


    $(window).load( function() {
        $("[data-scroll-show]").scrollShow();
    });


})(jQuery);
