var gulp = require('gulp');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('build', function () {
  return gulp.src(['./src/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['build']);
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('default', function (callback) {
  runSequence('clean', 'build', callback);
});
