//resetPasswordForm helpers
Template.resetPasswordForm.helpers({
 resetPassword: function(){
  return Session.get('resetPasswordToken'); //return the session variable called resetPasswordToken
},

changing() {
  return Template.instance().changing.get();
}
});
