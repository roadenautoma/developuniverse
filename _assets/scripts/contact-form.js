$( document ).ready(function() {
  $('.js-contact-form-send-btn').click(function(e) {
    e.preventDefault();

    var form = $('.contact-form');
    if (( typeof(form[0].checkValidity) == "function" ) && !form[0].checkValidity()) {
      return;
    }
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

    $.ajax({
      url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/contact-form?webtask_no_cache=1',
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
      $('.js-contact-form-ok').show();
      $('.js-contact-form-ok').text('Message sent succesfully');
      hideMessages();
      
    }, function(response) {
      $('.js-contact-form-send-btn').toggleClass('btn--is-loading')
      $('.js-contact-form-error').show();
      $('.js-contact-form-error').text(response.responseJSON.message);
      console.log("Error sending form", response)
      hideMessages(true);
    });

    function hideMessages(error) {
      setTimeout(function() {
        $('.js-contact-form-ok').hide();
        $('.js-contact-form-error').hide();
        if (!error) {
          firstnameField.val('');
          lastnameField.val('');
          companyField.val('');
          emailField.val('');
          messageField.val('');  
        }
      }, 5000);
    }

  });
});