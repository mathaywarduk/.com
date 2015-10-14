(function ($) {

    var Track = function(el, opts) {
        var $element = this.$element = $(el),
            action = this.action,
            category = this.category,
            label = this.label,
            value = this.value;

        this.opts = opts;
        this.init();
    };

    Track.prototype = {
        constructor: Track,
        init: function() {
            this.bind();
        },
        bind: function() {
            this.getData();
            this.addBindTrackingEvent();
        },
        getData: function() {
            attributes = ['href', 'action', 'category', 'label', 'value'];
            this.getDataAttributes(attributes);
        },
        getDataAttributes: function(attributes) {
            var _self = this;
            $.each(attributes, function(index, value) {
                _self[value] = _self.$element.attr("data-track-" + value) ? _self.$element.attr("data-track-" + value) : _self.opts[value];
            });
        },
        addBindTrackingEvent: function() {
            var _self = this;
            this.$element.on("click", function() {
                ga('send', 'event', _self.category, _self.action, _self.label, { 'page': _self.href } );
            });
        }
    };

    $.fn.track = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.track.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.track.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('track');
            if(!data){
                $this.data('track', data = new Track(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.track('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.track.defaults = {
        href: "",
        action: "click",
        category: "button",
        label: "page",
        value: ""
    };


    $(window).load( function() {
        $("[data-track]").each( function() {
            $(this).track();
        });
    });


})(jQuery);
