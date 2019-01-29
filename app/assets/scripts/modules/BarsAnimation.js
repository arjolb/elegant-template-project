import $ from 'jquery';
class BarsAnimation{
    constructor(){
       
    }

    infoBar(){
        $('.count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).data('item')
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    skillsBar(){

        var positions=[];
        $(".skills-bar").each(function (i) { 
             positions[i]=$(this).width();
        });

        $(".skills-bar").width(0);

        $(".skills-bar").each(function (index) {
            $(this).animate({
                width:positions[index]
            },
            {
                        duration: 5000,
                        easing: 'swing'
                    }
            )
    })
    }
}

export default BarsAnimation;