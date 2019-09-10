var gulp = require('gulp')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var plumberOptions = {
  errorHandler: notify.onError('Error:<%=error.message %>')
}
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')

gulp.task('element-font', done => {
  gulp.src('node_modules/element-ui/lib/theme-chalk/fonts/*.*')
    .pipe(gulp.dest('./public/static/element'))
  done()
})

// 样式编译
gulp.task('sass', gulp.series('element-font'), done => {
  var array = [
    './src/scss/style.scss'
  ]
  gulp.src(array)
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 20 versions', 'ie > 8']
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/static/css'))
  done()
})