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
      baseDir: "./"
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

// Convertit es6 en es5 et assemble les morceaux
gulp.task('fabrique', function() {
  browserify({
      entries: 'src/index.js',
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

// Refabrique automatiquement sur tout Chargement des sources
gulp.task('dev', ['fabrique','styles'], function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['*.html', 'app.js', 'src/*.js'], ['fabrique'])
  gulp.watch('sass/**/*.scss',['styles']);
  //server.run(['serveur.js']);
});

gulp.task('start',['fabrique','styles'], function() {
  console.log('Lancement du serveur');
  server.run(['serveur.js']);
});

gulp.task('default', ['dev']);
