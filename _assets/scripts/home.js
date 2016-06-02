$( document ).ready(function() {

    /* Fix VH for hero in iOS
    ------------------------------------------- */
    if( $('.tpl-home').length > 0)  {
        window.viewportUnitsBuggyfill.init();
    }


    if( $('#typed').length > 0 ) {

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        $('.hero__read-more').one(animationEnd, function(e) {

            // TODO: @Gonto: For this to work we need to start with a backspace effect. Can you make this example work? http://codepen.io/moitorrijos/pen/QNwdLj

            setTimeout(function() {
                $('#typed').typed({
                    strings: ["Gardening", "Cooking", "Marketing"],
                    contentType: 'text',
                    startDelay: 0,
                    typeSpeed: 50,
                    backSpeed: 50,
                    backDelay: 2500,
                    loop: true,
                    showCursor: false
                });
            }, 1500);

        });



    }



    /* Hero: Read more
    ------------------------------------------- */
    // Hero scroll down
    if( $('.ps-home-hero').length > 0 ) {

        var offset = 0;

        if( $('.site-header--fixed').length > 0 ) {
            offset = $('.navbar').outerHeight();
            offset = offset - 1;
        }

        // enquire.register("screen and (max-width:879px)", {
        //     match : function() {
    	//         offset = $('.navbar').outerHeight();
    	//     },
    	//     unmatch : function() {
    	//         offset = 0;
    	//     }
        // });

		$('.ps-home-hero .js-hero-read-more').on('click', function(event) {
			$('html, body').animate({
        		scrollTop: $('#home-about').offset().top - offset
   			}, 500);
            $(this).blur();
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
                margin: 20,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: false,
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
