$( document ).ready(function() {


    window.is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


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
	    },
	    unmatch : function() {
	        $overlay.removeClass('nav-overlay');
	        if($toggle.hasClass('is-open')) {
	            overlay_close($overlay);
	        }
	    }
	});




    /* Forms
    ------------------------------------------- */

    // Custom form elements
    jcf.replaceAll();


    // Animated placeholder
    $('input:not(:checkbox):not(:button):not(:radio), textarea').focus(function() {
       $(this).parents('.form-group').addClass('is-focus');
    });

    $('input:not(:checkbox):not(:button):not(:radio), textarea').blur(function() {
        $(this).parents('.form-group').removeClass('is-focus');
        if( $(this).val().length === 0 ) {
           $(this).parents('.form-group').removeClass('is-filled');
        } else {
           $(this).parents('.form-group').addClass('is-filled')
        }
    });


    // Autosize textarea
    var contact_textarea = $('.js-form-comments');

    contact_textarea.on('focus', function() {
        autosize(contact_textarea);
    });

    $(contact_textarea).blur(function() {
        if( $(this).val().length === 0 ) {
            //console.log('empty');
            autosize.destroy(contact_textarea);
        }
    });



    /* Contact Modal
	------------------------------------------- */

    $('.js-contact-modal-toggle').magnificPopup({
        type:'inline',
        removalDelay: 300,
        mainClass: 'mfp-fade mfp-full',
        showCloseBtn: false,
        enableEscapeKey: true,
        callbacks: {
            open: function() {
                // Close menu if open
                if($overlay.hasClass('is-open')) {
                    setTimeout(function() {
                        overlay_close($overlay);
                    }, 1000);
                }
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


    /* Newsletter Contact
	------------------------------------------- */
    // @Gonto: Add newsletter form submit logic logic here


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
    $('.scroll-to').on('click', function() {
        var target = $(this).attr('href');

        $(this).blur();
		$('html, body').animate({
    		scrollTop: $(target).offset().top
			}, 500);
        event.preventDefault();

    });



}); // End ready
