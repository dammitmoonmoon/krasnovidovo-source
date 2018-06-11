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
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  imageResize = require('gulp-image-resize'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');
 
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

gulp.task('default', ['sass', 'pug', 'minifyJS']);

//minify images for web

gulp.task('imageMin', () =>
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('src/min-images/*'))
);

gulp.task('resize', () => {
    gulp.src('src/photos/2015/test/*.jpg')
        .pipe(imagemin())
        .pipe(imageResize({
            height : 1000,
            width : 1000, 
            crop : false,
            upscale : false
      }))
      .pipe(rename(function (path) {
        path.basename += "-1000";
      }))
      .pipe(gulp.dest('src/photos/2015/test/1000'));
  });

  gulp.task('rename', () => {
      let num = 1;
      let arr = [5, 10, 14, 17, 21];
    gulp.src('src/photos/2017/*.jpg')
        .pipe(rename(function (path) {
            path.basename = num;
            num++;
            if (arr.includes(num)) {
                
            }
        }))
        .pipe(gulp.dest('src/photos/2017/test'));
  });



//switch to ES5 and minify JS

gulp.task('minifyES5', () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// routine work
gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('pug-en', () => {  
  return gulp.src('src/pug/en/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('dist/'));
});

gulp.task('pug-ru', () => {  
    return gulp.src('src/pug/ru/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/ru'));
  });

gulp.task('prefix', () =>
    gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
);

// distribution version
gulp.task('dist-minifyES5', () => {
    return gulp.src('src/js/*.js')
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution/js'))
  });
  
  // compile sass
  gulp.task('dist-sass', () => {
    return gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution/css'));
  });
  
  gulp.task('dist-pug-en', () => {  
    return gulp.src('src/pug/en/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution'));
  });
  
  gulp.task('dist-pug-ru', () => {  
      return gulp.src('src/pug/ru/*.pug')
          .pipe(pug())
          .pipe(gulp.dest('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution/ru'));
    });
  
  gulp.task('dist-prefix', () =>
      gulp.src('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution/*.css')
          .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
          .pipe(gulp.dest('/home/moonmoon/Dropbox/Krasnovidovo/Tami-Distribution/css'))
  );
  

gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/pug/*.svg', ['pug']);
  gulp.watch('src/pug/ru/*.pug', ['pug-ru']);
  gulp.watch('src/pug/en/*.pug', ['pug-en']);
  gulp.watch('src/js/*.js', ['minifyES5']);
  gulp.watch('dist/css/*.css', ['prefix']);
});

gulp.task('watch-dist', () => {
    gulp.watch('src/scss/*.scss', ['dist-sass']);
    gulp.watch('src/pug/*.svg', ['pug']);
    gulp.watch('src/pug/ru/*.pug', ['dist-pug-ru']);
    gulp.watch('src/pug/en/*.pug', ['dist-pug-en']);
    gulp.watch('src/js/*.js', ['dist-minifyES5']);
    gulp.watch('dist/css/*.css', ['dist-prefix']);
  });