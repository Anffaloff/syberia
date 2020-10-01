const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

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
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
