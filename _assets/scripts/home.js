$( document ).ready(function() {




    /* Step by step: Slider
    ------------------------------------------- */

    if( $('.method__list').length > 0)  {

        $('.method__list').owlCarousel({
            items: 1,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoHeight: true,
            loop: true,
            dotsContainer: '.method__nav .nav'
        });

        owl = $('.method__list').owlCarousel();

        $('.method__nav button').on('click', function () {
            console.log($(this).index());
            owl.trigger('to.owl.carousel', [$(this).parents('li').index(), 300]);
        });

    } // End if







}); // End ready
