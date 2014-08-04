/*jslint node:true,unparam:true,nomen:true,vars:true*/
'use strict';

var router = require('express').Router();

var config = require('../config');
var mongo = require('mongojs');
var pages = mongo(config.mongo).collection('pages');


router.get('/map', function (req, res, next) {
    pages.find({}, {
        title: 1,
        category: 1,
        _id: 0
    }, function (err, docs) {
        if (err) {
            next(err);
        }
        res.json(docs);
    });
});

router.get('/:title', function (req, res, next) {
    pages.findOne({
        title: req.params.title
    }, function (err, doc) {
        if (err) {
            next(err);
        }
        res.json(doc);
    });
});

module.exports = router;
