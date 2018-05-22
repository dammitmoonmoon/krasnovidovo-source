"use strict";

const gulp = require('gulp'),
  path = require('path'),
  // data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');

/*
  gulp.task
  gulp.src
  gulp.dest
  gulp.watch
*/

gulp.task('message', function() {
  console.log('Gulp is running...');
})

gulp.task('default', function() {
  console.log('Gulp is running...');
})