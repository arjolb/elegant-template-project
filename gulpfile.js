var gulp=require('gulp'),
sass=require('gulp-sass'),
watch=require('gulp-watch'),
browserSync=require('browser-sync').create(),
wait=require('gulp-wait'),
autoprefixer=require('gulp-autoprefixer');
svgSprite=require('gulp-svg-sprite'),
rename=require('gulp-rename'),
webpack=require('webpack'),
svg2png=require('gulp-svg2png'),
modernizr=require('gulp-modernizr'),
imagemin=require('gulp-imagemin'),
del=require('del'),
usemin=require('gulp-usemin'),
uglify = require('gulp-uglify'),
rev = require('gulp-rev'),
cssnano=require('gulp-cssnano');

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
    gulp.task('scripts',['modernizr'],function(callback){
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




/* Png to svg */

    gulp.task("PngCopy",function(){
       return gulp.src("./app/assets/images/icons/*.svg")
        .pipe(svg2png())
        .pipe(gulp.dest("./app/assets/images/pngfallback"));
    })

/* */




/* Modernizr */

    gulp.task('modernizr',function(){
        return gulp.src(['./app/assets/styles/**/*.scss','./app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            "options":["setClasses"]
        }))
        .pipe(gulp.dest('./app/scripts'));
    });

/*modernizr end */




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







//Distribution


    gulp.task('deleteDistFolder',function(){
        return del('./app/dist');
    });


    gulp.task('optimizeImages',['deleteDistFolder'],function(){
        return gulp.src(['./app/assets/images/**/*','!./app/assets/images/icons','!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive:true,
            interlaced:true,
            multipass:true
        }))
        .pipe(gulp.dest("./dist/assets/images"));
});


    gulp.task('copyLightboxImages',function(){
        return gulp.src('./app/images/**/*')
        .pipe(gulp.dest("./dist/images"));
    });


    gulp.task('usemin', ['deleteDistFolder'], function() {
        return gulp.src("./app/index.html")
          .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
          }))
          .pipe(gulp.dest("./dist"));
      });




    gulp.task('build',['deleteDistFolder','optimizeImages','copyLightboxImages','usemin']);





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