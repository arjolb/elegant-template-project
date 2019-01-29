var gulp=require('gulp'),
sass=require('gulp-sass'),
watch=require('gulp-watch'),
browserSync=require('browser-sync').create(),
wait=require('gulp-wait'),
autoprefixer=require('gulp-autoprefixer');
svgSprite=require('gulp-svg-sprite'),
rename=require('gulp-rename'),
webpack=require('webpack');

/* Styles */

    gulp.task("styles",function(){
        return gulp.src("./app/assets/styles/styles.scss")
        .pipe(wait(200))
        .pipe(sass())
        .pipe(autoprefixer())
        .on("error",function(errorInfo){
            console.log(errorInfo.toString());
            this.emit("end");
        })
        .pipe(gulp.dest("./app/css"));
    });
    
    gulp.task('cssInject', ['styles'], function() {
        return gulp.src('./app/css/*.css')
          .pipe(browserSync.stream());
      });
/*Styles end*/



/* Scripts */
    gulp.task('scripts',function(callback){
        webpack(require('./webpack.config.js'),function(error,stats){
            if(error){
                console.log(error.toString());
            }
            console.log(stats.toString());
            callback();
        });
    });

    gulp.task('jsInject',['scripts'],function(){
        browserSync.reload();
    });
/* Scripts end */



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

        watch("./app/assets/scripts/**/*.js",function(){
            gulp.start("jsInject");
        })
    });

   
/* Watch end */

gulp.task('default',['watch']);





/* Svg sprite */

    //   gulp.task('createSprite',function() { 
    //     return gulp.src('./app/assets/images/icons/**/*.svg')
    //     .pipe(svgSprite({
    //         mode:{
    //             css:{
    //                 render:{
    //                     scss:{
    //                         template: './app/sprite/generate-sprite.scss'
    //                     }
    //                 }
    //             }
    //         }
    //     }))
    //     .pipe(gulp.dest('./app/sprite'));
    //    });

    //    gulp.task('copySpriteCSS',function(){
    //         return gulp.src('./app/sprite/css/*scss')
    //         .pipe(rename("_sprite.scss"))
    //         .pipe(gulp.dest('./app/assets/styles/modules'));
    //    });