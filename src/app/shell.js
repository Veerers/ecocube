/*jslint unparam:true,vars:true*/
/*global define*/
define(function (require) {
    'use strict';
    var router = require('plugins/router');

    return {
        router: router,
        activate: function () {
            router.updateDocumentTitle = function (instance, instruction) {
                if (instruction.config.route === ':subpage') {
                    return instruction.fragment;
                }
                return instruction.config.title;
            };
            router.map([{
                route: '',
                moduleId: 'home/home'
            }, {
                route: ':subpage',
                moduleId: 'subpage/subpage',
                title: 'Главная'
            }]);

            return router.activate();
        }
    };
});
