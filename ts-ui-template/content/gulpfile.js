const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const gulp = require('gulp')
const header = require('gulp-header')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const pkg = require('./package.json')
const browsersync = require('browser-sync').create()

const destination = '../public/css'

function css() {
  return gulp
    .src('../public/scss/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .on('error', sass.logError)
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest(destination))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(destination))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch('../public/scss/**/*', css)
}

gulp.task('build', gulp.parallel(css))

gulp.task('watch', gulp.parallel(watchFiles))
