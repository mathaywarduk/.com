(function ($) {

    var PhotoGrid = function(el, opts) {
        $element = this.$element = $(el);
        breakpoints = this.breakpoints = [481, 767, 1200, 1500];
        baseHeight = this.baseHeight = 250;

        this.opts = opts;
        this.init();
    }

    PhotoGrid.prototype = {
        constructor: PhotoGrid,
        init: function() {
            this.bind();
        },
        bind: function() {
            if (this.getBreakpoint()) {
                this.opts.breakpoint = this.getBreakpoint();
            }

            if (this.checkBreakpoint(this.opts.breakpoint)) {
                this.checkAndGo();
            }

            var _self = this;
            $(window).on('resize', function() {
                _self.checkAndGo();
            });
        },
        checkAndGo: function() {
            if (this.checkHires()) {
                this.hiresImages();
                this.initGrid();
            } else {
                this.destroyGrid();
            }
        },
        getBreakpoint: function() {
            var breakpointName = this.$element.attr("data-grid-breakpoint");
            if (breakpointName) {
                return this.breakpoints[breakpointName];
            }
            return false;
        },
        checkBreakpoint: function(breakpoint) {
            return $(window).width() > this.opts.breakpoint;
        },
        checkHires: function() {
            return ($(window).width() >= this.breakpoints[1]);
        },
        hiresImages: function() {
            $("[data-hires]").each( function() {
                var $img = $(this);
                var hiresImg = $(this).attr("data-hires");
                $("<img/>").attr("src", hiresImg).on('load', function() {
                    $img.attr("src", hiresImg).removeAttr("data-hires");
                });
            });

            // only sort the photo grid after the larger images have loaded
            // this.initGrid();
         
        },
        initGrid: function() {

            var _self = this;

            $("[data-grid-row]").each( function() {
                baseWidth = 0;
                var desiredWidth = $(window).width() - 15 - ( 5 * $(this).children().length ) - 5; // window width - body padding left - right padding of each item - row padding
                var $imgs = $(this).find('img');

                $imgs.each( function() {
                    var $img = $(this);

                    // get ratio
                    var ratio = $img.height()/$img.width();

                    // calculate base width and add to var
                    baseWidth += _self.baseHeight / ratio;

                    // reset that image 
                    $(this).removeAttr("style");
                });


                // calculate new height, base on desired row width
                var newHeight = _self.baseHeight * (desiredWidth / baseWidth);
                $imgs.height(newHeight);

                // check all widths don't exceed desiredwidth
                var w = 0;
                $imgs.each( function() {
                    // set width = width if hires images are going to be replaced
                    $(this).width($(this).width());

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

        },
        destroyGrid: function() {
            $("[data-grid-row] img").removeAttr("style");
        }
    }

    $.fn.photoGrid = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.photoGrid.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.photoGrid.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('photoGrid');
            if(!data){
                $this.data('photoGrid', data = new PhotoGrid(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.photoGrid('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.photoGrid.defaults = {
        breakpoint: 767
    };


    $(window).load( function() {
        $("[data-photo-grid]").each( function() {
            $(this).photoGrid();
        });
    });


})(jQuery);
