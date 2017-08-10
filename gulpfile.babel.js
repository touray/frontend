// Gulp imports
import babel from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import cond from 'gulp-cond';
import compass from 'gulp-compass';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import prefix from 'gulp-autoprefixer';
import scsslint from 'gulp-scss-lint';
import uglify from 'gulp-uglify';

// Import required node modules
import del from 'del';
import kss from 'kss';
import paths from 'compass-options';
import {argv} from 'yargs';

// Including gulp-uncss here due to a bug including before kss
import uncss from 'gulp-uncss';

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
  process.env.NODE_ENV = 'production';
}
const PROD = process.env.NODE_ENV === 'production';

// Configuration
const src = 'src';
const config = {
  clean: {
    compatibility: 'ie9'
  },
  compass: {
    config_file : './config.rb',
    css         : paths.dirs().css,
    sass        : paths.dirs().sass,
    bundle_exec : true,
    time        : true
  },
  default: ['delete', 'compass', 'htmlmin', 'js-transpile', 'kss'],
  kss: {
    // Relative to src directory
    css: ['../dist/css/global.css'],
    homepage: '../../README.md',
    js: [
      //'../dist/js/jquery.min.js',
      //'../dist/js/what-input.min.js',
      //'../dist/js/foundation.min.js',
      '../dist/js/app.js']
  },
  paths: {
    fonts: src + '/font/**/*',
    html: 'dist',
    srcHtml: src + '/**/*.html',
    srcImg: src + '/img/*',
    srcJs: src + '/js/**/*.js',
    styleguide: 'docs'
  },
  prefix: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
  babelPresets: ['env']
};

// app.js imports
const appJs = [src + '/js/app.js'];

// Task: compass
gulp.task('compass', ['copy-fonts', 'images', 'scss-lint'], () => {
  return gulp.src(paths.dirs().sass + '/**/*.scss')
    .pipe(compass(config.compass))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(prefix(config.prefix))
    .pipe(cond(PROD, function() {
      return cleanCSS(config.clean);
    }))
    .pipe(gulp.dest(paths.dirs().css));
});

// Task: copy-fonts
gulp.task('copy-fonts', () => {
  return gulp.src(config.paths.fonts)
   .pipe(gulp.dest(paths.dirs().fonts));
});

// Task: default
gulp.task('default', config.default);

// Task: delete
gulp.task('delete', () => {
  return del(['dist/**/*', 'docs/**/*'])
    .then(paths => {
      console.log('Deleted Files & Folders: ', paths.length);
    });
});

// Task: htmlmin
gulp.task('htmlmin', () => {
  return gulp.src(config.paths.srcHtml)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.paths.html));
});

// Task: images
gulp.task('images', () => {
  return gulp.src(config.paths.srcImg)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dirs().img));
});

// Task: js-lint
gulp.task('js-lint', () => {
  return gulp.src([config.paths.srcJs, 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.results(results => {
      console.log(`Error Count: ${results.errorCount}`);
      console.log(`Warning Count: ${results.warningCount}`);
    }))
    .pipe(eslint.format());
});

// Task: js-transpile
gulp.task('js-transpile', ['js-lint'], () => {
  // app.js
  gulp.src(appJs)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dirs().js));

  // foundation.min.js
  //gulp.src('node_modules/foundation-sites/dist/js/foundation.min.js')
  //  .pipe(plumber())
  //  .pipe(gulp.dest(paths.dirs().js));

  // what-input.min.js
  //gulp.src('node_modules/what-input/dist/what-input.min.js')
  //  .pipe(plumber())
  //  .pipe(gulp.dest(paths.dirs().js));

  // jquery.min.js
  //gulp.src('node_modules/jquery/dist/jquery.min.js')
  //  .pipe(plumber())
  //  .pipe(gulp.dest(paths.dirs().js));
});

// Task: kss
gulp.task('kss', ['compass'], () => {
  return kss({
    source: paths.dirs().sass,
    destination: config.paths.styleguide,
    css: config.kss.css,
    js: config.kss.js,
    homepage: config.kss.homepage,
    title: config.kss.title
  });
});

// Task: scss-lint
gulp.task('scss-lint', () => {
  return gulp.src(paths.dirs().sass + '/**/*.scss')
    .pipe(scsslint());
});

// Task: uncss
gulp.task('uncss', ['compass', 'htmlmin'], () => {
  return gulp.src(paths.dirs().css + '/**/*.css')
    .pipe(uncss({
      html: [config.paths.srcHtml]
    }))
    .pipe(gulp.dest(paths.dirs().css));
});

// Task: watch
gulp.task('watch', () => {
  gulp.watch(paths.dirs().sass + '/**/*.scss', ['kss']);
  gulp.watch(config.paths.srcImg, ['images']);
  gulp.watch(config.paths.srcJs, ['js-transpile']);
  gulp.watch(config.paths.srcHtml, ['htmlmin']);
  gulp.watch(config.paths.fonts, ['copy-fonts']);

  // Disable editing frontend components to allow the framework to be upgraded
  gulp.watch(src + '/scss/frontend/**/*', () => {
    console.log('\nWARNING: EDITING FILES/DIRECTORIES LOCATED IN SRC/SCSS/FRONTEND IS NOT RECOMMENDED.\n');
    if (! argv.dev) {
      process.exit();
    }
  });
});
