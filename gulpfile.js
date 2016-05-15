var gulp = require('gulp')
  , del = require('del')
  , babel = require('gulp-babel')
  , runSequence = require('run-sequence')
  , mocha = require('gulp-mocha');

/** Clean before building */
gulp.task('clean', function() {
  return del(['dist']);
});

/** Watch changes on files */
gulp.task('watch', function() {
  gulp.watch('lib/**/*', ['build']);
});

/** Testes */
gulp.task('test:mocha', function() {
  return gulp
    .src('test/resolver.js', {read: false})
    .pipe(mocha({
      reporter: 'list'
    }));
});

/** Build ES6 files */
gulp
  .task('build:js', function() {
    return gulp
      .src('lib/**/*')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('dist'));
  })
  .task('build', function() {
    runSequence('clean', 'build:js', 'test:mocha');
  });

gulp.task('default', ['build', 'watch']);