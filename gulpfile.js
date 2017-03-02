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
     complexity  = require('gulp-complexity'),
     replace     = require('gulp-replace'),
     del         = require('del');


// Config Variables
var sourceJs  = 'src/js',
    sourceImg = 'src/img';


////////////////////////////////////////////////////////////////////////////////
// JavaScript Lint Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('lint', function() {
  return gulp.src([ sourceJs + '/**/*.js', '!' + sourceJs + '/application/lib/*', '!' + sourceJs + '/frontend/lib/*' ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Complexity Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('jscomplexity', ['lint'], function() {
  return gulp.src([ sourceJs + '/**/*.js', '!' + sourceJs + '/application/lib/*', '!' + sourceJs + '/frontend/lib/*' ])
    .pipe(complexity());
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('scripts', ['jscomplexity'], function() {
  // global.js
  gulp.src([
    // Config (optional)
    sourceJs + '/frontend/frontend.js',

    // Services (optional)
    sourceJs + '/frontend/services/callback.js',

    // Example controller
    //sourceJs + '/frontend/controllers/example.js'
  ])
    .pipe(concat('global.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('global.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));

  // html5.js (optional)
  /*gulp.src([sourceJs + '/frontend/lib/html5.js'])
    .pipe(concat('html5.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('html5.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));*/

  // skip-link-focus-fix.js (optional)
  /*gulp.src([sourceJs + '/frontend/lib/skip-link-focus-fix.js'])
    .pipe(concat('skip-link-focus-fix.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('skip-link-focus-fix.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));*/

  // jquery.scrollTo.js (optional)
  gulp.src([sourceJs + '/frontend/lib/jquery.scrollTo.js'])
    .pipe(concat('jquery.scrollTo.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('jquery.scrollTo.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

gulp.task('scripts_dev', ['jscomplexity'], function() {
  // global.js
  gulp.src([
    // Frontend JS (optional)
    sourceJs + '/frontend/frontend.js',

    // Services (optional, needed for Frontend JS)
    sourceJs + '/frontend/services/callback.js',

    // Example controller for Frontend JS
    // sourceJs + '/frontend/controllers/global.js'
  ])
    .pipe(concat('global.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('global.min.js'))
    .pipe(gulp.dest(paths.js));

  // html5.js (optional)
  /*gulp.src([sourceJs + '/frontend/lib/html5.js'])
    .pipe(concat('html5.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('html5.min.js'))
    .pipe(gulp.dest(paths.js));*/

  // skip-link-focus-fix.js (optional)
  /*gulp.src([sourceJs + '/frontend/lib/skip-link-focus-fix.js'])
    .pipe(concat('skip-link-focus-fix.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('skip-link-focus-fix.min.js'))
    .pipe(gulp.dest(paths.js));*/

  // jquery.scrollTo.js (optional)
  gulp.src([sourceJs + '/frontend/lib/jquery.scrollTo.js'])
    .pipe(concat('jquery.scrollTo.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('jquery.scrollTo.min.js'))
    .pipe(gulp.dest(paths.js));
});


////////////////////////////////////////////////////////////////////////////////
// Compass Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('compass_dev', ['images'], function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.sass,
      bundle_exec: true,
      time: true
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(prefix(["last 1 version", "> 1%", "ie 9"]))
    .pipe(gulp.dest(paths.css));
});

gulp.task('compass', ['images'], function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.sass,
      bundle_exec: true,
      time: true
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(prefix(["last 1 version", "> 1%", "ie 9"]))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest(paths.css));
});


////////////////////////////////////////////////////////////////////////////////
// Images Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('images', function() {
  return gulp.src(sourceImg + '/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});


////////////////////////////////////////////////////////////////////////////////
// Watch Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
  gulp.watch(sourceJs + '/**/*.js', ['scripts']);
  gulp.watch(paths.sass + '/**/*.scss', ['compass']);
  gulp.watch(sourceImg + '/*', ['images']);
  gulp.watch('src/scss/frontend/global/_variables.scss', ['variables']);
});


////////////////////////////////////////////////////////////////////////////////
// Application Variables Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('variables', function() {
  gulp.src('src/scss/frontend/global/_variables-custom.scss')
      .pipe(replace('\n//\n// DO NOT EDIT! To add/override variables, create a _variables-custom.scss file\n// in src/scss/application/global.', ''))
      .pipe(gulp.dest('src/scss/application/global'));

  gulp.src('src/scss/frontend/global/_variables.scss')
      .pipe(replace('Framework Variables', 'Application Variables'))
      .pipe(replace('All framework pre-packaged variables.', 'DO NOT DELETE. Should contain all application variables and Frontend variable\r\n// overrides. Clone src/scss/frontend/global/_variables.scss as a start.'))
      .pipe(replace('\n//\n// DO NOT EDIT! To add/override variables, create a _variables.scss file in\n// src/scss/application/global.', ''))
      .pipe(replace(/\s*!default/g, ''))
      .pipe(gulp.dest('src/scss/application/global'));
});


////////////////////////////////////////////////////////////////////////////////
// First-time Setup Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('setup', ['variables'], function() {
  return del(['.git/**/*']);
});

////////////////////////////////////////////////////////////////////////////////
// Default Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['scripts_dev', 'compass_dev', 'watch']);


////////////////////////////////////////////////////////////////////////////////
// Compile Task (for production)
////////////////////////////////////////////////////////////////////////////////
gulp.task('compile', ['scripts', 'compass']);
