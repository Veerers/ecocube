/*global define*/
define(['knockout', 'jquery'], function (ko, $) {
    'use strict';
    ko.bindingHandlers.mediaPopup = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $element = $(element);
            var options = ko.unwrap(valueAccessor());
            $element.magnificPopup(options);
        }
    };
    ko.bindingHandlers.goUp = {
        init: function (element) {
            var start = 500;
            var stop = 1000;
            var $global = $(document);
            var $element = $(element);
            $element.click(function () {
                $global.scrollTop(0);
                return false;
            });
            $element.fadeOut(0);
            $global.scroll(function (e) {
                var scroll = $global.scrollTop()
                if (scroll < start) {
                    $element.fadeOut(0);
                } else if (scroll >= start && scroll < stop) {
                    $element.fadeTo(0, (scroll - start) / (stop - start));
                } else if (scroll >= stop) {
                    $element.fadeTo(0, 1);
                }
            })
        }
    }
    return {

    };
});
