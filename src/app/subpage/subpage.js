/*jslint unparam:true,vars:true*/
/*global define*/
define(function (require) {
    'use strict';
    var ko = require('knockout');
    var server = require('services/server');

    var page = ko.observable();

    return {
        activate: function (title) {
            return server.pages.get(title)
                .then(function (data) {
                    page(data);
                });
        },
        page: page
    };
});
