// Gulp imports
import cleanCSS from 'gulp-clean-css';
import cond from 'gulp-cond';
import compass from 'gulp-compass';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import prefix from 'gulp-autoprefixer';
import scsslint from 'gulp-scss-lint';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import stylelint from 'gulp-stylelint';

// Import required node modules
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import del from 'del';
import kss from 'kss';
import paths from 'compass-options';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
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
    time        : true,
    sourcemap   : (PROD) ? false : true,
    comments    : (PROD) ? false : true
  },
  default: ['compass', 'htmlmin', 'js-transpile', 'kss'],
  kss: {
    // Relative to src directory
    css: ['../dist/css/global.css'],
    homepage: '../../README.md',
    js: ['../dist/js/app.js'],
    title: 'Frontend Build Docs'
  },
  paths: {
    fonts: src + '/font/**/*',
    html: 'dist',
    srcHtml: src + '/**/*.html',
    srcImg: src + '/img/*',
    srcJs: src + '/js/**/*.js',
    styleguide: 'docs'
  },
  prefix: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
};

// app.js imports
const appJs = [src + '/js/app.js'];

// Task: compass
gulp.task('compass', ['copy-fonts', 'images', 'scss-lint'], () => {
  return gulp.src(paths.dirs().sass + '/**/*.scss')
    .pipe(plumber(function() {
      this.emit('end');
    }))
    .pipe(compass(config.compass))
    .pipe(prefix(config.prefix))
    .pipe(cond(PROD, () => {
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
gulp.task('default', () => {
  sequence('delete', config.default);
});

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
    .pipe(plumber(function(err) {
      gutil.log('HTML Minify Error', gutil.colors.red(err.message));
      this.emit('end');
    }))
    .pipe(htmlmin({
      collapseWhitespace: PROD ? true : false
    }))
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
  const browserified = (entries, filename) => {
    return browserify({
      entries: entries,
      debug: PROD ? false : true
    })
    .transform(babelify)
    .bundle()
    .on('error', err => {
      gutil.log('Browserify Error', gutil.colors.red(err.message))
    })
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./dist/js/maps'))
    .pipe(gulp.dest(paths.dirs().js));
  };

  // app.js
  browserified(appJs, 'app.js');
});

// Task: kss
gulp.task('kss', ['compass'], () => {
  return kss({
    source: paths.dirs().sass,
    destination: config.paths.styleguide,
    css: config.kss.css,
    js: config.kss.js,
    homepage: config.kss.homepage,
    title: config.kss.title,
    builder: 'node_modules/michelangelo/kss_styleguide/custom-template/'
  });
});

// Task: style-lint
gulp.task('style-lint', ['compass'], () => {
  return gulp.src(paths.dirs().css + '/**/*.css')
    .pipe(stylelint({
      reporters: [
        {formatter: 'verbose', console: true}
      ]
    }));
});

// Task: scss-lint
gulp.task('scss-lint', () => {
  return gulp.src([paths.dirs().sass + '/**/*.scss', '!' + paths.dirs().sass + '/framework/foundation/*'])
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
  gulp.watch([paths.dirs().sass + '/**/*.scss', 'README.md'], ['kss']);
  gulp.watch(config.paths.srcImg, ['images']);
  gulp.watch(config.paths.srcHtml, ['htmlmin']);
  gulp.watch(config.paths.fonts, ['copy-fonts']);
  gulp.watch(config.paths.srcJs, ['js-transpile']);

  // Disable editing frontend components to allow the framework to be upgraded
  gulp.watch(src + '/scss/frontend/**/*', () => {
    console.warn('\nWARNING: EDITING FILES/DIRECTORIES LOCATED IN SRC/SCSS/FRONTEND IS NOT RECOMMENDED.\n');
    if (! argv.dev) {
      process.exit();
    }
  });
});
