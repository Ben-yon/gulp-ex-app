const gulp = require('gulp');

/** 
 *  -- TOP LEVEL FUNCTIONS
 *  gulp.task - Define tasks
 * gulp.src = point to files to use
 * gulp.dest - point to the folder to output
 * gulp.watch - watcj files and folders for changes.
 * 
*/

// logs message
gulp.task('default', function(){
    return console.log('Gulp is running...');
});