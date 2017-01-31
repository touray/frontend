'use strict';

const gulp       = require('gulp'),
     jshint      = require('gulp-jshint'),
     stylish     = require('jshint-stylish'),
     paths       = require('compass-options').dirs(),
     rename      = require('gulp-rename'),
     stripDebug  = require('gulp-strip-debug'),
     uglify      = require('gulp-uglify'),
     concat      = require('gulp-concat'),
     compass     = require('gulp-compass'),
     prefix      = require('gulp-autoprefixer'),
     cleanCSS    = require('gulp-clean-css'),
     imagemin    = require('gulp-imagemin'),
     complexity  = require('gulp-complexity');


// Config Variables
var sourceJs  = 'src/js',
    sourceImg = 'src/img';


//////////////////////////////
// JavaScript Lint Task
//////////////////////////////
gulp.task('lint', function() {
  return gulp.src([ sourceJs + '/**/*.js', '!' + sourceJs + '/lib/*' ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


//////////////////////////////
// JavaScript Complexity Task
//////////////////////////////
gulp.task('jscomplexity', ['lint'], function() {
  return gulp.src([ sourceJs + '/**/*.js', '!' + sourceJs + '/application/lib/*', '!' + sourceJs + '/framework/lib/*' ])
    .pipe(complexity());
});


//////////////////////////////
// JavaScript Task
//////////////////////////////
gulp.task('scripts', ['jscomplexity'], function() {
  // global.js
  gulp.src([
    // Config
    sourceJs + '/framework/config.js',

    // Services
    sourceJs + '/framework/services/callback.js',

    // Example controller
    // sourceJs + '/framework/controllers/global.js'
  ])
    .pipe(concat('global.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('global.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));

  // html5.js
  gulp.src([sourceJs + '/framework/lib/html5.js'])
    .pipe(concat('html5.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('html5.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));

  // skip-link-focus-fix.js
  gulp.src([sourceJs + '/framework/lib/skip-link-focus-fix.js'])
    .pipe(concat('skip-link-focus-fix.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('skip-link-focus-fix.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));

  // jquery.scrollTo.js
  gulp.src([sourceJs + '/framework/lib/jquery.scrollTo.js'])
    .pipe(concat('jquery.scrollTo.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('jquery.scrollTo.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});


//////////////////////////////
// Compass Task
//////////////////////////////
gulp.task('compass', function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.sass,
      bundle_exec: true,
      time: true
    }))
    .pipe(prefix(["last 1 version", "> 1%", "ie 9"]))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(gulp.dest(paths.css));
});


//////////////////////////////
// Images Task
//////////////////////////////
gulp.task('images', function() {
  return gulp.src(sourceImg + '/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'));
});


//////////////////////////////
// Watch Task
//////////////////////////////
gulp.task('watch', function () {
  gulp.watch(sourceJs + '/**/*.js', ['scripts']);
  gulp.watch(paths.sass + '/**/*.scss', ['compass']);
  gulp.watch(sourceImg + '/*', ['images']);
});


//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['scripts', 'images', 'compass', 'watch']);
