var request = require('request');

var fields = [
  {
    label: 'Email',
    field: 'email',
    required: true
  }
];

return function (ctx, cb) {

  var validation = validateRequest(ctx);
  if (!validation.valid) {
    return cb(validation);
  }

  request.post({
    url: 'https://api.sendgrid.com/v3/contactdb/recipients',
    json: true,
    body: [{email: ctx.data.email}],
    headers: {
      Authorization: 'Bearer ' + ctx.data.API_TOKEN
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

// Helper functions
function hasOwnPropertyValue(obj, property) {
  return obj.hasOwnProperty(property) && !!obj[property].length;
}

function validEmail(value) {
  var email = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

  return email.test(value);
}
