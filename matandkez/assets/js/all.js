$(document).ready( function() {

    // Simple toggler
    $('[data-toggle]').on('click', function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        $(this).toggleClass('is-active');
        $target.toggleClass('is-active');
    });

});


// RSVP form
(function($) {

    var CMAjax = function(el, opts) {
        var $form = this.$form = $(el);
        var serialized = this.serialized;

        this.opts = opts;
        this.init();
    };

    CMAjax.prototype = {
        constructor: CMAjax,
        init: function() {
            this.bind();
        },
        bind: function() {
            var _self = this;
            this.$form.on('submit', function(e) {
                e.preventDefault();
                var rand = _self.rand();
                $("#fieldEmail").val(rand + '@matandkez.com');
                _self.handleSubmit(this);
            });
        },
        rand: function() {
            return Math.random().toString(36).replace(/[^a-z]+/g, '');
        },
        handleSubmit: function(form) {
            var _self = this;
            this.serialized = $(form).serialize();
            console.log(this.serialized);
            return;
            $.getJSON(
                form.action + '?callback=?',
                this.serialized, function(data) {
                    if (data.Status === 400) {
                        _self.showError();
                    } else {

                        // 200
                        _self.showSuccess();
                    }
                }
            );
        },
        showError: function() {
            if (!this.$form.find('.' + this.opts.errorClass).length) {
                this.$form.find('.' + this.opts.successClass).slideUp();

                var $error = $('<span/>');
                $error.addClass(this.opts.errorClass);
                $error.addClass(this.opts.messageClasses);
                $error.html(this.opts.errorMessage).hide();

                this.$form.append($error);
                $error.fadeIn();
            }
        },
        showSuccess: function() {
            var isWedding = this.serialized.indexOf('1672858') > -1;
            var isBBQ = this.serialized.indexOf('1672860') > -1;
            var isRoadtrip = this.serialized.indexOf('1672862') > -1;
            var successMessage = '';

            if (!isWedding) {
                // Not coming to anything
                successMessage = 'Oh, that&rsquo;s a shame. We&rsquo;ll definitely miss you.';

                if (isBBQ) {
                    // Not coming to the wedding, but can make the BBQ
                    successMessage = 'Oh, that&rsquo;s a shame. We&rsquo;ll definitely miss you on the day, but glad you can make the BBQ!';

                    if (isRoadtrip) {
                        // Not coming to the wedding, but can make the BBQ and the roadtrip
                        successMessage = 'So what ARE you doing on the Saturday!?';
                    }
                } else if (isRoadtrip) {
                    // Not coming to the wedding, but can make the roadtrip
                    successMessage = 'Oh, that&rsquo;s a shame. We&rsquo;ll definitely miss you on the day, but glad you&rsquo;re joining us on the roadtrip!';
                }
            } else {

                if (isBBQ && isRoadtrip) {
                    // Coming to everything!
                    successMessage = 'Great! The whole shebang! We can&rsquo;t wait, see you there!'
                } else if (!isBBQ && !isRoadtrip) {
                    // Coming to just the wedding!
                    successMessage = 'Great! See you at the wedding!'
                } else if (isBBQ) {
                    // Coming to the wedding and the BBQ
                    successMessage = '2 out of 3 is pretty good... see you there!'
                } else if (isRoadtrip) {
                    // Coming to the wedding and the roadtrip
                    successMessage = '2 out of 3 is pretty good... see you there!'
                }

            }



            if (!this.$form.find('.' + this.opts.successClass).length) {
                this.$form.find('.' + this.opts.errorClass).slideUp();
                var $success = $('<p/>');
                $success.addClass(this.opts.successClass);
                $success.addClass(this.opts.messageClasses);
                $success.html(successMessage).hide();

                $('[data-success]').append($success);
                $success.fadeIn();
                $('.' + this.opts.errorClass).hide();
                this.$form.slideUp();
            }
        }
    };

    $.fn.cmajax = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.cmajax.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.cmajax.defaults);
        }
        return this.each(function() {
            var $this = $(this),

            // don't call again if already initialised on this object
            data = $this.data('cmajax');
            if (!data){
                $this.data('cmajax', data = new CMAjax(this, opts));
            }

            // allow the calling of plugin methods on an instance by name, eg: $item.cmajax('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.cmajax.defaults = {
        errorMessage: 'Sorry, looks like something went wrong. Refresh the page and try again.',
        errorClass: 'message--error',
        successClass: 'message--success',
        messageClasses: 'message'
    };


    $(window).load( function() {
        $('[data-cm-ajax]').cmajax();
    });


})(jQuery);


// Match height
(function($) {

    var MatchHeight = function(el, opts) {
        var $element    = this.$element = $(el);
        var $target     = this.$target = $($(el).data('matchTarget'));
        var breakpoint  = this.breakpoint = 768;


        this.opts = opts;
        this.init();
    };

    MatchHeight.prototype = {
        constructor: MatchHeight,
        init: function() {
            this.bind();
        },
        bind: function() {
            var _self = this;

            this.checkAndSetHeight();

            $(window).on('resize', function() {
                _self.checkAndSetHeight();
            });
        },
        setHeight: function() {
            var targetHeight = this.$target.outerHeight();
            this.$element.outerHeight(targetHeight);
        },
        destroyHeight: function() {
            this.$element.removeAttr('style');
        },
        checkAndSetHeight: function() {
            if ($(window).width() < this.breakpoint) {
                this.destroyHeight();
            } else {
                this.setHeight();
            }
        }
    };

    $.fn.matchHeight = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.matchHeight.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.matchHeight.defaults);
        }
        return this.each(function() {
            var $this = $(this),

            // don't call again if already initialised on this object
            data = $this.data('matchHeight');
            if (!data){
                $this.data('matchHeight', data = new MatchHeight(this, opts));
            }

            // allow the calling of plugin methods on an instance by name, eg: $item.matchHeight('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.matchHeight.defaults = {

    };


    $(window).load( function() {
        $('[data-match]').matchHeight();
    });


})(jQuery);