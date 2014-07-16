/*global define*/
define(function (require) {
    'use strict';
    var router = require('plugins/router');

    return {
        router: router,
        activate: function () {
            router.map([{
                route: '',
                moduleId: 'home/home'
            }, {
                route: ':subpage',
                moduleId: 'subpage/subpage'
            }]);

            return router.activate();
        }
    };
});
