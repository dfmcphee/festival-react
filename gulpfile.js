var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concatenate = require('gulp-concat');
var server = require('gulp-express');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

var paths = {
  vendorSource: 'src/client/vendor/*.js',
  appSource: ['src/client/components/*.jsx', 'src/client/Festival.jsx'],
  buildDestination: 'public/js/dist/',
  server: ['server.js']
};

gulp.task('build-vendor-scripts', function() {
  return gulp.src(paths.vendorSource)
    .pipe(concatenate('vendor.js'))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.buildDestination));
});

gulp.task('build-app-scripts', function () {
  return gulp.src(paths.appSource)
    .pipe(babel())
    .pipe(concatenate('app.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.buildDestination));
});

// Rerun the task when a file changes
gulp.task('server', function() {
  // Start the server at the beginning of the task
  server.run(paths.server);

  gulp.watch(paths.server, [server.run]);
  gulp.watch(paths.vendorSource, ['build-vendor-scripts']);
  gulp.watch(paths.appSource, ['build-app-scripts']);
});

gulp.task('default', ['server', 'build-vendor-scripts', 'build-app-scripts']);
