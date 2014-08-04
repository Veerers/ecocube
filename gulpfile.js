/*jslint node:true,nomen:true,vars:true,unparam:true*/

'use strict';
var gulp = require('gulp');

var _ = require('lodash');
var bower = require('bower');
var durandal = require('gulp-durandal');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var rimraf = require('gulp-rimraf');
var spawn = require('child_process').spawn;
var stylus = require('gulp-stylus');

bower.config.directory = 'libs';
bower.config.cwd += '/src';

function lint(files) {
    var i;
    for (i = 0; i < files.length; i += 1) {
        spawn('node_modules/.bin/jslint', ['--color', files[i]])
            .stdout.pipe(process.stdout);
    }
}

// DEV BUILD

gulp.task('dev:jade', function () {
    var app = gulp.src('src/app/**/*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', console.warn))
        .pipe(gulp.dest('src/app'));
    var index = gulp.src('src/index.jade')
        .pipe(jade({
            pretty: true
        }).on('error', console.warn))
        .pipe(gulp.dest('src'));
    return merge(app, index);
});

gulp.task('dev:bower', function (next) {
    bower.commands.install([], {}).on('end', function (data) {
        console.dir(data);
        next();
    });
});

gulp.task('dev:stylus', ['dev:bower'], function () {
    return gulp.src('src/main.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('dev', ['dev:jade', 'dev:bower', 'dev:stylus']);

// RUN DEV

gulp.task('dev:server', function () {
    var server = spawn('node', ['--debug', 'server/app.js']);
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stdout);
    process.on('exit', function () {
        server.kill();
    });
});

gulp.task('dev:server-inspector', function () {
    var inpector = spawn('node_modules/.bin/node-inspector', ['--save-live-edit']);
    inpector.stdout.pipe(process.stdout);
    inpector.stderr.pipe(process.stdout);
    process.on('exit', function () {
        inpector.kill();
    });
});

gulp.task('dev:watch', ['dev', 'dev:server', 'dev:server-inspector'], function () {
    gulp.watch(['src/app/**/*.jade', 'src/index.jade'], ['dev:jade']);
    gulp.watch('src/bower.json', ['dev:bower']);
    gulp.watch(['src/main.styl', 'src/*.styl', 'src/app/**/*.styl', 'src/styles/**/*.styl'], ['dev:stylus']);
    gulp.watch(['src/app/**/*.js', 'server/**/*.js'])
        .on('change', function (file) {
            lint([file.path]);
        });

    var server = livereload();
    gulp.watch(['src/app/**/*.js', 'src/**/*.html', 'src/main.css'])
        .on('change', function (file) {
            server.changed(file.path);
        });
});

// PROD BUILD

gulp.task('prod:jade', ['dev:jade'], function () {
    return gulp.src('src/app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('src/app'));
});

gulp.task('prod:durandal', ['dev', 'prod:jade'], function () {
    var setup = {
        verbose: true,
        baseDir: 'src/app',
        main: 'main.js',
        almond: true,
        minify: true,
        rjsConfigAdapter: function (config) {
            config.include = _.filter(config.include, function (dep) {
                if (dep.indexOf('plugins/') !== -1) {
                    return dep === 'plugins/router' || dep === 'plugins/history';
                }
                return true;
            });
            console.log(config.include);
            config.paths = {
                'i18next': 'empty:',
                'jquery': 'empty:',
                'knockout': 'empty:',
                'lodash': 'empty:',
                'q': 'empty:'
            };
            return config;
        }
    };
    return durandal(setup)
        .pipe(gulp.dest('public'));
});

gulp.task('prod:resources', ['dev'], function () {
    gulp.src('src/img/**').pipe(gulp.dest('public/img'));
    gulp.src('src/manifest.cache').pipe(gulp.dest('public'));
});

gulp.task('prod:css', ['dev'], function () {
    return gulp.src('src/main.css')
        .pipe(minifyCss({
            processImport: true,
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('prod:index', function () {
    return gulp.src('src/index.jade')
        .pipe(jade({
            locals: {
                prod: true
            }
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('prod', ['prod:jade', 'prod:durandal', 'prod:resources', 'prod:css', 'prod:index']);

// TOOLS

gulp.task('clean', function () {
    return gulp.src(['build', 'node_modules', 'public', 'src/index.html', 'src/app/**/*.html', 'src/libs', 'src/main.css'])
        .pipe(rimraf());
});

gulp.task('lint', function () {
    lint(['src/app/**/*.js', 'server/**/*.js']);
});

gulp.task('default', ['dev:watch']);
