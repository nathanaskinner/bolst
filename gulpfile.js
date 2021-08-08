var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');


//gulp.task('clean-js', function () {
  //return del([
    //'js/**/*.js'
  //]);
//});

//gulp.task('clean-css', function () {
  //return del([
    //'css/**/*.css'
  //]);
//});

gulp.task('pack-js', function () {  
  return gulp.src(['js/**/*.js'])
    .pipe(concat('bundle.min.js'))
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('js'))
    .pipe(rev.manifest('rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('pack-css', function () {  
  return gulp.src(['css/**/*.css'])
    .pipe(concat('stylesheet.min.css'))
    .pipe(cleanCss())
    .pipe(rev())
    .pipe(gulp.dest('css'))
    .pipe(rev.manifest('rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', gulp.series('pack-js'));
  gulp.watch('css/**/*.css', gulp.series('pack-css'));
});

gulp.task('default', gulp.series('watch'));
