const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('watch', function () {
    watch('./src/**/*.html', gulp.parallel ( browserSync.reload ));
    watch('./src/css/**/*.css', gulp.parallel ( browserSync.reload ));
    // watch('./src/scss/**/*.scss', gulp.parallel ( browserSync.reload ));

});

// gulp.task('default', gulp.series('scss', gulp.parallel('browser-sync', 'watch')));

gulp.task('scss', function(callback) {
    return gulp.src ('./src/scss/style.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 4 versions']
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css/'));
    callback();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
