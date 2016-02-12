var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var server = require('gulp-express');

// Tache pour controler l'execution de gulp dans Atom
gulp.task('stop', function() {
});

// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/'))
        .pipe(reload({
          stream: true
        }));
});

gulp.task('es6', function() {
  browserify({
      entries: './index.js',
      debug: true
    })
    .transform(babelify)
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('public'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('test', ['es6','styles'], function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
  gulp.watch(['*.html', 'index.js', 'src/*.js'], ['es6'])
  gulp.watch('sass/**/*.scss',['styles']);
});

gulp.task('service', function() {
  console.log('Lancement du serveur');
  server.run(['serveur.js']);
});

gulp.task('default', ['test']);
