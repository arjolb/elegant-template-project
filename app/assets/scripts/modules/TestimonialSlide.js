import $ from 'jquery';
class TestimonialSlide{
    constructor(){
        this.nextTestimonial=$(".testimonials-dots_next");
        this.prevTestimonial=$(".testimonials-dots_prev");
        this.desc=$(".testimonials_description");
        this.desc1=$(".testimonials_description-second");
        this.currentSlide=$(".automatic-slide");
        this.autoswitch=true;
        this.desc1.hide();
        this.events();
        this.automaticSlide();
    }

    events(){
        this.nextTestimonial.click(this.changeSlideNext.bind(this));
        this.prevTestimonial.click(this.changeSlidePrev.bind(this));
    }

    changeSlideNext(){
        this.desc.hide();
        this.desc1.fadeIn(500);
        this.nextTestimonial.css("background","#005494");
        this.prevTestimonial.css("background","#b7b7b7");
    }

    changeSlidePrev(){
        this.desc1.hide();
        this.desc.fadeIn(500);
        this.prevTestimonial.css("background","#005494");
        this.nextTestimonial.css("background","#b7b7b7");
    }

    automaticSlide(){
        this.currentSlide.first().addClass('active');
        this.currentSlide.hide();
        $(".active").show();
        var that=this;
        if (this.autoswitch==true) {
            setInterval(function(){
            $(".active").removeClass("active").addClass("oldActive");
            
            if ($(".oldActive").is(":first-child")) {
                that.desc1.hide();
                that.desc.fadeIn(500);
                that.prevTestimonial.css("background","#005494");
                that.nextTestimonial.css("background","#b7b7b7");
                that.currentSlide.next().addClass("active");
            } else {
                that.desc.hide();
                that.desc.hide();
                that.desc1.fadeIn(500);
                that.nextTestimonial.css("background","#005494");
                that.prevTestimonial.css("background","#b7b7b7");
                that.currentSlide.first().addClass("active");
            }
            $(".oldActive").removeClass("oldActive");
            },2500);   
        }
    }
}

export default TestimonialSlide;