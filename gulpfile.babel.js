// Gulp imports
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import cond from 'gulp-cond';
import compass from 'gulp-compass';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import prefix from 'gulp-autoprefixer';
import replace from 'gulp-replace';
import scsslint from 'gulp-scss-lint';

// Import required node modules
import del from 'del';
import kss from 'kss';
import paths from 'compass-options';
import webpack from 'webpack-stream';
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
  default: ['delete', 'uncss', 'js-transpile', 'kss'],
  kss: {
    // Relative to src directory
    css: ['../dist/css/style.css'],
    homepage: 'README.md',
    js: ['../dist/js/app.js'],
    title: 'Frontend Build Styleguide'
  },
  paths: {
    fonts: src + '/font/**/*.{ttf,woff,eof,svg,woff2}',
    html: 'dist',
    srcHtml: src + '/**/*.html',
    srcImg: src + '/img/**/*',
    srcJs: src + '/js/**/*.js',
    styleguide: 'styleguide'
  },
  prefix: ["last 1 version", "> 1%", "ie 9"]
};

// app.js imports
const appJs = [src + '/js/app.js'];

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
    .pipe(compass(config.compass))
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

// Task: copy-readme
gulp.task('copy-readme', () => {
  return gulp.src('README.md')
    .pipe(gulp.dest(paths.dirs().sass));
});

// Task: default
gulp.task('default', config.default);

// Task: delete
gulp.task('delete', () => {
  return del(['dist/**/*', 'styleguide/**/*'])
    .then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

// Task: htmlmin
gulp.task('htmlmin', () => {
  return gulp.src(config.paths.srcHtml)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.paths.html));
});

// Task: images
gulp.task('images', () => {
  return gulp.src(config.paths.srcImg)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dirs().img));
});

// Task: js-lint
gulp.task('js-lint', () => {
  return gulp.src([config.paths.srcJs, 'gulpfile.babel.js'])
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(eslint())
    .pipe(eslint.format());
});

// Task: js-transpile
gulp.task('js-transpile', ['js-lint'], () => {
  gulp.src(appJs)
    .pipe(plumber({
      errorHandler: _onError
    }))
    .pipe(concat('app.js'))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dirs().js));
});

// Task: kss
gulp.task('kss', ['compass', 'copy-readme'], () => {
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
      html: [config.paths.srcHtml]
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
  gulp.watch(config.paths.srcImg, ['images']);
  gulp.watch(config.paths.srcJs, ['js-transpile']);
  gulp.watch(config.paths.srcHtml, ['htmlmin']);
  gulp.watch('src/scss/frontend/global/_variables.scss', ['variables']);
  gulp.watch('README.md', ['copy-readme', 'kss']);
});
