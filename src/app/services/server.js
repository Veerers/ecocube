/*jslint unparam:true,vars:true*/
/*global define*/
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var q = require('q');

    return {
        pages: {
            get: function (title) {
                return q($.getJSON('/api/pages/' + title));
            },
            getMap: function () {
                return q($.getJSON('/api/pages/map'));
            }
        },
        translations: {
            get: function (language) {
                return q($.getJSON('/api/translations/' + language));
            }
        }
    };
});
