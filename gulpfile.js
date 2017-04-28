/* eslint-disable */
const gulp        = require( 'gulp' ),
      jshint      = require( 'gulp-jshint' ),
      stylish     = require( 'jshint-stylish' ),
      paths       = require( 'compass-options' ).dirs(),
      rename      = require( 'gulp-rename' ),
      stripDebug  = require( 'gulp-strip-debug' ),
      uglify      = require( 'gulp-uglify' ),
      concat      = require( 'gulp-concat' ),
      compass     = require( 'gulp-compass' ),
      prefix      = require( 'gulp-autoprefixer' ),
      cleanCSS    = require( 'gulp-clean-css' ),
      imagemin    = require( 'gulp-imagemin' ),
      complexity  = require( 'gulp-complexity' ),
      replace     = require( 'gulp-replace' ),
      del         = require( 'del' ),
      scsslint    = require( 'gulp-scss-lint' ),
      eslint      = require( 'gulp-eslint' ),
      htmlmin     = require( 'gulp-htmlmin' ),
      uncss       = require( 'gulp-uncss' ),
      notify      = require( 'gulp-notify' ),
      plumber     = require( 'gulp-plumber' ),
      cache       = require( 'gulp-cached' );

// Error Handler
const _onError = function( err ) {
  notify.onError({
    title   : 'Error',
    message : '<%=  error %>'
  })( err );
};

// Config Variables
const sourceJs      = 'src/js',
      sourceImg     = 'src/img',
      compassConfig = {
        config_file : './config.rb',
        css         : paths.css,
        sass        : paths.sass,
        bundle_exec : true,
        time        : true
      },
      globalJS     = [];


////////////////////////////////////////////////////////////////////////////////
// JavaScript Lint Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('lint', function() {
  return gulp.src([
    sourceJs + '/**/*.js'
  ])
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('lint'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(eslint())
    .pipe(eslint.format())
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Complexity Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('jscomplexity', ['lint'], function() {
  return gulp.src([
    sourceJs + '/**/*.js',
    '!' + sourceJs + '/application/lib/*',
    '!' + sourceJs + '/frontend/lib/*'
  ])
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('jscomplexity'))
    .pipe(complexity());
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('scripts', ['jscomplexity'], function() {
  // global.js
  gulp.src(globalJS)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('scripts'))
    .pipe(concat('global.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('global.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

gulp.task('scripts-dev', ['jscomplexity'], function() {
  // global.js
  gulp.src(globalJS)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('scripts-dev'))
    .pipe(concat('global.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('global.min.js'))
    .pipe(gulp.dest(paths.js));
});


////////////////////////////////////////////////////////////////////////////////
// HTML Minify Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('htmlmin', function() {
  return gulp.src('src/**/*.html')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('htmlmin'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlmin-dev', function() {
  return gulp.src('src/**/*.html')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('htmlmin-dev'))
    .pipe(htmlmin({collapseWhitespace: false}))
    .pipe(gulp.dest('dist'));
});


////////////////////////////////////////////////////////////////////////////////
// SCSS Lint Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('scss-lint', function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('scss-lint'))
    .pipe(scsslint());
});


////////////////////////////////////////////////////////////////////////////////
// Compass Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('compass-dev', ['images', 'scss-lint'], function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('compass-dev'))
    .pipe(compass(compassConfig))
    .pipe(prefix(["last 1 version", "> 1%", "ie 9"]))
    .pipe(gulp.dest(paths.css));
});

gulp.task('compass', ['images', 'scss-lint'], function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('compass'))
    .pipe(compass(compassConfig))
    .pipe(prefix(["last 1 version", "> 1%", "ie 9"]))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }, function(details) {
      console.log(details.name + ' Original Size: ' + details.stats.originalSize);
      console.log(details.name + ' Minified Size: ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest(paths.css));
});


////////////////////////////////////////////////////////////////////////////////
// UnCSS Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('uncss', ['compass', 'htmlmin'], function() {
  return gulp.src('dist/css/**/*.css')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('uncss'))
    .pipe(uncss({
      html: ['src/**/*.html']
    }))
    .pipe(gulp.dest(paths.css));
});


////////////////////////////////////////////////////////////////////////////////
// Images Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('images', function() {
  return gulp.src(sourceImg + '/**/*')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(cache('images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});


////////////////////////////////////////////////////////////////////////////////
// Watch Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
  gulp.watch(sourceJs + '/**/*.js', ['scripts-dev']);
  gulp.watch(paths.sass + '/**/*.scss', ['compass-dev']);
  gulp.watch(sourceImg + '/*', ['images']);
  gulp.watch('src/scss/frontend/global/_variables.scss', ['variables']);
  gulp.watch('src/**/*.html', ['htmlmin-dev']);
});


////////////////////////////////////////////////////////////////////////////////
// Application Variables Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('variables', function() {
  gulp.src('src/scss/frontend/global/_variables-custom.scss')
      .pipe(plumber({
        errorHandler: _onError
      }))
      .pipe(cache('variables'))
      .pipe(replace('\n//\n// DO NOT EDIT! To add/override variables, create a _variables-custom.scss file\n// in src/scss/application/global.', ''))
      .pipe(gulp.dest('src/scss/application/global'));

  gulp.src('src/scss/frontend/global/_variables.scss')
      .pipe(plumber({
        errorHandler: _onError
      }))
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
gulp.task('default', ['scripts', 'compass', 'htmlmin']);


////////////////////////////////////////////////////////////////////////////////
// Compile Task (for development)
////////////////////////////////////////////////////////////////////////////////
gulp.task('compile', ['scripts-dev', 'compass-dev', 'htmlmin-dev', 'watch']);
