import $ from 'jquery';
// import smoothScroll from 'jquery-smooth-scroll/jquery.smooth-scroll.js'
const smoothScroll=require('jquery-smooth-scroll');
class SmoothScrollDelayLink{
    constructor(){
        this.navLinks=$(".hero-section_menu-links a");
        // this.delayLink();
        this.smoothScrolling();
        $(".arrow-smooth a").smoothScroll();
    }

    // delayLink(){
    //     this.navLinks.click(function(evt){
    //         evt.preventDefault();
    //         var link = $(this).attr("href");
    //         setTimeout(function() {
    //             window.location.href = link;
    //         }, 700);
    //     });
    // }    

    smoothScrolling(){
        this.navLinks.smoothScroll();
    }

    
}

export default SmoothScrollDelayLink;