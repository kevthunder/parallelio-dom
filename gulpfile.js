var gulp = require('gulp');
var rename = require("gulp-rename");
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify-es').default;
var merge = require('merge2');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var TestServer = require('karma').Server;
var run = require('run-sequence');
var requireIndex = require('gulp-require-index');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var linkInfo = require('npm-link-info');
var childProcess = require('child_process');

gulp.task('coffee', function() {
  return gulp.src(['./src/*.coffee'])
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}))
    .pipe(sourcemaps.write('./maps', {sourceRoot: '../src'}))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('buildIndex', function () {
  return gulp.src(['./lib/**/*.js','!./lib/libs.js','!./lib/parallelio-dom.js'])
    .pipe(requireIndex({name:'libs.js'}))
    .pipe(gulp.dest('./lib'));
});

gulp.task('concat', function() {
  var b = browserify({
    entries: ['./lib/parallelio-dom.js'],
    debug: true,
    standalone: 'Parallelio'
  })
  return b.bundle()
    .pipe(source('parallelio-dom.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', gulp.series('concat', function () {
  return gulp.src('./dist/parallelio-dom.js')
    .pipe(uglify({keep_classnames:true}))
    .pipe(rename('parallelio-dom.min.js'))
    .pipe(gulp.dest('./dist/'));
}));

gulp.task('watchCoffee', function() {
  return gulp.watch([
    './src/**/*.coffee',
    require.resolve('parallelio/dist/parallelio.js')
  ], gulp.series('buildJS'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/parallelio-dom.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watchSass', function () {
  return gulp.watch(['./sass/**/*.sass'], gulp.series('sass'));
});

gulp.task('coffeeTest', function() {
  return gulp.src('./test/src/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./test/'));
});

gulp.task('clean', function() {
  return gulp.src(['./lib','./dist'], {read: false, allowEmpty:true})
  .pipe(clean());
});

gulp.task('buildJS', build = gulp.series('coffee', 'buildIndex', 'concat', 'compress'));

var build;
gulp.task('build', build = gulp.series('clean', 'sass', 'buildJS', function (done) {
    console.log('Build Complete');
    done();
}));

gulp.task('watchLinked', function(done){
  if(linkInfo.isLinked('parallelio')){
    childProcess.spawn('npx', ['gulp','watch'], { cwd: linkInfo.baseFolder('parallelio'), stdio: 'inherit' })
      .on('close', done);
  }else{
    done()
  }
});

gulp.task('watch', gulp.parallel('watchSass', 'watchCoffee', 'watchLinked'));

gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('test', gulp.series('build','coffeeTest', function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
}));

// Some version of karma does not exit by itself
gulp.task('test-exit', gulp.series('test', function(done) {
  console.log('Everithing is done, closing process');
  done();
  process.exit();
}));

gulp.task('test-debug', gulp.series('build','coffeeTest', function(done) {
  new TestServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
}));

gulp.task('default', build);