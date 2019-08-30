const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');


function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        },
        notify: false
    });
    gulp.watch('./src/sass/**/*.scss', style);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
}

function style() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 7', 'ie 10', 'ie 9', 'ie 11'],
            {cascade: false}))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream(true))

}

function libs() {
    return gulp.src('./src/css/libs.css')
        .pipe(sass())
        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 7', 'ie 10', 'ie 9', 'ie 11'],
            {cascade: false}))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css'))
        // .pipe(browserSync.stream(true))
}


function clean() {
    return del(['./dist/'])
}

function buildImg() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'))
}
function buildFont() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
}
function buildCss() {
    return gulp.src('./src/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'))

}
function buildScripts() {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
}
function buildHtml() {
    return gulp.src('./src/**.html')
        .pipe(gulp.dest('./dist'))
}

function scriptslibs() {
    return gulp.src([
        './src/libs/jquery/dist/jquery.min.js',
        './src/libs/bootstrap4/dist/js/bootstrap.min.js',
        './src/libs/owl.carousel/dist/owl.carousel.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        // .pipe(browserSync.stream(true))
}

const build = gulp.series(clean, gulp.parallel(buildImg, buildFont, buildCss, buildScripts,buildHtml));



//tasks
gulp.task('style', style);
gulp.task('libs', libs);
gulp.task('scriptslibs', scriptslibs);
gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('build',build);