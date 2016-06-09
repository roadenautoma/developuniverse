$( document ).ready(function() {

    window.is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

    if(is_mobile) {
        $('html').addClass('mobile');
    } else {
        $('html').addClass('no-mobile');
    }

    /* Remove click delay on mobile
    ------------------------------------------- */
    FastClick.attach(document.body);


    /* Remove focus state on buttons
	------------------------------------------- */
	$("button, .btn").mouseup(function(){
    	$(this).blur();
	});


    /* Open in new window
    ------------------------------------------- */
    $('a[rel="external"]').click( function() {
        window.open( $(this).attr('href') );
        return false;
    });


	/* Mobile navigation
	------------------------------------------- */
	var $overlay = jQuery('.js-nav-overlay');
	var $toggle = jQuery('.js-navbar-toggle');
	var $header = jQuery('.js-navbar');

    // Mobile nav
    $toggle.on('click', function(){
		$toggle.toggleClass('is-open');
        $overlay.toggleClass('is-open');
		$header.toggleClass('is-open');
    });


	function overlay_open($overlay) {
	    $overlay.addClass('is-open');
		$header.addClass('is-open');
	}
	function overlay_close($overlay) {
	    $overlay.removeClass('is-open');
		$header.removeClass('is-open');
        $toggle.removeClass('is-open');
	}

	enquire.register("screen and (max-width:769px)", {
	    match : function() {
	        $overlay.addClass('nav-overlay');
	        if($toggle.hasClass('is-open')) {
	            overlay_open($overlay);
	        }
            $('.js-brand-logo').on('click', function(event) {
                event.preventDefault();
                $(this).blur();
        		$('html, body').animate({
            		scrollTop: $('#page').offset().top
        		}, 500);

            });
	    },
	    unmatch : function() {
	        $overlay.removeClass('nav-overlay');
	        if($toggle.hasClass('is-open')) {
	            overlay_close($overlay);
	        }
	    }
	});


    /* Reduce Navbar for big screens
	------------------------------------------- */
	enquire.register("screen and (min-width:770px)", {


	  	match : function() {
	  		jQuery('.navbar').addClass('navbar--resizable');
	  		jQuery('.navbar').addClass('navbar--big');

		    jQuery(window).scroll(function(){
			    if(jQuery(document).scrollTop() > 50) {
			        jQuery('.navbar--resizable').removeClass('navbar--big').addClass('navbar--small');
			    } else {
			        jQuery('.navbar--resizable').removeClass('navbar--small').addClass('navbar--big');
			    }
			});
		},
	  	unmatch : function() {
	  		jQuery('.navbar').removeClass('navbar--resizable').removeClass('navbar--small').removeClass('navbar--big');
	  	}
	});


    /* Forms
    ------------------------------------------- */

    // Animated placeholder
    $('input:not(:checkbox):not(:button):not(:radio), textarea').focus(function() {
       $(this).parents('.form-group').addClass('is-focus');
    });

    $('input:not(:checkbox):not(:button):not(:radio), textarea').blur(function() {

        if( $(this).val().length === 0 ) {
           $(this).parents('.form-group').removeClass('is-filled');
        } else {
           $(this).parents('.form-group').addClass('is-filled')
        }
        $(this).parents('.form-group').removeClass('is-focus');
    });


    // Autosize textarea
    if(!is_mobile) {
        var contact_textarea = $('.js-form-comments');

        contact_textarea.on('focus', function() {
            contact_textarea.one(transitionEnd, function(e) {
                console.log('animation ended');
                autosize(contact_textarea);
            });
        });

        $(contact_textarea).blur(function() {
            if( $(this).val().length === 0 ) {
                //console.log('empty');
                autosize.destroy(contact_textarea);
            }
        });
    }




    /* Contact Modal
	------------------------------------------- */

    var startWindowScroll = 0;
    $('.js-contact-modal-toggle').magnificPopup({
        type:'inline',
        removalDelay: 300,
        mainClass: 'mfp-fade mfp-full',
        showCloseBtn: false,
        enableEscapeKey: true,
        fixedContentPos:true,
        callbacks: {
            beforeOpen: function() {
                startWindowScroll = $(window).scrollTop();

            },
            open: function() {
                // Close menu if open
                var self = this;
                this.content.closest('.mfp-content').one(transitionEnd, function() {
                    $('html').addClass('mfp-helper');
                    self.content.closest('.mfp-container').addClass('mfp-open');
                    self.content.closest('.mfp-full').addClass('mfp-full-open');
                });

                if($overlay.hasClass('is-open')) {
                    setTimeout(function() {
                        overlay_close($overlay);
                    }, 1000);
                }
            },
            beforeClose: function() {
                $('html').removeClass('mfp-helper');
                $(window).scrollTop(startWindowScroll);
            },
            afterClose: function() {
                // Remove focus to link
                $('.js-contact-modal-toggle').blur();
            }
        }
    });


    // Close btn
    $('.js-modal-close').on('click', function() {
        $.magnificPopup.close();
    });




    /* Footer go up!
	------------------------------------------- */

	$('.js-go-up').on('click', function(event) {
        $(this).blur();
		$('html, body').animate({
    		scrollTop: $('#page').offset().top
			}, 500);
        event.preventDefault();
	});



    /* Animated scroll to
	------------------------------------------- */
    $('.js-scroll-to').on('click', function() {
        var target = $(this).attr('href');
        var hash = target.substring(target.indexOf('#'));
        var offset = -1;

        if( $('.site-header--fixed').length > 0 ) {
            offset = $('.navbar').outerHeight();
            offset = offset - 1;
        }

        $(this).blur();
		$('html, body').animate({
    		scrollTop: $(hash).offset().top - offset
			}, 500);
        $(this).blur();
        event.preventDefault();

    });



    /* Bigger targets for Blog item
	------------------------------------------- */
    $('.blog-item').hover(function(){
        $(this).find('a').addClass('hover');
    }, function(){
        $(this).find('a').removeClass('hover');
    });

    $('.blog-item').on('click', function() {
        var target = $(this).find('a').first().attr('href');
        location.href = target;
    });



    /* Share buttons
	------------------------------------------- */
    $('.js-share-btn').cSButtons();
    $('.js-share-btn').on('click', function(e) {
        e.preventDefault();
    });



    /* Wow
	------------------------------------------- */
    var wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
      }
    );
    wow.init();



}); // End ready
