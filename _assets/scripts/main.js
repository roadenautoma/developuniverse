$( document ).ready(function() {


    window.is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


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
    jQuery('.js-navbar-toggle').on('click', function(){
		jQuery(this).toggleClass('is-open');
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
	}

	enquire.register("screen and (max-width:639px)", {
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
        type:'inline'
    });








}); // End ready
