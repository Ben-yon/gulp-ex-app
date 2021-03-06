const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const gulpSass = require('gulp-sass');
const nodeSass = require('node-sass'); 
const sass = gulpSass(nodeSass);
const concat = require('gulp-concat');
const { src } = require('gulp');

/** 
 *  -- TOP LEVEL FUNCTIONS
 *  gulp.task - Define tasks
 * gulp.src = point to files to use
 * gulp.dest - point to the folder to output
 * gulp.watch - watcj files and folders for changes.
 * 
*/

// logs message
gulp.task('message', function(done){
    console.log('Gulp is running...');
    done();
});

//copy all html files from the src dir and creates dist dir and paste them there.
gulp.task('copyHtml', (done)=>{
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

// optimize images
gulp.task('imageOpt', (done) => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    done();
});

//Minify JS
gulp.task('minify', (done)=>{
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
        done();
});

// compile sass 
gulp.task('compile-sass', (done)=>{
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/sass'));
        done();
});

// concatenate the content of scripts
gulp.task('scripts', (done)=>{
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
})

gulp.task('default', gulp.parallel('message', 'copyHtml', 'imageOpt', 'compile-sass', 'scripts', (done)=>{
    done();
}));


gulp.task('watch', (done)=> {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageOpt'));
    gulp.watch('src/sass/*.scss', gulp.series('compile-sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
    done();
})