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
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var proxyMiddleware = require('http-proxy-middleware');

gulp.task('test', function() {
  return gulp.src('test/tableau-test.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(jasmine());
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


  var proxy = proxyMiddleware('/api', {
    target: 'http://www.example.org'
  });

  // configure proxy middleware
  // context: '/' will proxy all requests
  //     use: '/api' to proxy request when path starts with '/api'
  var proxy = proxyMiddleware('/api/**', {
    target: 'http://localhost',
    ws:true // for vhosted sites, changes host header to match to target's host
  });

  // browserSync.init({
  //     server: {
  //         baseDir: "./",
  //         port: 3000,
  //         middleware: [proxy],         // add the proxy to browser-sync
  //     },
  //     startPath: "/api"
  // });
  // Serve files from the root of this project
  browserSync.init({
    //serveStatic: ["public/"],
    server: {
      baseDir: "public/",
      middleware: [proxy]
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

// Tache pour controler l'execution de gulp dans Atom
gulp.task('essai', function() {
  console.log("Lancement de l'utilitaire: ")
  var urlParDefaut = "mongodb://admin:pass@localhost:27017/test"
    //PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1,host2:port2/dbname
  const url = (process.env.PROD_MONGODB || urlParDefaut)
  console.log("url de la base de donnée: " + url)
  MongoClient.connect(url, function(err, db) {
    assert.equal(err, null, "Erreur de connexion");
    console.log("connexion réussie.");
    db.close();
  })
});

gulp.task('default', ['dev']);
