Meteor.methods({
  'sendEmail': function (to, subject, text) {
    this.unblock(); // Let other method calls from the same client start running without waiting for the email sending to complete.

    if (!Meteor.user()) // don’t allow sending email unless the user is logged in

      throw new Meteor.Error(403, "not logged in");

    // and here is where you can throttle the number of emails this user
    // is allowed to send per day

    Email.send({
      to: to,
      from: "hauretnaomi@gmail.com",//Meteor.user().emails[0].address,
      subject: subject,
      text: text
    });
  },
  'sendVerificationLink': function() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
