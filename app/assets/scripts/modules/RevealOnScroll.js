import $ from 'jquery';
import WayPoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import BarsAnimation from './BarsAnimation';


class RevealOnScroll{
    constructor(barInfo,firstOffset,skillsBar,secondOffset){
        this.lazyImages=$(".lazyload");
    

        this.barsObject=new BarsAnimation();

        this.itemsToReveal=$(".our-services-item");

        this.barInfo=barInfo;
        this.firstOffsetPercentage=firstOffset;
        
        this.skillsBar=skillsBar;
        this.secondOffsetPercentage=secondOffset;
        

        this.hideInitially();
        this.createWayPoints();
        this.refreshWayPoints();
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item");
    }


    refreshWayPoints(){
        this.lazyImages.on('load',function() { 
            Waypoint.refreshAll();
         });
    }


    createWayPoints(){
        var that=this;
    
        this.itemsToReveal.each(function () {
               var currentItem=this;
               new Waypoint({
               element: currentItem,
               handler: function () { 
                    that.itemsToReveal.addClass("reveal-item-is-visible");
                    $(".our-services-item-2").css({
                        "transform":"translateY(-16px)"
                    });
                    $(".our-services-item-3").css({
                        "transform":"translateY(16px)"
                    });
             },
             offset: "50%"
            });
         });


            new Waypoint({
                element: this.barInfo[0],
                handler: function () {
                        that.barsObject.infoBar();
                        this.destroy();
                },
                offset: that.firstOffsetPercentage
            });



            new Waypoint({
                element: this.skillsBar[0],
                handler: function () {
                        that.barsObject.skillsBar();
                        this.destroy();
                },
                offset: that.secondOffsetPercentage
            });
    }
}

export default RevealOnScroll;