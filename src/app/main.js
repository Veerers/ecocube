/*jslint browser:true,nomen:true,vars:true,unparam:true*/
/*global requirejs,define*/
(function () {
    'use strict';

    requirejs.config({
        paths: {
            'durandal': '../libs/durandal/js',
            'plugins': '../libs/durandal/js/plugins',
            'text': '../libs/requirejs-text/text',

            'popup': '../libs/magnific-popup/dist/jquery.magnific-popup',

            'i18next': '../libs/i18next/i18next.amd.withJQuery',
            'jquery': '../libs/jquery/jquery',
            'knockout': '../libs/knockout.js/knockout',
            'lodash': '../libs/lodash/dist/lodash.compat',
            'q': '../libs/q/q'
        },
        shim: {
            'popup': ['jquery']
        }
    });

    define(function (require) {
        var system = require('durandal/system');
        var app = require('durandal/app');
        var viewLocator = require('durandal/viewLocator');
        var binder = require('durandal/binder');
        var $ = require('jquery');
        var q = require('q');
        var i18next = require('i18next');

        // init extensions
        require('popup');
        require('bindings');

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'ЭкоКуб';

        //>>excludeStart("build", true);
        app.title = 'ЭкоКуб - 3Е';
        //>>excludeEnd("build");

        app.configurePlugins({
            router: true
        });

        system.defer = function (action) {
            var deferred = q.defer();
            action.call(deferred, deferred);
            var promise = deferred.promise;
            deferred.promise = function () {
                return promise;
            };
            return deferred;
        };

        var i18NOptions = {
            lng: 'ru',
            fallbackLng: 'ru',
            useLocalStorage: true,
            localStorageExpirationTime: 10800000, // 3 hours
            resGetPath: 'api/translations/ru',
        };

        //>>excludeStart("build", true);
        i18NOptions.useLocalStorage = false;
        i18NOptions.debug = true;
        //>>excludeEnd("build");

        app.start().then(function () {
            i18next.init(i18NOptions, function () {
                binder.binding = function (obj, view) {
                    $(view).i18n();
                };

                viewLocator.useConvention();
                app.setRoot('shell', null, 'application');
            });
        });
    });
}());
