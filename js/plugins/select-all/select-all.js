'use strict';

(function (window, undefined) {

    var SelectAll = function (selector) {
        var elements = document.querySelectorAll(selector);

        [].forEach.call(elements, function (element, i) {
            var linkedCheckboxesSelector = element.dataset.selectAll ? element.dataset.selectAll : false,
                linkedCheckboxes;

            // exit if there is no linked checkbox selector
            if (!linkedCheckboxesSelector) {
                return false;
            }

            /**
             * A function to find the first element that matches the selector
             * by testing the element itself and traversing up through
             * its ancestors in the DOM tree.
             *
             * @param  {Element} the element itself
             * @param  {String} the selector
             * @return {[type]} the matched element, or false
             */
            var findClosest = function (el, sel) {
                if (el !== null && "className" in el) {
                    return el.matches(sel) ? el : findClosest(el.parentNode, sel);
                } else {
                    return false;
                }
            };

            /**
             * The change handler for the main checkbox, it toggles the linked
             * checkboxes depending on the current state.
             *
             * @param  {Event} event
             */
            var mainCheckboxHandler = function (event) {
                if (linkedCheckboxes === undefined) {
                    linkedCheckboxes = document.querySelectorAll(linkedCheckboxesSelector);
                }

                if (event.target.checked) {
                    [].forEach.call(linkedCheckboxes, function (element, index) {
                        element.checked = true;
                    });
                } else {
                    [].forEach.call(linkedCheckboxes, function (element, index) {
                        element.checked = false;
                    });
                }
            };

            /**
             * The change handler when one of the linked checkboxes are changed.
             * It first checks if there are any checkboxes in de variable,
             * otherwise selects them, thene runs checkSelected to change
             * the main checkbox accordingly
             *
             * @param  {Event} event
             */
            var linkedCheckboxHandler = function (event) {
                if (linkedCheckboxes === undefined) {
                    linkedCheckboxes = document.querySelectorAll(linkedCheckboxesSelector);
                }
                if (findClosest(event.target, linkedCheckboxesSelector)) {
                    switch(checkSelected()) {
                        case 0:
                            // nothing is selected
                            element.checked = false;
                            element.indeterminate = false;
                            break;
                        case 1:
                            // one or more are NOT selected
                            element.indeterminate = true;
                            break;
                        case 2:
                            // everthing is selected
                            element.checked = true;
                            element.indeterminate = false;
                            break;
                    }
                }
            };

            /**
             * A function to check how many linked checkboxes are select,
             * and returns an integer depending on the result.
             *
             * @return {Number} 0: non selected, 1: few selected, 2: all selected
             */
            function checkSelected() {
                var tmp = [].filter.call(linkedCheckboxes, function(checkbox) {
                    return checkbox.checked;
                });

                if (0 === tmp.length) {
                  return 0;
                } else if (linkedCheckboxes.length === tmp.length) {
                  return 2;
                } else {
                  return 1;
                }
            }

            // The change events on the main and linked checkboxes
            element.addEventListener('change', mainCheckboxHandler, false);
            document.addEventListener('change', linkedCheckboxHandler, false);
        });
    };

    // Create an instance of the function on all checkboxes with data-select-all
    var mySelectAll = new SelectAll('input[data-select-all]');

    // A matches polyfill for older browsers (IE mostly)
    Element.prototype.matches = (Element.prototype.matches || Element.prototype.mozMatchesSelector
        || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector
        || Element.prototype.webkitMatchesSelector || Element.prototype.webkitMatchesSelector);

}(window));
