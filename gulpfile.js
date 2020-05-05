"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const purgecss = require('gulp-purgecss')
// compile scss into css
function style() {
    // 1. where is my scss file
    return (
        gulp
        .src("./assets/scss/**/*.scss")
        .pipe(sourcemaps.init())
        // 2. pass that file through sass compiler
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer("last 2 versions"))
        .pipe(cleanCSS())
        // 3. where do I save the compiled CSS
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css"))

        // 4. stream changes to all browser
        .pipe(browserSync.stream())
    );
}

function purge() {
    return (gulp.src('./dist/css/*.css')
        .pipe(purgecss({
            content: ['./templates/*.twig']
        }))
        .pipe(gulp.dest('build/css'))
    )
}

function concatJs() {
    return gulp.src(["./assets/js/*.js"])
        .pipe(concat("all.js"))
        .pipe(gulp.dest("./dist/js/"))
        .pipe(browserSync.stream());

}

function watch() {
    browserSync.init({

        proxy: "soled.local",

    });
    gulp.watch("./assets/scss/**/*.scss", style);
    gulp.watch("./**/*.php").on("change", browserSync.reload);
    gulp.watch("./assets/js/*.js", gulp.series(concatJs)).on("change", browserSync.reload);
    gulp.watch("./templates/*.twig").on("change", browserSync.reload);
}

function imageminTask() {
    gulp.src("./assets/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"));
}


exports.imageminTask = imageminTask;
exports.style = style;
exports.watch = watch;
exports.concat = concatJs;
exports.purge = purge;