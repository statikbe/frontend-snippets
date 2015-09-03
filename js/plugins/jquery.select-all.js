/**
 * TODO: Rewrite to vanilla js
 */

(function($){
    'use strict';

    $.fn.selectAll = function(options) {
        var settings = {
            checboxes: false,
            classes: {
                0: 'is-none',
                1: 'is-indeterminate',
                2: 'is-all'
            }
        };

        if (options) {
            $.extend( settings, options );
        }

        return this.each(function () {
            var $this = $(this);
            settings.checkboxes = $this.data('select-all') ? $this.data('select-all') : false;

            // if there are no checkboxes to check, it's pointless
            if (!settings.checkboxes) return false;

            $this.on('change', function() {
                if (this.checked) {
                  $(settings.checkboxes).prop('checked', true);
                } else {
                  $(settings.checkboxes).prop('checked', false);
                }

                $this.attr('class', settings.classes[checkSelected($(settings.checkboxes))]);
            });

            $(document).on('change', settings.checkboxes, function() {
                var state = checkSelected($(settings.checkboxes));

                if(state === 0) {
                    $this.prop({
                        'checked': false,
                        'indeterminate': false
                    });
                } else if (state === 2){
                    $this.prop({
                        'checked': true,
                        'indeterminate': false
                    });
                } else {
                    $this.prop('indeterminate', true);
                }
                $this.attr('class', settings.classes[state]);
            });
        });

        function checkSelected($items) {
            if (0 === $items.filter(':checked').length) {
              return 0;
            } else if ($items.length === $items.filter(':checked').length) {
              return 2;
            } else {
              return 1;
            }
        }

    };
})(window.jQuery);
