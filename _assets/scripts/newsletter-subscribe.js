$( document ).ready(function() {
  $('.js-btn-newsletter-subscribe').click(function(e) {

    var form = $(this).closest("form");
    // Returns
    if($(this).hasClass('btn--is-loading')) {
      return;
    }
    
    if (!window.is_mobile) {
      if (( typeof(form[0].checkValidity) == "function" ) && !form[0].checkValidity()) {
        return;
      }   
    } else {
      e.preventDefault();
    }

    var emailField = form.find('[name="subscribe_email"]');
    var email = emailField.val();

    $(this).toggleClass('btn--is-loading');

    // Call the Webtask
    $.ajax({
      url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/newsletter-subscribe?webtask_no_cache=1',
      // Fake URL
      // url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/fake-contact-form?webtask_no_cache=1',
      method: 'POST',
      data: {
        email: email
      },
      dataType: 'json',
      jsonp: false
    }).then(function(data) {
      $('.js-btn-newsletter-subscribe').toggleClass('btn--is-loading')
      $('.js-subscribe-form-ok').text('Message sent succesfully');
      $('.js-subscribe-form-ok').show();
      emailField.val('');

    }, function(response) {
      $('.js-btn-newsletter-subscribe').toggleClass('btn--is-loading')
      $('.js-subscribe-form-error').text(response.responseJSON.message);
      $('.js-contact-form-error').show();
      console.log("Error sending form", response)
      
    });

    return false;
  });
});