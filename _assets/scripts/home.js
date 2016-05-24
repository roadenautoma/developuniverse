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

        var $steps = $('.method__list');

        // Load the slider when the images are ready
        $steps.imagesLoaded( function(){

            // Create the slider
            $steps.owlCarousel({
                items: 1,
                nav: true,
                autoplay: false,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                autoHeight: false,
                loop: true,
                dotsContainer: '.method__nav .nav'
            }); // owlcarousel

            var owl = $steps.owlCarousel();

            // Custom pager
            $('.method__nav button').on('click', function() {
                console.log($(this).index());
                owl.trigger('to.owl.carousel', [$(this).parents('li').index(), 300]);
            });

            // Custom next button
            $('.method-step .js-method-step-next').on('click', function(event) {
                owl.trigger('next.owl.carousel');
            });

            // Keyboard
            // TODO: Should we focus on the slider first and then activate the keyboard?
            $(document).on('keydown', function(event){
                if (event.keyCode == 37) {
                    owl.trigger('prev.owl.carousel');
                } else if (event.keyCode == 39) {
                    owl.trigger('next.owl.carousel');
                }
            });


        }); // imagesloaded






    } // End if







}); // End ready


$(window).load(function() {
    //$('.hero__header').addClass("animated");
});
