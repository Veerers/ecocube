/*jslint node:true,unparam:true,nomen:true,vars:true,stupid:true*/
'use strict';

var app = require('express')();

app.set('port', 3000);

app.use(require('express').static(__dirname + '/../src'));

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});
