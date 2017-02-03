"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const path = require('path');
const rename = require("gulp-rename");

const destDir = './build_app/';
const destPublicDir = './build_app/public';

gulp.task('default', function (cb) {
	runSequence('build', cb);
});

gulp.task('build', function (cb) {
	runSequence('clean-build', 'build-backend', 'build-frontend', cb);
});

gulp.task('clean-build', function (cb) {
	return gulp.src(destDir, {read: false})
		.pipe(clean({force: true}));
});

gulp.task('build-backend', function (cb) {
	return gulp.src(['./serverSide_src/**/*'], {buffer: false})
		.pipe(gulp.dest(destDir));
});

gulp.task('build-frontend', function (cb) {
	runSequence('webpack', 'copy-src', cb);
});

gulp.task('webpack', function () {
	return gulp.src('.clientSide_src/*')
		.pipe(named())
		.pipe(webpackStream(require('./webpack.config')))
		.pipe(gulp.dest(destPublicDir));
});


gulp.task('copy-src', function () {
	return gulp.src(['clientSide_src/static/*'], {buffer: false})
		.pipe(gulp.dest(destPublicDir));
});

gulp.task('reload-page', function () {
	return gulp.src('client_build/**')
		.pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('client_src/**/*.@(html|js|css|hbs)', ['build']);
});

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
	return this;
}

