import $ from 'jquery';
// import smoothScroll from 'jquery-smooth-scroll/jquery.smooth-scroll.js'
const smoothScroll=require('jquery-smooth-scroll');
class SmoothScrollDelayLink{
    constructor(){
        $(".hero-section_menu-links a").smoothScroll();
        $(".hero-section-arrow a").smoothScroll();
        $(".arrow-smooth a").smoothScroll();
    }

}

export default SmoothScrollDelayLink;