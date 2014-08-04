/*global define*/
define(function (require) {
    'use strict';
    var _ = require('lodash');
    var ko = require('knockout');

    var siteMap = ko.observable();

    return {
        activate: function () {
            var data = [{
                title: 'Цены',
                category: 'Покупателю'
            }, {
                title: 'О Компании',
                category: 'Бизнесу'
            }, {
                title: 'Наши',
                category: 'Новости'
            }];
            siteMap(_.reduce(data, function (result, item) {
                if (item.category) {
                    result[item.category] = result[item.category] || [];
                    result[item.category].push(item.title);
                }
                return result;
            }, {}));
        },
        siteMap: siteMap
    };
});
