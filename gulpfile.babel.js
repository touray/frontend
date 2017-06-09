// Import required node modules
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import compass from 'gulp-compass';
import complexity from 'gulp-complexity';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import ifElse from 'gulp-if-else';
import imagemin from 'gulp-imagemin';
import kss from 'kss';
import notify from 'gulp-notify';
import paths from 'compass-options';
import plumber from 'gulp-plumber';
import prefix from 'gulp-autoprefixer';
import replace from 'gulp-replace';
import scsslint from 'gulp-scss-lint';
import sourcemaps from 'gulp-sourcemaps';
import stripDebug from 'gulp-strip-debug';
import uglify from 'gulp-uglify';
import uncss from 'gulp-uncss';

// Application configuration
const cleanOptions  = {
        compatibility: 'ie9'
      },
      compassConfig = {
        config_file : './config.rb',
        css         : paths.dirs().css,
        sass        : paths.dirs().sass,
        bundle_exec : true,
        time        : true
      },
      cssPrefix     = ["last 1 version", "> 1%", "ie 9"],
      defaultTasks  = ['uncss', 'js-transpile'],
      distHTML      = 'dist',
      distImg       = paths.dirs().img,
      distJS        = paths.dirs().js,
      srcHTML       = 'src/**/*.html',
      srcImg        = 'src/img',
      srcJS         = 'src/js',
      stylesDir     = 'styleguide';

// app.js imports
const appJS = [srcJS + '/app.js'];

// Error handling
const _onError = (err) => {
  notify.onError({
    title:   'Error',
    message: '<%= err %>'
  })(err);
};

// Task: compass
gulp.task('compass', ['images', 'scss-lint'], () => {
  return gulp.src(paths.dirs().sass + '/**/*.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(compass(compassConfig))
    .pipe(prefix(cssPrefix))
    .pipe(ifElse(process.env.NODE_ENV === 'production', function() {
      return cleanCSS(cleanOptions);
    }))
    .pipe(gulp.dest(paths.dirs().css));
});

// Task: copy-readme
gulp.task('copy-readme', () => {
  return gulp.src('README.md')
    .pipe(gulp.dest('src/scss'));
});

// Task: default
gulp.task('default', defaultTasks);

// Task: htmlmin
gulp.task('htmlmin', () => {
  return gulp.src(srcHTML)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(distHTML));
});

// Task: images
gulp.task('images', () => {
  return gulp.src(srcImg + '/**/*')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(distImg));
});

// Task: js-complexity
gulp.task('js-complexity', ['js-lint'], () => {
  return gulp.src(srcJS + '/**/*.js')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(complexity());
});

// Task: js-lint
gulp.task('js-lint', () => {
  return gulp.src([srcJS + '/**/*.js', 'gulpfile.babel.js'])
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(eslint())
    .pipe(eslint.format());
});

// Task: js-transpile
gulp.task('js-transpile', ['js-complexity'], () => {
  gulp.src(appJS)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(ifElse(process.env.NODE_ENV === 'production', stripDebug))
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest(distJS));
});

// Task: kss
gulp.task('kss', ['compass', 'copy-readme'], () => {
  return kss({
    source: 'src/scss',
    destination: stylesDir,
    css: '../dist/css/style.css',
    js: '../dist/js/app.js',
    homepage: 'README.md',
    title: 'Frontend Build Styleguide'
  });
});

// Task: scss-lint
gulp.task('scss-lint', () => {
  return gulp.src(paths.dirs().sass + '/**/*.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(scsslint());
});

// Task: uncss
gulp.task('uncss', ['compass', 'htmlmin'], () => {
  return gulp.src(paths.dirs().css + '/**/*.css')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(uncss({
      html: [srcHTML]
    }))
    .pipe(gulp.dest(paths.dirs().css));
});

// Task: variables
gulp.task('variables', () => {
  gulp.src('src/scss/frontend/global/_variables-custom.scss')
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(replace('// KSS //', '// Application Custom Variables\n//\n// Contains all of the Sass custom configuration variables.\n//\n// Style guide: application.global.custom-variables'))
    .pipe(gulp.dest('src/scss/application/global'));

  gulp.src('src/scss/frontend/global/_variables.scss')
      .pipe(plumber({
        errorHandler: _onError
      }))
      .pipe(replace('// KSS //', '// Application Variables\n//\n// Contains all of the Sass configuration variables.\n//\n// Style guide: application.global.variables'))
      .pipe(replace(/\s*!default/g, ''))
      .pipe(gulp.dest('src/scss/application/global'));
});

// Task: watch
gulp.task('watch', () => {
  gulp.watch(paths.dirs().sass + '/**/*.scss', ['kss']);
  gulp.watch(srcImg + '/**/*', ['images']);
  gulp.watch(srcJS + '/**/*.js', ['js-transpile']);
  gulp.watch(srcHTML, ['htmlmin']);
  gulp.watch('src/scss/frontend/global/_variables.scss', ['variables']);
  gulp.watch('README.md', ['copy-readme', 'kss']);
});
