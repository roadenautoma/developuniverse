$( document ).ready(function() {

  $('.js-contact-form-send-btn').click(function(e) {
    var form = $('.contact-form');

    var isModal = form.closest('#contact-modal').length !== 0;

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

    $('.form-wrapper').addClass('is-sending');

    // Call the Webtask
    $.ajax({
      url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/contact-form?webtask_no_cache=1',
      // Fake URL
      // url: 'https://webtask.it.auth0.com/api/run/wt-martin-gon_to-0/fake-contact-form?webtask_no_cache=1',
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
      $('.js-contact-form-ok').text('Message sent succesfully');
      $('.js-contact-form-ok').addClass('is-visible');
      $('.form-wrapper').addClass('is-result').removeClass('is-sending');
      setTimeout(function() {
        hideMessages();
    }, 2500);

    }, function(response) {
      $('.js-contact-form-error').text(response.responseJSON.message);
      $('.js-contact-form-error').addClass('is-visible');
      $('.form-wrapper').addClass('is-result').removeClass('is-sending');
      console.log("Error sending form", response);
      setTimeout(function() {
        hideMessages(true);
      }, isModal ? 4000 : 2500);

    });

    function hideMessages(error) {
      if (!error) {
        $('.form-wrapper').addClass('is-hidden');
        firstnameField.val('');
        lastnameField.val('');
        companyField.val('');
        emailField.val('');
        messageField.val('');
        autosize.destroy(messageField);
        if (isModal) {
          $.magnificPopup.instance.close();
        }
      }
      $('.form-wrapper').removeClass('is-hidden is-result');
      
    }

    // Always return false to avoid real submit
    return false;


  });
});
