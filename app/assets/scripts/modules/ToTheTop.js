import $ from 'jquery';
const smoothScroll=require('jquery-smooth-scroll');

class ToTheTop{
    constructor(){
        this.toTheTop();
    }


    toTheTop(){
        $(window).scroll(function () { 
            // var windowHeight=$(window).height();
            var windowScrollPosTop=$(window).scrollTop();
            // var windowScrollPosBottom=windowHeight+windowScrollPosTop;
            var trigger=$(".hero-section-arrow").offset().top;

            if (windowScrollPosTop>trigger) {
                $(".to-the-top").css({"display":"block"});
            }
            else{
                $(".to-the-top").css({"display":"none"});
            }
         });
    }
}
export default ToTheTop;