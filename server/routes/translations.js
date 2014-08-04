/*jslint node:true,unparam:true,nomen:true,vars:true*/
'use strict';

var router = require('express').Router();

var config = require('../config');
var mongo = require('mongojs');
var translations = mongo(config.mongo).collection('translations');

router.get('/:language', function (req, res, next) {
    translations.findOne({
        language: req.params.language
    }, function (err, doc) {
        if (err) {
            next(err);
        }
        res.json(doc);
    });
});

module.exports = router;
