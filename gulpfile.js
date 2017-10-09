var gulp = require('gulp');
var rename = require("gulp-rename");
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-coffeescript-concat');
var stripCode = require('gulp-strip-code');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var TestServer = require('karma').Server;

gulp.task('coffee', function() {
  return gulp.src(['./src/*.coffee', '!./src/_*.coffee'])
    .pipe(stripCode({
      pattern: /#--- Concatened ---[\s\S]*?#--- Concatened end ---/g,
    }))
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('concat', function() {
  return gulp.src([
    './src/*.coffee'
  ])
    .pipe(concat('parallelio-dom.coffee'))
    .pipe(stripCode({
      pattern: /#--- Standalone ---[\s\S]*?#--- Standalone end ---/g,
    }))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('concatCoffee', ['concat'], function() {
  return gulp.src(['./tmp/*.coffee'])
    .pipe(coffee())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', ['concatCoffee'], function () {
  return gulp.src('./dist/parallelio-dom.js')
    .pipe(uglify())
    .pipe(rename('parallelio-dom.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/parallelio-dom.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('coffeeTest', function() {
  return gulp.src('./test/src/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./test/'));
});

gulp.task('build', ['sass', 'coffee', 'concatCoffee', 'compress'], function () {
    console.log('Build Complete');
});

gulp.task('test', ['build','coffeeTest'], function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-debug', ['build','coffeeTest'], function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('default', ['build']);