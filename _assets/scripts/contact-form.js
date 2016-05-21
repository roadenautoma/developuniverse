$( document ).ready(function() {
  $('.js-contact-form-send-btn').click(function(e) {
    e.preventDefault();
    var form = $('.contact-form');
    var firstnameField = form.find('[name]=firstname');
    var firstname = firstnameField.val();

    var lastnameField = form.find('[name]=lastname');
    var lastname = lastnameField.val();

    var companyField = form.find('[name]=company');
    var company = companyField.val();

    var messageField = form.find('[name]=message');
    var message = messageField.val();

    var emailField = form.find('[name]=email');
    var email = emailField.val();


    $('.js-contact-form-send-btn').toggleClass('btn--is-loading')

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
      // TODO notify it was sent
      $('.js-contact-form-send-btn').toggleClass('btn--is-loading')
      alert("Email sent OK");
      firstnameField.val('');
      lastnameField.val('');
      companyField.val('');
      emailField.val('');
      messageField.val('');
    }, function(response) {
      // TODO: show the error better
      $('.js-contact-form-send-btn').toggleClass('btn--is-loading')
      console.log("Error sending form", response)
      alert(response.responseText);
    })
    //

  })
});