var request = require('request');

var fields = [
  {
    label: 'First Name',
    field: 'firstname',
    required: true
  },
  {
    label: 'Last Name',
    field: 'lastname',
    required: true
  },
  {
    label: 'Company',
    field: 'company',
    required: false
  },
  {
    label: 'Email',
    field: 'email',
    required: true
  },
  {
    label: 'Message',
    field: 'message',
    required: true
  },
];

return function (ctx, cb) {

  var validation = validateRequest(ctx);
  if (!validation.valid) {
    return cb(validation);
  }

  var name = ctx.data.firstname + " " + ctx.data.lastname;

  var content = getEmailContent(ctx);

  request.post({
    url: 'https://api.sendgrid.com/api/mail.send.json',
    form: {
      'api_user': ctx.data.SENDGRID_USER,
      'api_key': ctx.data.SENDGRID_KEY,
      'to': ctx.data.TO_EMAIL,
      'subject': 'Contact request from gon.to from: ' + name,
      'from': ctx.data.TO_EMAIL,
      'replyto': ctx.data.email,
      'html': content
    }
  }, function(error, response, body) {
    var validation = {
      valid: true,
      message: ''
    };
    if (error) {
      validation.valid = false;
      validation.message = "Internal server error. Please try again later!"
      return cb(validation);
    }
    if (response && response.statusCode !== 200 && response.statusCode !== 201) {
      validation.valid = false;
      console.log("Error", body);
      validation.message = "Internal server error. Please try again later!"
      return cb(validation)
    }

    return cb(null, body);
    
  });
}





function validateRequest(ctx) {
  var validation = {
    valid: true,
    message: ''
  };
  fields.forEach(function(field) {
    if (field.required && !hasOwnPropertyValue(ctx.data, field.field)) {
      validation.valid = false;
      validation.message = "The required property " + field.field + " wasn't send";
    }
    if (field.field === 'email' && !validEmail(ctx.data.email)) {
      validation.valid = false;
      validation.message = "The email isn't valid";
    }

  });

  return validation;
}

function getEmailContent(ctx) {
  var html = "";

  fields.forEach(function(field) {
    html += '<p><strong>' + field.label + ':</strong> ' + (ctx.data[field.field] || '') + '</p>';
  });

  // Fix line breaks
  html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');

  return html;

}

// Helper functions
function hasOwnPropertyValue(obj, property) {
  return obj.hasOwnProperty(property) && !!obj[property].length;
}

function validEmail(value) {
  var email = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

  return email.test(value);
}
