$( document ).ready(function() {

  $('.js-contact-form-send-btn').click(function(e) {
    var form = $('.contact-form');

    // Returns
    if($(this).hasClass('btn--is-loading')) {
      return;
    }
    if (( typeof(form[0].checkValidity) == "function" ) && !form[0].checkValidity()) {
      return;
    }

    // Fields
    var firstnameField = form.find('[name="firstname"]');
    var firstname = firstnameField.val();

    var lastnameField = form.find('[name="lastname"]');
    var lastname = lastnameField.val();

    var companyField = form.find('[name="company"]');
    var company = companyField.val();

    var messageField = form.find('[name="message"]');
    var message = messageField.val();

    var emailField = form.find('[name="email"]');
    var email = emailField.val();

    $('.js-contact-form-send-btn').toggleClass('btn--is-loading');

    // Call the Webtask
    $.ajax({
      // url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/contact-form?webtask_no_cache=1',
      // Fake URL
      url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/fake-contact-form?webtask_no_cache=1',
      method: 'POST',
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        company: company,
        message: message,
      },
      dataType: 'json',
      jsonp: false
    }).then(function(data) {
      $('.js-contact-form-send-btn').toggleClass('btn--is-loading')
      $('.js-contact-form-ok').text('Message sent succesfully');
      $('.js-contact-form-ok').show().addClass('animated flipInX');
      hideMessages();

    }, function(response) {
      $('.js-contact-form-send-btn').toggleClass('btn--is-loading')
      $('.js-contact-form-error').text(response.responseJSON.message);
      $('.js-contact-form-error').show().addClass('animated flipInX');
      console.log("Error sending form", response)
      hideMessages(true);
    });

    function hideMessages(error) {
      if (!error) {
        $('.contact-form').addClass('animated fadeOutDown');
        firstnameField.val('');
        lastnameField.val('');
        companyField.val('');
        emailField.val('');
        messageField.val('');
      }
      setTimeout(function() {
        $('.contact-form').removeClass('fadeOutDown').addClass('fadeInUp');
      }, 3000);
      setTimeout(function() {
        $('.js-contact-form-ok').removeClass('flipInX').addClass('flipOutX');
        $('.js-contact-form-error').removeClass('flipInX').addClass('flipOutX');
      }, 5000);
    }

    // Always return false to avoid real submit
    return false;


  });
});
