var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var runSequence = require('run-sequence');
var del = require('del');
var join = require('path').join;

var DIST_DIR = 'dist';
var SRC_DIR = 'src';

// ----- build -----
gulp.task('build', function(done) {
    runSequence(
        'clean',
        'build.html',
        'build.css',
        'build.js',
        done);
});

// ----- build.watch -----
// Not working very well. It appears that lite server is trying to refresh
// while the build process is still building.
gulp.task('build.watch', function(done) {
    runSequence(
        'build',
        'watch',
        done);
});

// ----- clean -----
gulp.task('clean', function() {
    return del([DIST_DIR]);
});

// ----- build.html -----
gulp.task('build.html', function() {
    return gulp.src(join(SRC_DIR, '**/*.html'))
        .pipe(gulp.dest(DIST_DIR));
});

// ----- build.css -----
gulp.task('build.css', function() {
    return gulp.src(join(SRC_DIR, '**/*.css'))
        .pipe(gulp.dest(DIST_DIR));
});

// ----- build.js -----
gulp.task('build.js', function() {

    var tsProject = plugins.typescript.createProject('tsconfig.json', {
        typescript: require('typescript')
    });

    var src = [
        'typings/browser.d.ts',
        'src/**/*.ts'
    ];

    return gulp.src(src)
        .pipe(plugins.typescript(tsProject))
        .pipe(gulp.dest(DIST_DIR));
});

// ----- watch -----
gulp.task('watch', function(done) {
    plugins.watch(join(SRC_DIR, '**'), function() {
        runSequence('build', done);
    });
});
