var gulp = require('gulp');
var rename = require("gulp-rename");
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var merge = require('merge2');
var wrapper = require('spark-wrapper');
var sass = require('gulp-sass');
var TestServer = require('karma').Server;
var run = require('run-sequence');
var autoCommit = require('spark-auto-commit');

gulp.task('coffee', function() {
  return gulp.src(['./src/*.coffee'])
    .pipe(coffee({bare: true}))
    .pipe(wrapper({namespace:'Parallelio.DOM'}))
    .pipe(wrapper.loader({namespace:'Parallelio.DOM','filename':'parallelio-dom'}))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('concat', function() {
  return gulp.src([
    './src/*.coffee'
  ])
    .pipe(wrapper.compose({namespace:'Parallelio.DOM',aliases:{'parallelio':'Parallelio'}}))
    .pipe(concat('parallelio-dom.coffee'))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('concatCoffee', ['concat'], function() {
  return gulp.src(['./tmp/parallelio-dom.coffee'])
    .pipe(coffee())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('domPart', function() {
  return gulp.src([
    './src/*.coffee'
  ])
    .pipe(wrapper.compose({namespace:'Parallelio.DOM',aliases:{'parallelio':'Parallelio'},partOf:'Parallelio'}))
    .pipe(concat('dom-part.coffee'))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('domPartCoffee', ['domPart'], function() {
  return gulp.src(['./tmp/dom-part.coffee'])
    .pipe(coffee())
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('full', ['concatCoffee','domPartCoffee'], function () {
  return gulp.src([require.resolve('parallelio/dist/parallelio.js'),'./tmp/dom-part.js'])
    .pipe(concat('parallelio-and-dom.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', ['full'], function () {
  return gulp.src(['./dist/parallelio-dom.js','./dist/parallelio-and-dom.js'])
    .pipe(uglify())
    .pipe(rename({
          suffix: '.min',
        }))
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

gulp.task('update', function() {
  return autoCommit.afterModuleUpdate(function(cb){
    return run('test',cb);
  });
});

gulp.task('test', ['build','coffeeTest'], function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-exit', ['test'], function() {
  console.log('Everithing is done, closing process');
  process.exit();
});

gulp.task('test-debug', ['build','coffeeTest'], function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('default', ['build']);