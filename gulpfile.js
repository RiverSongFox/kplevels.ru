'use strict'

var autoprefixer = require('gulp-autoprefixer')
var csso = require('gulp-csso')
var del = require('del')
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')

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
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(csso())
    .pipe(gulp.dest('./dist'))
})

gulp.task('pages', function () {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('clean', function () {
  return del(['dist'])
})

gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['styles'])
  gulp.watch('./src/**/*.html', ['pages'])
})

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    [
      'styles',
      'pages'
    ],
    cb
  )
})