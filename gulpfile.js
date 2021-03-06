var gulp = require("gulp"),
    connect = require("gulp-connect"),
    browserify = require("gulp-browserify"),
    concat = require("gulp-concat"),
    port = process.env.port || 3000;

gulp.task("browserify", () => {
    gulp.src("./app/js/main.js").pipe(browserify({transform: "reactify"})).pipe(gulp.dest("./dist/js"))
});

// live reload
gulp.task("connect", () => {
    connect.server({
        port: port,
        livereload: true
    })
});

// reload js
gulp.task("js", () => {
    gulp.src("./dist/**/*.js").pipe(connect.reload())
});

gulp.task("html", ()=> {
    gulp.src("./app/**/*.html").pipe(connect.reload())
});

gulp.task("watch", ()=> {
    gulp.watch("./dist/**/*.js", ["js"]);
    gulp.watch("./app/**/*.html", ["html"]);
    gulp.watch("./app/js/**/*.js", ["browserify"])
});

gulp.task("default", ["browserify"]);

gulp.task("serve", ["browserify", "connect", "watch"]);