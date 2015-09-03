/**
 * Simple, lightweight, usable select all chekcboxes script, hooray!
 * @author Bart Verbruggen http://www.statik.be
 * MIT license
 */

(function () {
    'use strict';

    var SelectAll = function (selector) {
        var elements = document.querySelectorAll(selector);

        [].forEach.call(elements, function (element, i) {
            var linkedCheckboxesSelector = element.dataset.selectAll ? element.dataset.selectAll : false,
                linkedCheckboxes;

            if (!linkedCheckboxesSelector) {
                return false;
            }

            var findClosest = function (el, sel) {
                if (el !== null && "className" in el) {
                    // console.log(el, el.matches(sel), el.parentNode);
                    return el.matches(sel) ? el : findClosest(el.parentNode, sel);
                } else {
                    return false;
                }
            };

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
                // var toggle = getClosest( event.target, settings.selector );
                // if ( toggle ) {
                //     event.preventDefault();
                //     tabby.toggleTab(toggle, toggle.getAttribute('data-tab'), settings);
                // }
            };

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

            element.addEventListener('change', mainCheckboxHandler, false);
            document.addEventListener('change', function (event) {
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
            }, false);
        });
    };

    var mySelectAll = new SelectAll('[data-select-all]');

    Element.prototype.matches = (Element.prototype.matches || Element.prototype.mozMatchesSelector
        || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector
        || Element.prototype.webkitMatchesSelector || Element.prototype.webkitMatchesSelector);

}());
