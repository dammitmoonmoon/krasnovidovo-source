"use strict";

/* requires 
browser-sync 
    to launch a local server and do live reloads as sass and pug files changes
gulp-pug 
    to compile pug files.
gulp-data 
    to pass data to pug (not yet here)
gulp-sass 
    to compile sass files.
gulp-autoprefixer 
    to add vendor prefixes to css files
gulp-image-resize
    to resize images automatically (requires ImageMagic)
gulp-imagemin 
    to optimize images for web
gulp-uglify
    to minify JS code (<= ES5)
gulp-babel
    to transfrom modern JS to ES5 (prerequisite for gulp-uglify)
gulp-concat
    to merge several JS files
*/

const gulp = require('gulp'),
  path = require('path'),
  // data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  imageResize = require('gulp-image-resize'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat');

/* Directories */
const paths = {
  public: './build/',
  sass: './src/scss/',
  css: './build/css/',
  data: './src/_data/'
};

/* Tasks */

/*
  gulp.task
  gulp.src
  gulp.dest
  gulp.watch
*/

gulp.task('message', function() {
  console.log('Gulp is running...');
})

gulp.task('default', ['sass', 'pug', 'minifyJS']);

//minify images for web

gulp.task('imageMin', () =>
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('src/min-images/*'))
);

//switch to ES5 and minify JS

gulp.task('minifyES5', () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// compile sass
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('pug', function() {  
  return gulp.src('src/pug/*/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('dist/html/'));
});


gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/pug/*/*.pug', ['pug']);
});