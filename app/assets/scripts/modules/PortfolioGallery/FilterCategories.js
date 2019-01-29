import $ from 'jquery';
import lightbox from 'lightbox2/dist/js/lightbox-plus-jquery';
class PortfolioGallery{
    constructor(){
        this.btn=$(".our-work-btn");
        this.hiddenElements=$(".our-work-gallery_photo-hide-initially");
        this.filterCategory();
        this.overlayEffect();
        this.eventShowMore();
    }


    filterCategory(){
        let cssProperties={
            "color":"#222",
            "font-weight":"900"
        };
        let resetCss={
            "color":"",
            "font-weight":""
        };
        
        var categories=$(".our-work-nav_categories a");

        categories.first().css(cssProperties);

        categories.on('click',function(){
            categories.css(resetCss);
            $(this).css(cssProperties);

            //Get and filter text
            var category=$(this).text().toLowerCase().replace(' ','-');

            if(category=='all'){
                $('.our-work-gallery_photo').fadeIn(800); //.removeClass('hidden')
            }else{
                $('.our-work-gallery_photo').each(function(){
                    if (!$(this).hasClass(category)) {
                        $(this).hide(); //.addClass('hidden')
                    } else {
                        $(this).fadeIn(800); //.removeClass('hidden');
                    }
                });
            }

            return false;
        });
    }





    overlayEffect(){
        $(".our-work-gallery_photo a").on('mouseover',function() {
            
            //Get attribute value
            var desc=$(this).children().data('description');

            //Create overlay div
            $(this).append("<div class='our-work-gallery_photo-overlay'></div>");
            //Get the overlay div
            var overlay=$(this).children(".our-work-gallery_photo-overlay");
            //Add html to overlay
            overlay.html('<div><h2>'+desc+'</h2>'+'<img src="./assets/images/attribute.png"></div>');
            //Fade in overlay
            overlay.css({
                "opacity":"1"
            })
        }
        );

        $(".our-work-gallery_photo").on('mouseleave',function(){
            
            $(".our-work-gallery_photo-overlay").css({
                "opacity":"0"
            });
            
            // $(this).append("<div class='our-work-gallery_photo-overlay'></div>");
            // var overlay=$(this).children(".our-work-gallery_photo-overlay");
           
            // overlay.fadeOut(800);
        });
    }


    eventShowMore(){
        this.btn.click(this.showMore.bind(this));
    }

    showMore(){
        this.hiddenElements.fadeIn(500);
        this.btn.fadeOut(500);
    }
}

export default PortfolioGallery;