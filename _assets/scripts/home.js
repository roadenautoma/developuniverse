$( document ).ready(function() {


    /* Hero: Read more
    ------------------------------------------- */
    // Hero scroll down
    if( $('.ps-home-hero').length > 0 ) {

        var offset = '';

        enquire.register("screen and (max-width:879px)", {
            match : function() {
    	        offset = $('.navbar').outerHeight();
    	    },
    	    unmatch : function() {
    	        offset = 0;
    	    }
        });

		$('.ps-home-hero .js-hero-read-more').on('click', function(event) {
			$('html, body').animate({
        		scrollTop: $('#home-about').offset().top - offset
   			}, 500);
            event.preventDefault();
		});


	}




    /* Step by step: Slider
    ------------------------------------------- */

    if( $('.method__list').length > 0)  {

        // Load the slider when the images are ready
        $('.method__list').imagesLoaded( function(){

            // Create the slider
            $('.method__list').owlCarousel({
                items: 1,
                nav: true,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                autoHeight: false,
                loop: true,
                dotsContainer: '.method__nav .nav'
            });

            owl = $('.method__list').owlCarousel();

            $('.method__nav button').on('click', function () {
                console.log($(this).index());
                owl.trigger('to.owl.carousel', [$(this).parents('li').index(), 300]);
            });

        });




    } // End if







}); // End ready
