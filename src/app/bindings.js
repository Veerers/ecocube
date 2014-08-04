/*global define*/
define(['knockout', 'jquery'], function (ko, $) {
    'use strict';
    ko.bindingHandlers.mediaPopup = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $element = $(element);
            var options = ko.unwrap(valueAccessor());
            $element.magnificPopup(options);
        },
        update: function () {

        }
    };
    return {

    };
});
