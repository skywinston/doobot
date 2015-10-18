var gulp = require('gulp');
var postcss = require('gulp-postcss');
var csswring = require('csswring');
var sass = require('gulp-sass');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');

gulp.task('styles', function(){
  var processors = [
    csswring,
    autoprefixer({broswers:['last 2 versions']}),
    cssnext({})
  ];
  return gulp.src('./lib/stylesheets/style.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch:styles', function(){
  gulp.watch('./public/stylesheets/*.scss', ['styles']);
});
