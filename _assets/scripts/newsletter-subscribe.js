$( document ).ready(function() {
  $('.js-btn-newsletter-subscribe').click(function(e) {

    var form = $(this).closest("form");
    var formWrapper = form.closest('.form-wrapper');

    // Returns
    if(formWrapper.hasClass('is-sending')) {
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

    formWrapper.addClass('is-sending');

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
      $('.js-subscribe-form-ok').text("Thanks for subscribing to the newsletter!");
      $('.js-subscribe-form-ok').addClass('is-visible');
      formWrapper.addClass('is-result').removeClass('is-sending');
    }, function(response) {
      $('.js-subscribe-form-error').text(response.responseJSON.message);
      $('.js-subscribe-form-error').addClass('is-visible');
      formWrapper.addClass('is-result').removeClass('is-sending');
      console.log("Error sending form", response);
      setTimeout(function() {
        $('.js-subscribe-form-error').removeClass('is-visible');
        formWrapper.removeClass('is-result')
      }, 2500);
    });

    function changeMessage(error) {

    }

    return false;
  });
});