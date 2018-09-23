'use strict'

var autoprefixer = require('gulp-autoprefixer')
var csso = require('gulp-csso')
var del = require('del')
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var importCss = require('gulp-import-css')
var runSequence = require('run-sequence')
var imagemin = require('gulp-imagemin')
var surge = require('gulp-surge')

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

gulp.task('styles', function () {
  return gulp.src('./src/css/styles.css')
    .pipe(importCss())
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(csso())
    .pipe(gulp.dest('./dist'))
})

gulp.task('pages', function () {
  return gulp.src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

gulp.task('favicons', function () {
  return gulp
    .src('src/favicons/*')
    .pipe(gulp.dest('dist/'))
})

gulp.task('servicefiles', function () {
  return gulp
    .src('./src/servicefiles/*')
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function () {
  return del(['dist'])
})

gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['styles'])
  gulp.watch('./src/**/*.html', ['pages'])
  gulp.watch('./src/images/*', ['images'])
  gulp.watch('./src/favicons/*', ['favicons'])
  gulp.watch('./src/servicefiles/*', ['servicefiles'])
})

gulp.task('surge', [], function () {
  return surge({
    project: './dist',
    domain: 'kplevels.ru'
  })
})

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    [
      'styles',
      'pages',
      'images',
      'favicons',
      'servicefiles'
    ],
    cb
  )
})

gulp.task('deploy', function (cb) {
  runSequence('default', 'surge', cb)
})
