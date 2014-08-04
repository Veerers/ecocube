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

            'i18next': ['//cdn.jsdelivr.net/i18next/1.7.1/i18next.amd.withJQuery.min', '../libs/i18next/i18next.amd.withJQuery'],
            'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min', '../libs/jquery/dist/jquery'],
            'knockout': ['//cdn.jsdelivr.net/knockout/3.1.0/knockout', '../libs/knockout.js/knockout'],
            'lodash': ['//cdn.jsdelivr.net/lodash/2.4.1/lodash.min', '../libs/lodash/dist/lodash'],
            'q': ['//cdnjs.cloudflare.com/ajax/libs/q.js/1.0.1/q.min', '../libs/q/q']
        },
        shim: {
            'popup': ['jquery']
        }

    });
    //>>excludeStart("build", true);
    requirejs.config({
        paths: {
            'i18next': '../libs/i18next/i18next.amd.withJQuery',
            'jquery': '../libs/jquery/dist/jquery',
            'knockout': '../libs/knockout.js/knockout',
            'lodash': '../libs/lodash/dist/lodash',
            'q': '../libs/q/q'
        }
    });
    //>>excludeEnd("build");

    define(function (require) {
        var system = require('durandal/system');
        var app = require('durandal/app');
        var viewLocator = require('durandal/viewLocator');
        var binder = require('durandal/binder');
        var $ = require('jquery');
        var q = require('q');
        var i18next = require('i18next');

        // init extensions
        require('bindings');
        require('popup');

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'ЕкоКуб';

        //>>excludeStart("build", true);
        app.title = 'Dev - ЕкоКуб';
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
            useCookie: true,
            preload: ['ru'],
            fallbackLng: ['ru'],
            useLocalStorage: true,
            localStorageExpirationTime: 10800000, // 3 hours
            resGetPath: 'api/translations/__lng__',
            lowerCaseLng: true
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
