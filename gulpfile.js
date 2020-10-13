const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const pug = require('gulp-pug');

gulp.task('pug', function() {
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
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
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
