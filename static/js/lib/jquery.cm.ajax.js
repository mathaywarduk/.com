(function($) {

    var CMAjax = function(el, opts) {
        var $form = this.$form = $(el);

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
                _self.handleSubmit(this);
            });
        },
        handleSubmit: function(form) {
            var _self = this;
            $.getJSON(
                form.action + '?callback=?',
                $(form).serialize(), function(data) {
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
            if (!this.$form.find('.' + this.opts.successClass).length) {
                this.$form.find('.' + this.opts.errorClass).slideUp();
                var $success = $('<span/>');
                $success.addClass(this.opts.successClass);
                $success.addClass(this.opts.messageClasses);
                $success.html(this.opts.successMessage).hide();

                this.$form.append($success);
                $success.fadeIn();
                $('.' + this.opts.errorClass).hide();
                this.$form.find('input, button, p').slideUp();


                this.$form.delay(5000).queue( function() {
                    $(this).slideUp();
                    $(this).dequeue();
                });
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
        errorMessage: 'Well that doesn&rsquo;t look right, try again.<br>',
        successMessage: 'Thanks! We&rsquo;ll send you some more info soon.<br>',
        errorClass: 'message--error',
        successClass: 'message--success',
        messageClasses: 'message'
    };


    $(window).load( function() {
        $('[data-cm-ajax]').cmajax();
    });


})(jQuery);
