$( document ).ready(function() {




    /* Services: Areas
    ------------------------------------------- */
    if( $('.areas__list').length > 0)  {


        var $grid = $('.areas__list').imagesLoaded( function() {

            $('.areas__item').matchHeight({
                byRow: false
            });

            $grid.isotope({
                // options
                itemSelector: '.areas__item',
                layoutMode: 'fitRows'
            });
        });


        // filter items on button click
        var $filters = $('.areas__filters').on( 'click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });

            $filters.find('.active').removeClass('active');
			$filters.find('[data-filter="' + filterValue + '"]').parents('li').addClass('active');
        });



    }





}); // End ready
