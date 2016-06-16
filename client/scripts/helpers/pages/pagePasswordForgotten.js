//passwordForgottenForm helpers
Template.passwordForgottenForm.helpers({
  verifiedEmail: function() {
    return Session.get('verifiedEmail');
  },
  processing() {
    return Template.instance().processing.get();
  }
});
