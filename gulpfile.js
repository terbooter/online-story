'use strict';

let level = {
    1: {
        all: true,
        normalizeUrls: false
    },
    2: {
        restructureRules: true,
        mergeSemantically: true
    }
};

let options = {
    format: 'beautify',
    level: level
};


let gulp = require("gulp");
let sass = require("gulp-sass");
let cleanCSS = require("gulp-clean-css");
let rename = require("gulp-rename");
let nodemon = require("gulp-nodemon");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("./tsconfig.json");

gulp.task('sass', function () {
    let options2 = {...options};
    delete options2.format;

    return gulp.src('./scss/all.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS(options))
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest('./css/'))
        .pipe(cleanCSS(options2))
        .pipe(rename("all.min.compressed.css"))
        .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', ["sass"], function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task("nodemon", function () {
    nodemon({script: "bin/index.js"});
});

gulp.task("default", ["sass:watch", "nodemon"]);

gulp.task("tsc", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("bin"));
});