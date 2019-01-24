var gulp=require('gulp'),
sass=require('gulp-sass'),
watch=require('gulp-watch'),
browserSync=require('browser-sync').create(),
wait=require('gulp-wait'),
autoprefixer=require('gulp-autoprefixer');

/* Styles */

    gulp.task("styles",function(){
        return gulp.src("./app/assets/styles/styles.scss")
        .pipe(wait(200))
        .pipe(sass())
        .pipe(autoprefixer())
        .on("error",function(error){
            console.log(error.toString());
            this.emit('end')
        })
        .pipe(gulp.dest("./app/css"));
    });
    
    gulp.task('cssInject', ['styles'], function() {
        return gulp.src('./app/css/*.css')
          .pipe(browserSync.stream());
      });
/*Styles end*/


/* Watch */

    gulp.task('watch',function(){
        browserSync.init({
           notify:false,
           server:{
               baseDir: "./app"
           } 
        });

        watch('./app/index.html',function(){
            browserSync.reload();
        });

        watch("./app/assets/styles/**/*.scss",function(){
            gulp.start("cssInject");
        });
    });

   
/* Watch end */

gulp.task('default',['watch']);