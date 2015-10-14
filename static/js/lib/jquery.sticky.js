(function ($) {

    var Sticky = function(el, opts) {
        var $element    = this.$element = $(el);
        var offset      = this.offset;
        var maxScroll   = this.maxScroll = 0;
        var anim        = this.anim = false;

        this.opts = opts;
        this.init();
    };

    Sticky.prototype = {
        constructor: Sticky,
        init: function() {
            this.bind();
        },
        bind: function() {
            var that = this;
            this.offsetTop = this.$element.offset().top;
            this.offsetLeft = this.$element.offset().left;
            this.maxScroll = that.offsetTop - $('.masthead').outerHeight() - 20;
            this.anim = this.$element.data('stickyAnim');
            if (this.anim) {
                this.$element.hide();
            }

            this.setDimensions();
            this.test();

            $(window).on('scroll', function() {
                that.test();
            });

            $(window).on('resize', function() {
                that.setDimensions();
                that.getOffset();
                that.test();
            });

        },
        test: function() {
            var that = this;
            var scrollTop = $(document).scrollTop();

            if ($(window).width() > 766) {

                if (scrollTop > that.maxScroll) {
                    that.stick();
                } else {
                    that.unstick();
                }
            } else {
                that.unstick();
            }
        },
        stick: function() {
            this.$element.css({
                "position"  : "fixed",
                "top"       : ($('.masthead').outerHeight() + 20) + "px",
                "left"       : (this.offsetLeft) + "px"
            });

            if (this.anim) {
                this.$element.css({"visibility" : "visible"}).fadeIn();
            }
        },
        unstick: function() {
            this.$element.css({
                "position"  : "relative",
                "top"  : "0",
                "left"  : "0",
            });

            if (this.anim) {
                this.$element.fadeOut();
            }
        },
        setDimensions: function() {
            this.$element.removeAttr('style');
            this.$element.outerWidth(this.$element.parent().width());
        },
        getOffset: function() {
            this.offsetTop = this.$element.offset().top;
            this.offsetLeft = this.$element.offset().left;
        }
        
    };

    $.fn.sticky = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.sticky.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.sticky.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('sticky');
            if(!data){
                $this.data('sticky', data = new Sticky(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.sticky('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.sticky.defaults = {

    };


    $(window).load( function() {
        $("[data-sticky]").each( function() {
            $(this).sticky();
        });
    });


})(jQuery);
