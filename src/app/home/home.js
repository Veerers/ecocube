/*jslint unparam:true,vars:true,nomen:true*/
/*global define*/
define(function (require) {
    'use strict';
    var _ = require('lodash');
    var ko = require('knockout');
    var server = require('services/server');

    var siteMap = ko.observable();

    return {
        activate: function () {
            return server.pages.getMap()
                .then(function (data) {
                    siteMap(_.reduce(data, function (result, item) {
                        if (item.category) {
                            result[item.category] = result[item.category] || [];
                            result[item.category].push(item.title);
                        }
                        return result;
                    }, {}));
                });
        },
        siteMap: siteMap
    };
});
