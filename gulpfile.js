var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var jsMinify = require('gulp-minify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;
var color = require('gulp-color');


var paths = {
    html: {
        src: 'src/**/*.+(html|ejs)',
        dist: 'dist'
    },
    images: {
        src: 'src/resources/images/**/*',
        dist: 'dist/resources/images'
    },
    style: {
        src: 'src/resources/style/main',
        dist: 'dist/resources/style/'
    },
    js: {
        src: 'src/resources/js/**/*.js',
        dist: 'dist/resources/js/'
    }
};


//Copy all html files and views
gulp.task('copyHtmlFiles', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist));
});

//Copy all static images and optimize them
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.images.dist));
});

//Compile main Less file and minify ... all other less files should be imported in main.less
gulp.task('compileLess', function() {
    return gulp.src(paths.style.src + ".less")
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.style.dist));
});

//Compile main Sass file and minify ... all other Sass files should be imported in main.less
gulp.task('compileSass', function() {
    return gulp.src(paths.style.src + ".scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.style.dist));
});

//Concat all javascript files in one single file named main.js and minify it
gulp.task('scripts', function() {
    return gulp.src([paths.js.src , 
        './node_modules/angular/angular.min.js'])
        .pipe(concat('main.js'))
        .pipe(jsMinify())
        .pipe(gulp.dest(paths.js.dist));
});


// Static server and files watch only for static sites
gulp.task('static-server-and-watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    //Watch any change in html, css or js files to reload browserSync 
    gulp.watch(paths.style.src + ".less", ['compileLess', 'compileSass', browserSync.reload]);
    gulp.watch(paths.html.src, ['copyHtmlFiles', browserSync.reload]);
    gulp.watch(paths.js.src, ['scripts', browserSync.reload]);
});



//Node server and static server plus files watch
gulp.task('node-static-servers', function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    var nodeServer = spawn('node', ['server.js']);
    nodeServer.on('close', function(code) {
        console.log(color("server: Node Server Closed, code: " + code , "Green"));
        cb(code);
    });
    nodeServer.stdout.on('data', (data) => {
        console.log(color("server: " + `${data}`, 'GREEN'));
    });

    //Watch any change in html, css or js files to reload browserSync 
    gulp.watch(paths.style.src + ".less", ['compileLess', 'compileSass', browserSync.reload]);
    gulp.watch(paths.html.src, ['copyHtmlFiles', browserSync.reload]);
    gulp.watch(paths.js.src, ['scripts', browserSync.reload]);
});

//last 2 tasks should be added only if we have node server not only static server
gulp.task('default', ['copyHtmlFiles', 'images', 'compileLess', 'compileSass', 'scripts', 'static-server-and-watch']);
