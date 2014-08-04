/*global define*/
define(function (require) {
    'use strict';
    var ko = require('knockout');

    var page = ko.observable();

    return {
        activate: function (title) {
            var data = {
                title: title,
                articles: [{
                    title: 'Домостроительная система ЭКОКУБ',
                    media: [{
                        type: 'image',
                        id: 'test.jpg'
                    }, {
                        type: 'video',
                        id: '7HKoqNJtMTQ'
                    }],
                    text: '<b>Lorem</b> ipsum dolor sit amet, consectetur adipisicing elit. Impedit ea, accusantium libero nemo excepturi pariatur laborum sint, tempore blanditiis. Enim illum blanditiis provident tempore hic magni maxime voluptas, iure eum!'
                }]
            };
            page(data);
        },
        page: page
    };
});
