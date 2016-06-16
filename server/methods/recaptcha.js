Meteor.methods({
  'formSubmissionMethod': function(formData) {
    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, formData.gRecaptchaResponse);
    console.log('reCAPTCHA response', verifyCaptchaResponse.data);
    /* verifyCaptchaResponse.data returns a json {
    'success': true|false,
    'error-codes': an-error-code
  };
  // check at https://developers.google.com/recaptcha/docs/verify
  */

    if( verifyCaptchaResponse.data.success === false ){
      console.log(verifyCaptchaResponse.data);
      return verifyCaptchaResponse.data;
    }
    return true;
  }
});
