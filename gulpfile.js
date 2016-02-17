var gulp = require('gulp');
var exec = require('gulp-exec');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var server = require('gulp-express');


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
    .pipe(gulp.dest('public'));
});


// Convertit es6 en es5 et assemble les morceaux
gulp.task('charger', function() {
  exec('node util/util.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Refabrique automatiquement sur tout Chargement des sources
gulp.task('dev', ['fabrique', 'styles'], function() {
  // Serve files from the root of this project
  browserSync.init({
    //serveStatic: ["public/"],
    server: {
      baseDir: "public/"
    },
    // Tells BrowserSync on where the express app is running
    //proxy: 'http://localhost:80',
    browser: "google chrome"
  });
  gulp.watch(['*.html', 'app.js', 'src/*.js'], ['fabrique'])
  gulp.watch('sass/**/*.scss', ['styles'])
  gulp.watch("public/**").on('change', browserSync.reload);
  server.run(['serveur.js']);
});

gulp.task('start', ["fabrique", 'styles'], function() {
  console.log('Lancement du serveur');
  server.run(['serveur.js']);
});

// Tache pour controler l'execution de gulp dans Atom
gulp.task('stop', function() {
  //server.stop()
  browserSync.exit();
});

gulp.task('default', ['dev']);
