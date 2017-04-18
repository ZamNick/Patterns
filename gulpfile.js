var gulp = require('gulp');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('compile', function() {
    gulp.src(['app/**/*.ts'])
        .pipe(typescript())
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});