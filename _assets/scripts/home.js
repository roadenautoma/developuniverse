$( document ).ready(function() {

    /* Fix VH for hero in iOS
    ------------------------------------------- */
    if( $('.tpl-home').length > 0)  {
        window.viewportUnitsBuggyfill.init();
    }

    /* Hero: Read more
    ------------------------------------------- */
    // Hero scroll down
    if( $('.ps-home-hero').length > 0 ) {

        $(".js-hero-read-more").click(function(event){
			event.preventDefault();

			if( $('.navbar').hasClass('navbar--big') ) {
				var $navbarHeight = 67;
			} else {
				var $navbarHeight = $('.navbar').outerHeight();
			}

			$('html, body').animate({
	        	scrollTop: $(".ps-home-about").offset().top - $navbarHeight
	    	}, 500);

            $(this).blur();

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
                margin: 20,
                // autoplay: !is_mobile,
                // autoplayTimeout: 10000,
                // autoplayHoverPause: false,
                autoHeight: false,
                loop: true,
                dotsContainer: '.method__nav .nav'
            }); // owlcarousel

            var owl = $steps.owlCarousel();

            $('.ps-home-method').on("mouseenter", function(e) {
                if (!is_mobile) {
                    owl.trigger('play.owl.autoplay', [10000]);
                }
                //Not owl.trigger('play.owl.autoplay', [1000]);
            });

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
