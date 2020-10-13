const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const pug = require('gulp-pug');

gulp.task('pug', function(callback) {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title:'Pug',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
    callback()

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
});

gulp.task('copy:img', function(callback) {
    return gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./build/img/'))
    callback()
});

gulp.task('copy:js', function(callback) {
    return gulp.src('./src/js/**/*.*')
      .pipe(gulp.dest('./build/js/'))
    callback()
});

gulp.task('watch', function () {    
    watch('./src/scss/**/*.scss', function () {
        setTimeout (gulp.parallel ('scss'), 1000)
    })
    watch('./src/pug/**/*.pug', gulp.parallel ('pug'))
});

gulp.task('scss', function(callback) {
    return gulp.src ('./src/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title:'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 4 versions']
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream())
    callback();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch', 'scss', 'pug'));

gulp.task(
    'default',
    gulp.series(
        gulp.parallel('scss', 'pug', 'copy:img', 'copy:js'),
        gulp.parallel('browser-sync', 'watch')
        )
);

