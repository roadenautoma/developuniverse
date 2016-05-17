$( document ).ready(function() {




    /* Services: Areas
    ------------------------------------------- */

    if( $('.areas__list').length > 0)  {

        var $grid = $('.areas__list');
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


        // Filter items on button click
        var $filters = $('.areas__filters').on( 'click', 'button', function() {

            //get the id of the filter selected
            var filterValue = $(this).attr('data-filter');

            //hide all items
            $grid.find('.areas__item').removeClass("animated zoomIn").addClass("animated zoomOut");

            //when the animation is complete, hide the items to reset the grid
            $grid.find('.areas__item').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
                if( $(this).hasClass('animated zoomOut') ) {
                    $grid.find('.areas__item').hide();

                    //then show filtered items
                    if( filterValue == '*' ) {
                        $grid.find('.areas__item').show().removeClass("animated zoomOut").addClass("animated zoomIn");
                    } else {
                        $grid.find('[data-category="' + filterValue + '"]').show().removeClass("animated zoomOut").addClass("animated zoomIn");
                    }

                }
            });


            // Update active button
            $filters.find('.active').removeClass('active');
            $filters.find('[data-filter="' + filterValue + '"]').parents('li').addClass('active');
        });


    } // End if






}); // End ready
