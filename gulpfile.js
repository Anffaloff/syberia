const gulp = require('gulp');

gulp.task('first', function(callback){
    console.log('Hello from first!');
    callback();
})

gulp.task('second', function(callback){
    console.log('Hello from second!');
    callback();
})

gulp.task('third', function(callback){
    console.log('Hello from third!');
    callback();
})

gulp.task('fourth', function(callback){
    console.log('Hello from fourth!');
    callback();
})

gulp.task('default', gulp.parallel('first', 'second', 'fourth'));

