/*jslint node:true,unparam:true,nomen:true,vars:true,stupid:true*/
'use strict';

var config = require('./config');
var isProduction = process.env.NODE_ENV === 'production';

var mongojs = require('mongojs');
var db = mongojs(config.mongo, ['pages', 'translations']);

var app = require('express')();

app.set('port', config.port);

app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('body-parser').json());
app.use(require('compression')());
app.use(require('express').static(__dirname + (isProduction ? '/../public' : '/../src')));

require('fs').readdirSync(__dirname + '/routes').forEach(function (route) {
    var fileName = route.substr(0, route.indexOf('.js'));
    app.use('/api/' + fileName, require('./routes/' + fileName));
});

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});
