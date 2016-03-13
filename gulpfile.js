'use strict';
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade');

var isProduction = !!util.env.production;

// Styles
gulp.task('styles', function () {
    var postcss = require('gulp-postcss');
    var processors = [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('postcss-clearfix'),
        require('postcss-focus'),
        require('postcss-assets'),
        require('postcss-color-alpha'),
        require('postcss-color-function'),
        require('postcss-calc'),
        require('postcss-size'),
        require('postcss-easings'),
        require('postcss-custom-media'),
        require('postcss-media-minmax'),
        require('postcss-will-change'),
        require('autoprefixer')({browsers: ['last 2 versions']}),
        require('postcss-css-variables'),
    ];

    return gulp.src('assets/css/*.css')
        .pipe(!isProduction ? sourcemaps.init() : util.noop())
        .pipe(postcss(processors))
        .pipe(!isProduction ? sourcemaps.write('.') : util.noop())
        .pipe(isProduction ? postcss([require('cssnano')]) : util.noop())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload({start:true}));
});

// Scripts
gulp.task('scripts', function () {

  return gulp.src('assets/js/*.js')
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imgmin', function () {
  var imagemin = require('gulp-imagemin');
  var png = require('imagemin-pngquant');
  var jpeg = require('imagemin-jpegtran');
  var svg = require('imagemin-svgo');

  return gulp.src('assets/img/*')
      .pipe(imagemin({
         progressive: true,
         use: [jpeg(), png(), svg()]
      }))
      .pipe(gulp.dest('dist/img/'))
      .pipe(livereload({start:true}));
});

// Jade
gulp.task('jade', function () {
  return gulp.src('./*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(livereload({start:true}));
});

gulp.task('watch', ['styles', 'imgmin', 'scripts', 'jade'], function () {
  livereload.listen();
  gulp.watch(['assets/css/*.css'], ['styles']);
  gulp.watch(['assets/img/*'], ['imgmin']);
  gulp.watch(['assets/js/*'], ['scripts']);
  gulp.watch(['./*.jade'], ['jade']);
});

gulp.task('default', [
  'styles',
  'imgmin',
  'scripts',
  'jade'
]);
